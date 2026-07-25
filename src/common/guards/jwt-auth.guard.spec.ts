import { Test, TestingModule } from '@nestjs/testing';
import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
import { JwtService } from '../../auth/jwt.service';

const mockJwt = { verifyAccess: jest.fn() };

/** Minimal ExecutionContext stub carrying just the request headers. */
function ctxWith(headers: Record<string, string>): ExecutionContext {
  const req: Record<string, unknown> = { headers };
  return {
    switchToHttp: () => ({ getRequest: () => req }),
  } as unknown as ExecutionContext;
}

describe('JwtAuthGuard', () => {
  let guard: JwtAuthGuard;

  beforeEach(async () => {
    jest.clearAllMocks();
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [JwtAuthGuard, { provide: JwtService, useValue: mockJwt }],
    }).compile();
    guard = moduleRef.get(JwtAuthGuard);
  });

  it('accepts a valid bearer token and attaches the payload to req.user', async () => {
    const payload = { sub: 'user-1', devices: ['dev-1'] };
    mockJwt.verifyAccess.mockResolvedValue(payload);
    const ctx = ctxWith({ authorization: 'Bearer good.jwt' });

    await expect(guard.canActivate(ctx)).resolves.toBe(true);
    expect(mockJwt.verifyAccess).toHaveBeenCalledWith('good.jwt');
    const req = ctx.switchToHttp().getRequest<{ user: unknown }>();
    expect(req.user).toEqual(payload);
  });

  it('rejects a missing Authorization header', async () => {
    await expect(guard.canActivate(ctxWith({}))).rejects.toThrow(
      UnauthorizedException,
    );
    expect(mockJwt.verifyAccess).not.toHaveBeenCalled();
  });

  it('rejects a non-Bearer scheme', async () => {
    await expect(
      guard.canActivate(ctxWith({ authorization: 'Basic abc' })),
    ).rejects.toThrow(UnauthorizedException);
  });

  it('rejects an invalid/expired token as 401', async () => {
    mockJwt.verifyAccess.mockRejectedValue(new Error('jwt expired'));
    await expect(
      guard.canActivate(ctxWith({ authorization: 'Bearer bad.jwt' })),
    ).rejects.toThrow(UnauthorizedException);
  });
});
