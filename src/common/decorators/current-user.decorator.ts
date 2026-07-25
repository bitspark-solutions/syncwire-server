import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { AccessTokenPayload } from '../../auth/jwt.service';
import type { AuthenticatedRequest } from '../guards/jwt-auth.guard';

/**
 * Injects the verified JWT payload set by JwtAuthGuard.
 * Only meaningful on routes guarded by JwtAuthGuard.
 */
export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): AccessTokenPayload => {
    const req = ctx.switchToHttp().getRequest<AuthenticatedRequest>();
    return req.user;
  },
);
