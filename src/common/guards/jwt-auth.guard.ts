import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import type { Request } from 'express';
import { JwtService } from '../../auth/jwt.service';
import type { AccessTokenPayload } from '../../auth/jwt.service';

/** Request shape after the guard runs — `user` is the verified JWT payload. */
export interface AuthenticatedRequest extends Request {
  user: AccessTokenPayload;
}

/**
 * Verifies the `Authorization: Bearer <jwt>` header and attaches the decoded
 * payload to `req.user`. No passport — JwtService.verifyAccess is all the
 * strategy we need.
 */
@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwt: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const header = req.headers.authorization;
    if (!header?.startsWith('Bearer ')) {
      throw new UnauthorizedException('missing bearer token');
    }
    try {
      req.user = await this.jwt.verifyAccess(header.slice('Bearer '.length));
    } catch {
      throw new UnauthorizedException('invalid or expired access token');
    }
    return true;
  }
}
