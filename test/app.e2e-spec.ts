import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import type { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { PrismaService } from './../src/prisma/prisma.service';

// =============================================================================
// SyncWire API — end-to-end (mocked Prisma).
//
// We override PrismaService with an in-memory mock so the suite never touches
// real Postgres. Live round-trip verification (curl /api/notifications against
// the running docker stack) is in scripts/smoke.sh — run that separately when
// the stack is up.
// =============================================================================

type Row = {
  id: string;
  deviceId: string;
  sourceType: string;
  sender: string;
  content: string;
  packageName: string;
  occurredAt: Date;
  receivedAt: Date;
};

function buildMockPrisma() {
  const store = new Map<string, Row>();
  return {
    store,
    $queryRaw: jest.fn().mockResolvedValue([{ '?column?': 1 }]),
    $connect: jest.fn().mockResolvedValue(undefined),
    $disconnect: jest.fn().mockResolvedValue(undefined),
    onModuleInit: jest.fn().mockResolvedValue(undefined),
    onModuleDestroy: jest.fn().mockResolvedValue(undefined),
    user: { findMany: jest.fn().mockResolvedValue([]) },
    notification: {
      findUnique: jest.fn(
        async ({ where: { id } }: { where: { id: string } }) =>
          store.get(id) ?? null,
      ),
      findMany: jest.fn(
        async ({
          where,
          orderBy,
          take,
        }: {
          where?: { deviceId?: string };
          orderBy?: { receivedAt: 'desc' | 'asc' };
          take?: number;
        }) => {
          let rows = Array.from(store.values());
          if (where?.deviceId) {
            rows = rows.filter((r) => r.deviceId === where.deviceId);
          }
          if (orderBy?.receivedAt === 'desc') {
            rows.sort(
              (a, b) => b.receivedAt.getTime() - a.receivedAt.getTime(),
            );
          }
          return take ? rows.slice(0, take) : rows;
        },
      ),
      create: jest.fn(
        async ({
          data,
        }: {
          data: Omit<Row, 'receivedAt'> & { receivedAt?: Date };
        }) => {
          if (store.has(data.id)) {
            throw new Error('duplicate id (should have been deduped upstream)');
          }
          const row: Row = { ...data, receivedAt: new Date() };
          store.set(row.id, row);
          return row;
        },
      ),
      deleteMany: jest.fn(async () => {
        const count = store.size;
        store.clear();
        return { count };
      }),
    },
  };
}

const mockPrisma = buildMockPrisma();

describe('SyncWire API (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    // Fresh store per test
    mockPrisma.store.clear();
    mockPrisma.notification.findUnique.mockClear();
    mockPrisma.notification.findMany.mockClear();
    mockPrisma.notification.create.mockClear();
    mockPrisma.notification.deleteMany.mockClear();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PrismaService)
      .useValue(mockPrisma)
      .compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
    // Match production: same global ValidationPipe as src/main.ts
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, transform: true }),
    );
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  // ---------------------------------------------------------------------------
  // Health
  // ---------------------------------------------------------------------------
  it('GET /api/health returns 200 with the stable shape and an ok DB probe', () => {
    return request(app.getHttpServer())
      .get('/api/health')
      .expect(200)
      .expect((res) => {
        if (res.body.status !== 'ok') {
          throw new Error(`status should be 'ok', got ${res.body.status}`);
        }
        if (typeof res.body.uptimeSeconds !== 'number') {
          throw new Error('uptimeSeconds should be a number');
        }
        if (typeof res.body.timestamp !== 'string') {
          throw new Error('timestamp should be an ISO string');
        }
        if (!res.body.checks?.database) {
          throw new Error('checks.database missing');
        }
        if (!res.body.checks?.mqtt) {
          throw new Error('checks.mqtt missing');
        }
        const db = res.body.checks.database as {
          status: string;
          detail?: string;
        };
        if (db.status !== 'ok') {
          throw new Error(
            `database probe should be ok, got ${db.status} (${db.detail ?? ''})`,
          );
        }
      });
  });

  // ---------------------------------------------------------------------------
  // POST /api/notifications
  // ---------------------------------------------------------------------------
  it('POST /api/notifications creates and returns 201 with all fields', () => {
    return request(app.getHttpServer())
      .post('/api/notifications')
      .send({
        id: 'e2e_create_1',
        deviceId: 'dev_e2e_1',
        sourceType: 'NOTIFICATION',
        sender: 'com.test.app',
        content: 'hello world',
        timestamp: 1718540000000,
        packageName: 'com.test.app',
      })
      .expect(201)
      .expect((res) => {
        const n = res.body as Record<string, unknown>;
        if (n.id !== 'e2e_create_1') throw new Error(`id mismatch: ${n.id}`);
        if (n.deviceId !== 'dev_e2e_1')
          throw new Error(`deviceId mismatch: ${n.deviceId}`);
        if (n.sourceType !== 'NOTIFICATION')
          throw new Error(`sourceType mismatch: ${n.sourceType}`);
        if (n.content !== 'hello world')
          throw new Error(`content mismatch: ${n.content}`);
        if (n.timestamp !== 1718540000000)
          throw new Error(`timestamp mismatch: ${n.timestamp}`);
        if (!n.receivedAt) throw new Error('receivedAt missing');
      });
  });

  it('POST dedupes by id — same id returns the original, not a new row', async () => {
    await request(app.getHttpServer())
      .post('/api/notifications')
      .send({
        id: 'dup_1',
        deviceId: 'dev_x',
        sourceType: 'NOTIFICATION',
        sender: 'a',
        content: 'first',
        timestamp: 1,
        packageName: 'p',
      })
      .expect(201);

    await request(app.getHttpServer())
      .post('/api/notifications')
      .send({
        id: 'dup_1',
        deviceId: 'dev_x',
        sourceType: 'NOTIFICATION',
        sender: 'a',
        content: 'second',
        timestamp: 2,
        packageName: 'p',
      })
      .expect(201)
      .expect((res) => {
        if ((res.body as { content: string }).content !== 'first') {
          throw new Error('dedupe failed: second POST should return original');
        }
      });

    const list = await request(app.getHttpServer())
      .get('/api/notifications')
      .expect(200);
    if (list.body.length !== 1) {
      throw new Error(`expected 1 row after dedupe, got ${list.body.length}`);
    }
  });

  it('POST rejects missing required fields with 400', () => {
    return request(app.getHttpServer())
      .post('/api/notifications')
      .send({
        id: 'incomplete',
        // missing deviceId, sourceType, sender, content, timestamp, packageName
      })
      .expect(400);
  });

  // ---------------------------------------------------------------------------
  // GET /api/notifications
  // ---------------------------------------------------------------------------
  it('GET /api/notifications returns rows newest-first', async () => {
    await seed(request(app.getHttpServer()), 'a', 'dev_1', 'first');
    await new Promise((r) => setTimeout(r, 5));
    await seed(request(app.getHttpServer()), 'b', 'dev_1', 'second');
    await new Promise((r) => setTimeout(r, 5));
    await seed(request(app.getHttpServer()), 'c', 'dev_2', 'other device');

    const res = await request(app.getHttpServer())
      .get('/api/notifications')
      .expect(200);
    const ids = (res.body as Array<{ id: string }>).map((n) => n.id);
    if (ids[0] !== 'c' || ids[1] !== 'b' || ids[2] !== 'a') {
      throw new Error(`expected [c,b,a], got ${ids.join(',')}`);
    }
  });

  it('GET /api/notifications?deviceId=... filters by device', async () => {
    await seed(request(app.getHttpServer()), 'a', 'dev_1', 'from 1');
    await seed(request(app.getHttpServer()), 'b', 'dev_2', 'from 2');

    const res = await request(app.getHttpServer())
      .get('/api/notifications?deviceId=dev_1')
      .expect(200);
    const ids = (res.body as Array<{ id: string }>).map((n) => n.id);
    if (ids.length !== 1 || ids[0] !== 'a') {
      throw new Error(`expected [a], got ${ids.join(',')}`);
    }
  });

  it('GET /api/notifications?limit=N caps the result set', async () => {
    for (let i = 0; i < 5; i += 1) {
      await seed(request(app.getHttpServer()), `n${i}`, 'dev_x', `msg ${i}`);
    }
    const res = await request(app.getHttpServer())
      .get('/api/notifications?limit=2')
      .expect(200);
    if (res.body.length !== 2) {
      throw new Error(`expected 2 rows, got ${res.body.length}`);
    }
  });

  // ---------------------------------------------------------------------------
  // GET /api/notifications/:id
  // ---------------------------------------------------------------------------
  it('GET /api/notifications/:id returns the row when present', async () => {
    await seed(request(app.getHttpServer()), 'find_me', 'dev_x', 'hello');
    const res = await request(app.getHttpServer())
      .get('/api/notifications/find_me')
      .expect(200);
    if ((res.body as { id: string }).id !== 'find_me') {
      throw new Error('id mismatch');
    }
  });

  it('GET /api/notifications/:id returns 404 when missing', () => {
    return request(app.getHttpServer())
      .get('/api/notifications/does_not_exist')
      .expect(404);
  });

  // ---------------------------------------------------------------------------
  // DELETE /api/notifications
  // ---------------------------------------------------------------------------
  it('DELETE /api/notifications clears all rows (204)', async () => {
    await seed(request(app.getHttpServer()), 'a', 'd', 'x');
    await seed(request(app.getHttpServer()), 'b', 'd', 'y');
    await request(app.getHttpServer()).delete('/api/notifications').expect(204);
    const res = await request(app.getHttpServer())
      .get('/api/notifications')
      .expect(200);
    if (res.body.length !== 0) {
      throw new Error(`expected 0 rows after clear, got ${res.body.length}`);
    }
  });
});

// -----------------------------------------------------------------------------
// Helper: seed a notification via the public API so the test exercises the
// controller → service → mock chain end-to-end.
// -----------------------------------------------------------------------------
function seed(
  agent: ReturnType<typeof request>,
  id: string,
  deviceId: string,
  content: string,
) {
  return agent
    .post('/api/notifications')
    .send({
      id,
      deviceId,
      sourceType: 'NOTIFICATION',
      sender: 'tester',
      content,
      timestamp: Date.now(),
      packageName: 'com.test',
    })
    .expect(201);
}
