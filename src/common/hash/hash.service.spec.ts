import { HashService } from './hash.service';

describe('HashService', () => {
  let service: HashService;

  beforeEach(() => {
    service = new HashService();
  });

  it('hashes a string and verifies it', async () => {
    const hash = await service.hash('hello');
    expect(hash).not.toBe('hello');
    expect(await service.verify('hello', hash)).toBe(true);
    expect(await service.verify('wrong', hash)).toBe(false);
  });

  it('produces different hashes for the same input (salted)', async () => {
    const a = await service.hash('hello');
    const b = await service.hash('hello');
    expect(a).not.toBe(b);
    expect(await service.verify('hello', a)).toBe(true);
    expect(await service.verify('hello', b)).toBe(true);
  });

  it('sha256 is deterministic and hex-encoded', () => {
    const a = service.sha256('token-value');
    const b = service.sha256('token-value');
    expect(a).toBe(b);
    expect(a).toMatch(/^[0-9a-f]{64}$/);
    expect(service.sha256('other')).not.toBe(a);
  });
});
