import { JwtService } from './jwt.service';

describe('JwtService', () => {
  const secret = 'test-secret-32-chars-long-aaaaaa';
  let svc: JwtService;

  beforeEach(() => {
    svc = new JwtService({
      secret,
      accessTtlSeconds: 60,
      refreshTtlSeconds: 3600,
    });
  });

  it('signs and verifies an access token', async () => {
    const token = await svc.signAccess({ sub: 'user-1', devices: ['dev-1'] });
    const payload = await svc.verifyAccess(token);
    expect(payload.sub).toBe('user-1');
    expect(payload.devices).toEqual(['dev-1']);
    expect(typeof payload.exp).toBe('number');
  });

  it('rejects a token signed with a different secret', async () => {
    const other = new JwtService({
      secret: 'different-secret-32-chars-aaaaaa',
      accessTtlSeconds: 60,
      refreshTtlSeconds: 3600,
    });
    const token = await other.signAccess({ sub: 'user-1', devices: [] });
    await expect(svc.verifyAccess(token)).rejects.toThrow();
  });

  it('rejects an expired access token', async () => {
    const expiredSvc = new JwtService({
      secret,
      accessTtlSeconds: -1,
      refreshTtlSeconds: 3600,
    });
    const token = await expiredSvc.signAccess({ sub: 'user-1', devices: [] });
    await expect(svc.verifyAccess(token)).rejects.toThrow();
  });

  it('rejects garbage input', async () => {
    await expect(svc.verifyAccess('not-a-jwt')).rejects.toThrow();
  });
});
