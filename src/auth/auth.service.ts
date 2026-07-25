import {
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { randomBytes } from 'crypto';
import { PrismaService } from '../prisma/prisma.service';
import { HashService } from '../common/hash/hash.service';
import { JwtService } from './jwt.service';
import { JWT_OPTIONS, type JwtOptions } from './jwt.options';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import type {
  DevicePlatform,
  User,
} from '../../prisma/generated/client/client';

export interface DeviceInfo {
  name: string;
  platform: DevicePlatform;
}

export interface AuthResult {
  accessToken: string;
  refreshToken: string;
  user: { id: string; email: string; displayName: string };
  device: { id: string; name: string };
}

// 48 random bytes → 64-char base64url opaque refresh token.
const REFRESH_BYTES = 48;

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly hash: HashService,
    private readonly jwt: JwtService,
    @Inject(JWT_OPTIONS) private readonly opts: JwtOptions,
  ) {}

  async register(dto: RegisterDto): Promise<AuthResult> {
    const existing = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (existing) throw new ConflictException('email already registered');

    const passwordHash = await this.hash.hash(dto.password);
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        passwordHash,
        displayName: dto.displayName,
      },
    });
    return this.issueTokens(user, dto.device);
  }

  async login(dto: LoginDto): Promise<AuthResult> {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    // Same error for unknown email and wrong password — don't leak which.
    if (!user) throw new UnauthorizedException('invalid credentials');

    const ok = await this.hash.verify(dto.password, user.passwordHash);
    if (!ok) throw new UnauthorizedException('invalid credentials');

    return this.issueTokens(user, dto.device);
  }

  /**
   * Rotate a refresh token: revoke the presented one, issue a fresh pair.
   *
   * Reuse detection: a token that was already rotated (replacedById set) or
   * revoked is a red flag — someone is replaying an old token. Response:
   * revoke EVERY live token the user has, forcing re-login everywhere.
   */
  async refresh(tokenValue: string): Promise<AuthResult> {
    const tokenHash = this.hash.sha256(tokenValue);
    const row = await this.prisma.refreshToken.findUnique({
      where: { tokenHash },
      include: { user: true, device: true },
    });
    if (!row) throw new UnauthorizedException('invalid refresh token');

    if (row.revokedAt || row.replacedById) {
      await this.prisma.refreshToken.updateMany({
        where: { userId: row.userId, revokedAt: null },
        data: { revokedAt: new Date() },
      });
      throw new UnauthorizedException('refresh token reuse detected');
    }

    if (row.expiresAt.getTime() < Date.now()) {
      throw new UnauthorizedException('refresh token expired');
    }

    const accessToken = await this.jwt.signAccess({
      sub: row.userId,
      devices: [row.deviceId],
    });
    const { value: refreshToken, id: newId } = await this.createRefreshToken(
      row.userId,
      row.deviceId,
    );
    // Mark the old token rotated AFTER the new one exists (replacedById FK).
    await this.prisma.refreshToken.update({
      where: { id: row.id },
      data: { revokedAt: new Date(), replacedById: newId },
    });

    return {
      accessToken,
      refreshToken,
      user: {
        id: row.user.id,
        email: row.user.email,
        displayName: row.user.displayName,
      },
      device: { id: row.device.id, name: row.device.name },
    };
  }

  /** Revoke one specific refresh token (the polite exit — not the family). */
  async logout(userId: string, tokenValue: string): Promise<void> {
    const tokenHash = this.hash.sha256(tokenValue);
    await this.prisma.refreshToken.updateMany({
      where: { tokenHash, userId, revokedAt: null },
      data: { revokedAt: new Date() },
    });
  }

  /** Shared path for register + login: create device, sign access, mint refresh. */
  private async issueTokens(
    user: User,
    device: DeviceInfo,
  ): Promise<AuthResult> {
    const createdDevice = await this.prisma.device.create({
      data: { userId: user.id, name: device.name, platform: device.platform },
    });

    const accessToken = await this.jwt.signAccess({
      sub: user.id,
      devices: [createdDevice.id],
    });
    const { value: refreshToken } = await this.createRefreshToken(
      user.id,
      createdDevice.id,
    );

    return {
      accessToken,
      refreshToken,
      user: { id: user.id, email: user.email, displayName: user.displayName },
      device: { id: createdDevice.id, name: createdDevice.name },
    };
  }

  private async createRefreshToken(
    userId: string,
    deviceId: string,
  ): Promise<{ value: string; id: string }> {
    const value = randomBytes(REFRESH_BYTES).toString('base64url');
    const row = await this.prisma.refreshToken.create({
      data: {
        userId,
        deviceId,
        tokenHash: this.hash.sha256(value),
        expiresAt: new Date(Date.now() + this.opts.refreshTtlSeconds * 1000),
      },
    });
    return { value, id: row.id };
  }
}
