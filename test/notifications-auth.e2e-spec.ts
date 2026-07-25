import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import type { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { PrismaService } from './../src/prisma/prisma.service';

// =============================================================================
// SyncWire API — Auth + Per-User Notifications E2E
//
// Tests the full flow: register → login → create notification → list notifications
// Verifies that users can only see their own notifications.
// =============================================================================

type UserRow = {
  id: string;
  email: string;
  passwordHash: string;
  displayName: string;
  createdAt: Date;
  updatedAt: Date;
};

type DeviceRow = {
  id: string;
  userId: string;
  name: string;
  platform: string;
  pushToken: string | null;
  lastSeenAt: Date | null;
  createdAt: Date;
  revokedAt: Date | null;
};

type NotificationRow = {
  id: string;
  userId: string;
  deviceId: string;
  sourceType: string;
  sender: string;
  content: string;
  packageName: string;
  occurredAt: Date;
  receivedAt: Date;
};

type RefreshTokenRow = {
  id: string;
  userId: string;
  deviceId: string;
  tokenHash: string;
  expiresAt: Date;
  replacedById: string | null;
  revokedAt: Date | null;
  createdAt: Date;
};

function buildMockPrisma() {
  const users = new Map<string, UserRow>();
  const devices = new Map<string, DeviceRow>();
  const notifications = new Map<string, NotificationRow>();
  const refreshTokens = new Map<string, RefreshTokenRow>();
  let userIdCounter = 0;
  let deviceIdCounter = 0;
  let refreshTokenIdCounter = 0;

  return {
    users,
    devices,
    notifications,
    refreshTokens,
    $queryRaw: jest.fn().mockResolvedValue([{ '?column?': 1 }]),
    $connect: jest.fn().mockResolvedValue(undefined),
    $disconnect: jest.fn().mockResolvedValue(undefined),
    onModuleInit: jest.fn().mockResolvedValue(undefined),
    onModuleDestroy: jest.fn().mockResolvedValue(undefined),
    user: {
      findUnique: jest.fn(
        async ({ where: { email } }: { where: { email: string } }) => {
          for (const u of users.values()) {
            if (u.email === email) return u;
          }
          return null;
        },
      ),
      create: jest.fn(
        async ({
          data,
        }: {
          data: { email: string; passwordHash: string; displayName: string };
        }) => {
          const id = `user-${++userIdCounter}`;
          const row: UserRow = {
            id,
            ...data,
            createdAt: new Date(),
            updatedAt: new Date(),
          };
          users.set(id, row);
          return row;
        },
      ),
    },
    device: {
      create: jest.fn(
        async ({
          data,
        }: {
          data: { userId: string; name: string; platform: string };
        }) => {
          const id = `device-${++deviceIdCounter}`;
          const row: DeviceRow = {
            id,
            ...data,
            pushToken: null,
            lastSeenAt: null,
            createdAt: new Date(),
            revokedAt: null,
          };
          devices.set(id, row);
          return row;
        },
      ),
    },
    notification: {
      findUnique: jest.fn(
        async ({ where: { id } }: { where: { id: string } }) =>
          notifications.get(id) ?? null,
      ),
      findMany: jest.fn(
        async ({
          where,
          orderBy,
          take,
        }: {
          where?: { userId?: string; deviceId?: string };
          orderBy?: { receivedAt: 'desc' | 'asc' };
          take?: number;
        }) => {
          let rows = Array.from(notifications.values());
          if (where?.userId) {
            rows = rows.filter((r) => r.userId === where.userId);
          }
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
          data: Omit<NotificationRow, 'receivedAt'> & { receivedAt?: Date };
        }) => {
          if (notifications.has(data.id)) {
            throw new Error('duplicate id');
          }
          const row: NotificationRow = { ...data, receivedAt: new Date() };
          notifications.set(row.id, row);
          return row;
        },
      ),
      deleteMany: jest.fn(
        async ({ where }: { where?: { userId?: string } }) => {
          if (where?.userId) {
            let count = 0;
            for (const [id, n] of notifications) {
              if (n.userId === where.userId) {
                notifications.delete(id);
                count++;
              }
            }
            return { count };
          }
          const count = notifications.size;
          notifications.clear();
          return { count };
        },
      ),
    },
    refreshToken: {
      findUnique: jest.fn(
        async ({
          where: { tokenHash },
          include,
        }: {
          where: { tokenHash: string };
          include?: { user: boolean; device: boolean };
        }) => {
          for (const rt of refreshTokens.values()) {
            if (rt.tokenHash === tokenHash) {
              const result: any = { ...rt };
              if (include?.user) {
                result.user = users.get(rt.userId);
              }
              if (include?.device) {
                result.device = devices.get(rt.deviceId);
              }
              return result;
            }
          }
          return null;
        },
      ),
      create: jest.fn(
        async ({
          data,
        }: {
          data: {
            userId: string;
            deviceId: string;
            tokenHash: string;
            expiresAt: Date;
          };
        }) => {
          const id = `refresh-${++refreshTokenIdCounter}`;
          const row: RefreshTokenRow = {
            id,
            ...data,
            replacedById: null,
            revokedAt: null,
            createdAt: new Date(),
          };
          refreshTokens.set(id, row);
          return row;
        },
      ),
      update: jest.fn(
        async ({
          where: { id },
          data,
        }: {
          where: { id: string };
          data: { revokedAt?: Date; replacedById?: string };
        }) => {
          const row = refreshTokens.get(id);
          if (!row) throw new Error('refresh token not found');
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
          data: { revokedAt?: Date };
        }) => {
          let count = 0;
          for (const rt of refreshTokens.values()) {
            let match = true;
            if (where.userId && rt.userId !== where.userId) match = false;
            if (where.tokenHash && rt.tokenHash !== where.tokenHash) match = false;
            if (where.revokedAt === null && rt.revokedAt !== null) match = false;
            if (match) {
              Object.assign(rt, data);
              count++;
            }
          }
          return { count };
        },
      ),
    },
  };
}

const mockPrisma = buildMockPrisma();

describe('Auth + Per-User Notifications (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    // Fresh store per test
    mockPrisma.users.clear();
    mockPrisma.devices.clear();
    mockPrisma.notifications.clear();
    mockPrisma.refreshTokens.clear();
    jest.clearAllMocks();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PrismaService)
      .useValue(mockPrisma)
      .compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, transform: true }),
    );
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  // ---------------------------------------------------------------------------
  // Helper: register a user and return tokens
  // ---------------------------------------------------------------------------
  async function registerUser(
    email: string,
    password: string,
    displayName: string,
    deviceName: string,
  ) {
    const res = await request(app.getHttpServer())
      .post('/api/auth/register')
      .send({
        email,
        password,
        displayName,
        device: { name: deviceName, platform: 'android' },
      })
      .expect(201);
    return res.body as {
      accessToken: string;
      refreshToken: string;
      user: { id: string; email: string; displayName: string };
      device: { id: string; name: string; platform: string };
    };
  }

  // ---------------------------------------------------------------------------
  // Helper: create a notification as a user
  // ---------------------------------------------------------------------------
  async function createNotification(
    accessToken: string,
    id: string,
    deviceId: string,
    sender: string,
    content: string,
  ) {
    return request(app.getHttpServer())
      .post('/api/notifications')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        id,
        deviceId,
        sourceType: 'NOTIFICATION',
        sender,
        content,
        timestamp: Date.now(),
        packageName: 'com.test.app',
      })
      .expect(201);
  }

  // ---------------------------------------------------------------------------
  // Tests
  // ---------------------------------------------------------------------------

  it('register creates user and returns tokens', async () => {
    const user = await registerUser(
      'test@example.com',
      'password123',
      'Test User',
      'Pixel 7',
    );

    expect(user.accessToken).toBeDefined();
    expect(user.refreshToken).toBeDefined();
    expect(user.user.email).toBe('test@example.com');
    expect(user.user.displayName).toBe('Test User');
    expect(user.device.name).toBe('Pixel 7');
    expect(user.device.id).toBeDefined();
  });

  it('user can create and retrieve their own notification', async () => {
    const user = await registerUser(
      'usera@test.com',
      'password123',
      'User A',
      'Device A',
    );

    await createNotification(
      user.accessToken,
      'notif-1',
      user.device.id,
      'WhatsApp',
      'Hello from User A',
    );

    const res = await request(app.getHttpServer())
      .get('/api/notifications')
      .set('Authorization', `Bearer ${user.accessToken}`)
      .expect(200);

    expect(res.body).toHaveLength(1);
    expect(res.body[0].id).toBe('notif-1');
    expect(res.body[0].sender).toBe('WhatsApp');
    expect(res.body[0].content).toBe('Hello from User A');
  });

  it('users can only see their own notifications (isolation)', async () => {
    // Register two users
    const userA = await registerUser(
      'usera@test.com',
      'password123',
      'User A',
      'Device A',
    );
    const userB = await registerUser(
      'userb@test.com',
      'password123',
      'User B',
      'Device B',
    );

    // Both create notifications
    await createNotification(
      userA.accessToken,
      'notif-a',
      userA.device.id,
      'WhatsApp',
      'Message from A',
    );
    await createNotification(
      userB.accessToken,
      'notif-b',
      userB.device.id,
      'Telegram',
      'Message from B',
    );

    // User A should only see their own
    const resA = await request(app.getHttpServer())
      .get('/api/notifications')
      .set('Authorization', `Bearer ${userA.accessToken}`)
      .expect(200);

    expect(resA.body).toHaveLength(1);
    expect(resA.body[0].id).toBe('notif-a');
    expect(resA.body[0].sender).toBe('WhatsApp');

    // User B should only see their own
    const resB = await request(app.getHttpServer())
      .get('/api/notifications')
      .set('Authorization', `Bearer ${userB.accessToken}`)
      .expect(200);

    expect(resB.body).toHaveLength(1);
    expect(resB.body[0].id).toBe('notif-b');
    expect(resB.body[0].sender).toBe('Telegram');
  });

  it('user cannot access another user\'s notification by id', async () => {
    const userA = await registerUser(
      'usera@test.com',
      'password123',
      'User A',
      'Device A',
    );
    const userB = await registerUser(
      'userb@test.com',
      'password123',
      'User B',
      'Device B',
    );

    await createNotification(
      userB.accessToken,
      'notif-b',
      userB.device.id,
      'Telegram',
      'Secret message',
    );

    // User A tries to access User B's notification
    await request(app.getHttpServer())
      .get('/api/notifications/notif-b')
      .set('Authorization', `Bearer ${userA.accessToken}`)
      .expect(404);
  });

  it('user can only clear their own notifications', async () => {
    const userA = await registerUser(
      'usera@test.com',
      'password123',
      'User A',
      'Device A',
    );
    const userB = await registerUser(
      'userb@test.com',
      'password123',
      'User B',
      'Device B',
    );

    await createNotification(
      userA.accessToken,
      'notif-a',
      userA.device.id,
      'WhatsApp',
      'Message from A',
    );
    await createNotification(
      userB.accessToken,
      'notif-b',
      userB.device.id,
      'Telegram',
      'Message from B',
    );

    // User A clears their notifications
    await request(app.getHttpServer())
      .delete('/api/notifications')
      .set('Authorization', `Bearer ${userA.accessToken}`)
      .expect(204);

    // User A should have none
    const resA = await request(app.getHttpServer())
      .get('/api/notifications')
      .set('Authorization', `Bearer ${userA.accessToken}`)
      .expect(200);
    expect(resA.body).toHaveLength(0);

    // User B should still have theirs
    const resB = await request(app.getHttpServer())
      .get('/api/notifications')
      .set('Authorization', `Bearer ${userB.accessToken}`)
      .expect(200);
    expect(resB.body).toHaveLength(1);
    expect(resB.body[0].id).toBe('notif-b');
  });

  it('unauthenticated requests are rejected', async () => {
    await request(app.getHttpServer())
      .get('/api/notifications')
      .expect(401);

    await request(app.getHttpServer())
      .post('/api/notifications')
      .send({
        id: 'test',
        deviceId: 'dev',
        sourceType: 'NOTIFICATION',
        sender: 'test',
        content: 'test',
        timestamp: Date.now(),
        packageName: 'com.test',
      })
      .expect(401);
  });

  it('login returns valid tokens for existing user', async () => {
    const email = 'login@test.com';
    const password = 'password123';

    // Register
    await registerUser(email, password, 'Login User', 'Device');

    // Login
    const res = await request(app.getHttpServer())
      .post('/api/auth/login')
      .send({
        email,
        password,
        device: { name: 'Device', platform: 'android' },
      })
      .expect(200);

    expect(res.body.accessToken).toBeDefined();
    expect(res.body.refreshToken).toBeDefined();

    // Use token to access notifications
    await request(app.getHttpServer())
      .get('/api/notifications')
      .set('Authorization', `Bearer ${res.body.accessToken}`)
      .expect(200);
  });

  it('full Android app simulation: register → send notif → verify isolation', async () => {
    // Simulate two Android devices registering
    const androidA = await registerUser(
      'android-a@test.com',
      'password123',
      'Android User A',
      'Pixel 7 Pro',
    );
    const androidB = await registerUser(
      'android-b@test.com',
      'password123',
      'Android User B',
      'Samsung Galaxy',
    );

    // Android A forwards a notification
    await createNotification(
      androidA.accessToken,
      'android-notif-a-001',
      androidA.device.id,
      'com.whatsapp',
      'WhatsApp message from Alice',
    );

    // Android B forwards a notification
    await createNotification(
      androidB.accessToken,
      'android-notif-b-001',
      androidB.device.id,
      'org.telegram',
      'Telegram message from Bob',
    );

    // Web UI fetches for User A
    const webResA = await request(app.getHttpServer())
      .get('/api/notifications')
      .set('Authorization', `Bearer ${androidA.accessToken}`)
      .expect(200);

    expect(webResA.body).toHaveLength(1);
    expect(webResA.body[0].sender).toBe('com.whatsapp');
    expect(webResA.body[0].content).toBe('WhatsApp message from Alice');

    // Web UI fetches for User B
    const webResB = await request(app.getHttpServer())
      .get('/api/notifications')
      .set('Authorization', `Bearer ${androidB.accessToken}`)
      .expect(200);

    expect(webResB.body).toHaveLength(1);
    expect(webResB.body[0].sender).toBe('org.telegram');
    expect(webResB.body[0].content).toBe('Telegram message from Bob');

    // Verify no cross-contamination
    const idsA = webResA.body.map((n: { id: string }) => n.id);
    const idsB = webResB.body.map((n: { id: string }) => n.id);
    expect(idsA).not.toContain('android-notif-b-001');
    expect(idsB).not.toContain('android-notif-a-001');
  });
});
