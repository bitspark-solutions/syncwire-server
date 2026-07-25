import { Inject, Injectable } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';
import { JWT_OPTIONS, type JwtOptions } from './jwt.options';

/**
 * Access-JWT payload (HS256). Refresh tokens are NOT JWTs — they are opaque
 * random strings stored (SHA-256-hashed) in the refresh_tokens table.
 */
export interface AccessTokenPayload {
  sub: string; // user id
  devices: string[]; // device ids this token is bound to
  iat?: number;
  exp?: number;
}

@Injectable()
export class JwtService {
  // Stateless helper — secret/TTL are passed per call, so a bare instance
  // (no module registration ceremony) is all we need.
  private readonly nestJwt = new NestJwtService();

  constructor(@Inject(JWT_OPTIONS) private readonly opts: JwtOptions) {}

  signAccess(
    payload: Omit<AccessTokenPayload, 'iat' | 'exp'>,
  ): Promise<string> {
    return this.nestJwt.signAsync(payload, {
      secret: this.opts.secret,
      expiresIn: this.opts.accessTtlSeconds,
    });
  }

  verifyAccess(token: string): Promise<AccessTokenPayload> {
    return this.nestJwt.verifyAsync<AccessTokenPayload>(token, {
      secret: this.opts.secret,
    });
  }
}
