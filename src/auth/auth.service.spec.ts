import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException, UnauthorizedException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { HashService } from '../common/hash/hash.service';
import { JwtService } from './jwt.service';
import { JWT_OPTIONS } from './jwt.options';

// All I/O is mocked — these tests never touch Postgres or sign real JWTs.
const mockPrisma = {
  user: { findUnique: jest.fn(), create: jest.fn() },
  device: { create: jest.fn() },
  refreshToken: {
    create: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    updateMany: jest.fn(),
  },
};
const mockHash = {
  hash: jest.fn(),
  verify: jest.fn(),
  // Real-ish sha256 stand-in: deterministic, distinct per input.
  sha256: jest.fn((v: string) => `sha256(${v})`),
};
const mockJwt = { signAccess: jest.fn() };

const device = { name: 'Pixel 8', platform: 'android' as const };

describe('AuthService', () => {
  let svc: AuthService;

  beforeEach(async () => {
    jest.clearAllMocks();
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: PrismaService, useValue: mockPrisma },
        { provide: HashService, useValue: mockHash },
        { provide: JwtService, useValue: mockJwt },
        {
          provide: JWT_OPTIONS,
          useValue: {
            secret: 'x'.repeat(32),
            accessTtlSeconds: 3600,
            refreshTtlSeconds: 7776000,
          },
        },
      ],
    }).compile();
    svc = moduleRef.get(AuthService);
  });

  describe('register', () => {
    it('creates user + device and returns access + refresh tokens', async () => {
      const userId = randomUUID();
      const deviceId = randomUUID();
      mockPrisma.user.findUnique.mockResolvedValue(null);
      mockHash.hash.mockResolvedValue('hashed-pw');
      mockPrisma.user.create.mockResolvedValue({
        id: userId,
        email: 'a@b.com',
        displayName: 'A',
      });
      mockPrisma.device.create.mockResolvedValue({
        id: deviceId,
        name: 'Pixel 8',
      });
      mockPrisma.refreshToken.create.mockResolvedValue({ id: 'rt-1' });
      mockJwt.signAccess.mockResolvedValue('access.jwt.token');

      const result = await svc.register({
        email: 'a@b.com',
        password: 'Password1',
        displayName: 'A',
        device,
      });

      expect(result.accessToken).toBe('access.jwt.token');
      expect(result.refreshToken).toEqual(expect.any(String));
      expect(result.refreshToken.length).toBeGreaterThanOrEqual(64);
      expect(result.user).toEqual({
        id: userId,
        email: 'a@b.com',
        displayName: 'A',
      });
      expect(result.device.id).toBe(deviceId);
      expect(mockHash.hash).toHaveBeenCalledWith('Password1');
      // The refresh token row stores the sha256, never the plaintext
      expect(mockPrisma.refreshToken.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            tokenHash: `sha256(${result.refreshToken})`,
          }) as object,
        }) as object,
      );
    });

    it('rejects duplicate email with ConflictException', async () => {
      mockPrisma.user.findUnique.mockResolvedValue({ id: 'existing' });
      await expect(
        svc.register({
          email: 'a@b.com',
          password: 'Password1',
          displayName: 'A',
          device,
        }),
      ).rejects.toThrow(ConflictException);
      expect(mockPrisma.user.create).not.toHaveBeenCalled();
    });
  });

  describe('login', () => {
    it('returns tokens on valid credentials', async () => {
      const userId = randomUUID();
      mockPrisma.user.findUnique.mockResolvedValue({
        id: userId,
        email: 'a@b.com',
        displayName: 'A',
        passwordHash: 'hashed-pw',
      });
      mockHash.verify.mockResolvedValue(true);
      mockPrisma.device.create.mockResolvedValue({ id: 'd1', name: 'Pixel 8' });
      mockPrisma.refreshToken.create.mockResolvedValue({ id: 'rt-2' });
      mockJwt.signAccess.mockResolvedValue('access.jwt.token');

      const result = await svc.login({
        email: 'a@b.com',
        password: 'Password1',
        device,
      });

      expect(result.accessToken).toBe('access.jwt.token');
      expect(result.user.id).toBe(userId);
      expect(mockHash.verify).toHaveBeenCalledWith('Password1', 'hashed-pw');
    });

    it('rejects wrong password with UnauthorizedException', async () => {
      mockPrisma.user.findUnique.mockResolvedValue({
        id: 'u',
        passwordHash: 'h',
      });
      mockHash.verify.mockResolvedValue(false);
      await expect(
        svc.login({ email: 'a@b.com', password: 'wrong', device }),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('rejects unknown email with UnauthorizedException', async () => {
      mockPrisma.user.findUnique.mockResolvedValue(null);
      await expect(
        svc.login({ email: 'nobody@b.com', password: 'x', device }),
      ).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('refresh', () => {
    const liveRow = (overrides: Record<string, unknown> = {}) => ({
      id: 'old-id',
      userId: 'user-1',
      deviceId: 'dev-1',
      tokenHash: 'sha256(old-token)',
      revokedAt: null,
      replacedById: null,
      expiresAt: new Date(Date.now() + 60_000),
      user: { id: 'user-1', email: 'a@b.com', displayName: 'A' },
      device: { id: 'dev-1', name: 'Pixel 8' },
      ...overrides,
    });

    it('rotates: issues new pair, marks old revoked + replaced', async () => {
      mockPrisma.refreshToken.findUnique.mockResolvedValue(liveRow());
      mockPrisma.refreshToken.create.mockResolvedValue({ id: 'new-id' });
      mockPrisma.refreshToken.update.mockResolvedValue({});
      mockJwt.signAccess.mockResolvedValue('new.jwt');

      const result = await svc.refresh('old-token');

      expect(result.accessToken).toBe('new.jwt');
      expect(result.refreshToken).not.toBe('old-token');
      expect(mockPrisma.refreshToken.update).toHaveBeenCalledWith({
        where: { id: 'old-id' },
        data: expect.objectContaining({
          replacedById: 'new-id',
          revokedAt: expect.any(Date) as Date,
        }) as object,
      });
    });

    it('detects reuse (already rotated) and revokes the whole family', async () => {
      mockPrisma.refreshToken.findUnique.mockResolvedValue(
        liveRow({ replacedById: 'newer-id' }),
      );
      mockPrisma.refreshToken.updateMany.mockResolvedValue({ count: 3 });

      await expect(svc.refresh('reused-token')).rejects.toThrow(
        UnauthorizedException,
      );
      expect(mockPrisma.refreshToken.updateMany).toHaveBeenCalledWith({
        where: { userId: 'user-1', revokedAt: null },
        data: { revokedAt: expect.any(Date) as Date },
      });
    });

    it('detects reuse (revoked) and revokes the whole family', async () => {
      mockPrisma.refreshToken.findUnique.mockResolvedValue(
        liveRow({ revokedAt: new Date() }),
      );
      mockPrisma.refreshToken.updateMany.mockResolvedValue({ count: 1 });

      await expect(svc.refresh('revoked-token')).rejects.toThrow(
        UnauthorizedException,
      );
      expect(mockPrisma.refreshToken.updateMany).toHaveBeenCalled();
    });

    it('rejects an expired token without revoking the family', async () => {
      mockPrisma.refreshToken.findUnique.mockResolvedValue(
        liveRow({ expiresAt: new Date(Date.now() - 1000) }),
      );
      await expect(svc.refresh('expired')).rejects.toThrow(
        UnauthorizedException,
      );
      expect(mockPrisma.refreshToken.updateMany).not.toHaveBeenCalled();
    });

    it('rejects an unknown token', async () => {
      mockPrisma.refreshToken.findUnique.mockResolvedValue(null);
      await expect(svc.refresh('nope')).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('logout', () => {
    it('revokes only the presented token, scoped to the user', async () => {
      mockPrisma.refreshToken.updateMany.mockResolvedValue({ count: 1 });
      await svc.logout('user-1', 'token-value');
      expect(mockPrisma.refreshToken.updateMany).toHaveBeenCalledWith({
        where: {
          tokenHash: 'sha256(token-value)',
          userId: 'user-1',
          revokedAt: null,
        },
        data: { revokedAt: expect.any(Date) as Date },
      });
    });
  });
});
