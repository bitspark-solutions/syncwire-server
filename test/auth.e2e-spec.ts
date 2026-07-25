import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import type { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { PrismaService } from './../src/prisma/prisma.service';

// =============================================================================
// Auth API — end-to-end (mocked Prisma).
//
// Same pattern as app.e2e-spec.ts: PrismaService is replaced with an in-memory
// mock, so no Postgres. Bcrypt hashing and JWT signing are REAL (pure CPU) —
// the full register → login → refresh → logout chain is exercised through the
// HTTP layer exactly as production would run it.
// =============================================================================

type UserRow = {
  id: string;
  email: string;
  passwordHash: string;
  displayName: string;
};
type DeviceRow = { id: string; userId: string; name: string; platform: string };
type TokenRow = {
  id: string;
  userId: string;
  deviceId: string;
  tokenHash: string;
  expiresAt: Date;
  revokedAt: Date | null;
  replacedById: string | null;
};

function buildMockPrisma() {
  const users = new Map<string, UserRow>();
  const devices = new Map<string, DeviceRow>();
  const tokens = new Map<string, TokenRow>();
  let seq = 0;
  const nextId = (prefix: string) => `${prefix}_${++seq}`;

  return {
    users,
    devices,
    tokens,
    reset() {
      users.clear();
      devices.clear();
      tokens.clear();
      seq = 0;
    },
    $queryRaw: jest.fn().mockResolvedValue([{ '?column?': 1 }]),
    $connect: jest.fn().mockResolvedValue(undefined),
    $disconnect: jest.fn().mockResolvedValue(undefined),
    onModuleInit: jest.fn().mockResolvedValue(undefined),
    onModuleDestroy: jest.fn().mockResolvedValue(undefined),
    user: {
      findUnique: jest.fn(
        async ({ where }: { where: { email?: string; id?: string } }) => {
          const all = Array.from(users.values());
          if (where.email) return all.find((u) => u.email === where.email) ?? null;
          if (where.id) return users.get(where.id) ?? null;
          return null;
        },
      ),
      create: jest.fn(async ({ data }: { data: Omit<UserRow, 'id'> }) => {
        const row: UserRow = { id: nextId('user'), ...data };
        users.set(row.id, row);
        return row;
      }),
    },
    device: {
      create: jest.fn(async ({ data }: { data: Omit<DeviceRow, 'id'> }) => {
        const row: DeviceRow = { id: nextId('dev'), ...data };
        devices.set(row.id, row);
        return row;
      }),
    },
    refreshToken: {
      create: jest.fn(
        async ({
          data,
        }: {
          data: Pick<TokenRow, 'userId' | 'deviceId' | 'tokenHash' | 'expiresAt'>;
        }) => {
          const row: TokenRow = {
            id: nextId('rt'),
            ...data,
            revokedAt: null,
            replacedById: null,
          };
          tokens.set(row.id, row);
          return row;
        },
      ),
      findUnique: jest.fn(
        async ({ where }: { where: { tokenHash: string } }) => {
          const row = Array.from(tokens.values()).find(
            (t) => t.tokenHash === where.tokenHash,
          );
          if (!row) return null;
          // Emulate `include: { user: true, device: true }`
          return {
            ...row,
            user: users.get(row.userId),
            device: devices.get(row.deviceId),
          };
        },
      ),
      update: jest.fn(
        async ({
          where,
          data,
        }: {
          where: { id: string };
          data: Partial<TokenRow>;
        }) => {
          const row = tokens.get(where.id);
          if (!row) throw new Error('token not found');
          Object.assign(row, data);
          return row;
        },
      ),
      updateMany: jest.fn(
        async ({
          where,
          data,
        }: {
          where: { userId?: string; tokenHash?: string; revokedAt?: null };
          data: Partial<TokenRow>;
        }) => {
          let count = 0;
          for (const row of tokens.values()) {
            if (where.userId && row.userId !== where.userId) continue;
            if (where.tokenHash && row.tokenHash !== where.tokenHash) continue;
            if (where.revokedAt === null && row.revokedAt !== null) continue;
            Object.assign(row, data);
            count += 1;
          }
          return { count };
        },
      ),
    },
  };
}

const mockPrisma = buildMockPrisma();

const device = { name: 'Pixel 8', platform: 'ANDROID' };
const goodUser = {
  email: 'alice@example.com',
  password: 'Password1',
  displayName: 'Alice',
  device,
};

describe('Auth API (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    mockPrisma.reset();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PrismaService)
      .useValue(mockPrisma)
      .compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
    // Match production: same global ValidationPipe as src/main.ts
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  const register = (body: object = goodUser) =>
    request(app.getHttpServer()).post('/api/auth/register').send(body);

  // ---------------------------------------------------------------------------
  // POST /api/auth/register
  // ---------------------------------------------------------------------------
  it('register returns 201 with tokens, user, and device (no password leak)', async () => {
    const res = await register().expect(201);
    const body = res.body as Record<string, any>;
    expect(body.accessToken).toEqual(expect.any(String));
    expect(body.refreshToken).toEqual(expect.any(String));
    expect(body.user).toEqual({
      id: expect.any(String),
      email: goodUser.email,
      displayName: goodUser.displayName,
    });
    expect(body.device).toEqual({ id: expect.any(String), name: device.name });
    expect(JSON.stringify(body)).not.toContain('Password1');
    expect(JSON.stringify(body)).not.toContain('passwordHash');
  });

  it('register rejects a duplicate email with 409', async () => {
    await register().expect(201);
    await register().expect(409);
  });

  it('register rejects a weak password with 400', async () => {
    await register({ ...goodUser, password: 'onlyletters' }).expect(400);
    await register({ ...goodUser, password: '12345678' }).expect(400);
    await register({ ...goodUser, password: 'Short1' }).expect(400);
  });

  it('register rejects a missing device with 400', async () => {
    const { device: _omitted, ...withoutDevice } = goodUser;
    await register(withoutDevice).expect(400);
  });

  // ---------------------------------------------------------------------------
  // POST /api/auth/login
  // ---------------------------------------------------------------------------
  it('login returns 200 with a fresh token pair for valid credentials', async () => {
    await register().expect(201);
    const res = await request(app.getHttpServer())
      .post('/api/auth/login')
      .send({ email: goodUser.email, password: goodUser.password, device })
      .expect(200);
    const body = res.body as Record<string, any>;
    expect(body.accessToken).toEqual(expect.any(String));
    expect(body.refreshToken).toEqual(expect.any(String));
    expect(body.user.email).toBe(goodUser.email);
  });

  it('login rejects a wrong password and an unknown email with 401', async () => {
    await register().expect(201);
    await request(app.getHttpServer())
      .post('/api/auth/login')
      .send({ email: goodUser.email, password: 'WrongPass1', device })
      .expect(401);
    await request(app.getHttpServer())
      .post('/api/auth/login')
      .send({ email: 'nobody@example.com', password: 'Password1', device })
      .expect(401);
  });

  // ---------------------------------------------------------------------------
  // POST /api/auth/refresh — rotation + reuse detection
  // ---------------------------------------------------------------------------
  it('refresh rotates the token; replaying the old one is rejected 401', async () => {
    const reg = await register().expect(201);
    const oldToken = (reg.body as { refreshToken: string }).refreshToken;

    const rotated = await request(app.getHttpServer())
      .post('/api/auth/refresh')
      .send({ refreshToken: oldToken })
      .expect(200);
    const newToken = (rotated.body as { refreshToken: string }).refreshToken;
    expect(newToken).not.toBe(oldToken);

    // Replay of the rotated token → reuse detection revokes the family.
    await request(app.getHttpServer())
      .post('/api/auth/refresh')
      .send({ refreshToken: oldToken })
      .expect(401);

    // Even the "new" token is now dead — the whole family was revoked.
    await request(app.getHttpServer())
      .post('/api/auth/refresh')
      .send({ refreshToken: newToken })
      .expect(401);
  });

  it('refresh rejects an unknown token with 401', async () => {
    await request(app.getHttpServer())
      .post('/api/auth/refresh')
      .send({ refreshToken: 'not-a-real-token' })
      .expect(401);
  });

  // ---------------------------------------------------------------------------
  // POST /api/auth/logout
  // ---------------------------------------------------------------------------
  it('logout requires a bearer token (401 without)', async () => {
    await request(app.getHttpServer())
      .post('/api/auth/logout')
      .send({ refreshToken: 'whatever' })
      .expect(401);
  });

  it('logout returns 204 and revokes the refresh token', async () => {
    const reg = await register().expect(201);
    const { accessToken, refreshToken } = reg.body as {
      accessToken: string;
      refreshToken: string;
    };

    await request(app.getHttpServer())
      .post('/api/auth/logout')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ refreshToken })
      .expect(204);

    // The revoked token can no longer be used to refresh.
    await request(app.getHttpServer())
      .post('/api/auth/refresh')
      .send({ refreshToken })
      .expect(401);
  });

  // ---------------------------------------------------------------------------
  // Rate limiting
  // ---------------------------------------------------------------------------
  it('throttles auth endpoints: 11th request in a minute gets 429', async () => {
    // Refresh with garbage is cheap (no bcrypt) — 10 allowed, then 429.
    for (let i = 0; i < 10; i += 1) {
      await request(app.getHttpServer())
        .post('/api/auth/refresh')
        .send({ refreshToken: `garbage-${i}` })
        .expect(401);
    }
    await request(app.getHttpServer())
      .post('/api/auth/refresh')
      .send({ refreshToken: 'garbage-final' })
      .expect(429);
  });
});
