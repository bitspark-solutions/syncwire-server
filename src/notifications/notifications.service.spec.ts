import { Test, TestingModule } from '@nestjs/testing';
import { NotificationsService } from './notifications.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateNotificationDto } from './dto/create-notification.dto';

const TEST_USER_ID = 'user-test-1';

const sampleDto = (): CreateNotificationDto => ({
  id: 'ntf_test_1',
  deviceId: 'dev_test_1',
  sourceType: 'NOTIFICATION',
  sender: 'com.example.messaging',
  content: 'hello',
  timestamp: Date.now(),
  packageName: 'com.example.messaging',
});

type Row = {
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

describe('NotificationsService', () => {
  let service: NotificationsService;
  let store: Map<string, Row>;

  // Minimal in-memory Prisma mock. Just the methods the service calls.
  const prismaMock = {
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
          where?: { userId?: string; deviceId?: string };
          orderBy?: { receivedAt: 'desc' | 'asc' };
          take?: number;
        }) => {
          let rows = Array.from(store.values());
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
          data: Omit<Row, 'receivedAt'> & { receivedAt?: Date };
        }) => {
          const row: Row = {
            ...data,
            receivedAt: new Date(),
          };
          store.set(row.id, row);
          return row;
        },
      ),
      deleteMany: jest.fn(
        async ({ where }: { where?: { userId?: string } }) => {
          if (where?.userId) {
            let count = 0;
            for (const [id, n] of store) {
              if (n.userId === where.userId) {
                store.delete(id);
                count++;
              }
            }
            return { count };
          }
          const count = store.size;
          store.clear();
          return { count };
        },
      ),
    },
  };

  beforeEach(async () => {
    store = new Map();
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationsService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();
    service = moduleRef.get<NotificationsService>(NotificationsService);
  });

  it('creates a notification and returns the record', async () => {
    const record = await service.create(sampleDto(), TEST_USER_ID);
    expect(record.id).toBe('ntf_test_1');
    expect(record.sourceType).toBe('NOTIFICATION');
    expect(record.receivedAt).toBeInstanceOf(Date);
  });

  it('dedupes by id — second create with same id returns the original', async () => {
    const first = await service.create(sampleDto(), TEST_USER_ID);
    const second = await service.create(
      { ...sampleDto(), content: 'different' },
      TEST_USER_ID,
    );
    expect(second).toEqual(first);
    expect(second.content).toBe('hello');
  });

  it('findAll returns notifications newest-first', async () => {
    await service.create({ ...sampleDto(), id: 'a' }, TEST_USER_ID);
    await new Promise((r) => setTimeout(r, 5));
    await service.create({ ...sampleDto(), id: 'b' }, TEST_USER_ID);
    const all = await service.findAll(TEST_USER_ID);
    expect(all.map((n) => n.id)).toEqual(['b', 'a']);
  });

  it('findAll filters by deviceId', async () => {
    await service.create(
      { ...sampleDto(), id: 'x', deviceId: 'dev_a' },
      TEST_USER_ID,
    );
    await service.create(
      { ...sampleDto(), id: 'y', deviceId: 'dev_b' },
      TEST_USER_ID,
    );
    const aOnly = await service.findAll(TEST_USER_ID, 'dev_a');
    expect(aOnly.map((n) => n.id)).toEqual(['x']);
  });

  it('findAll respects limit', async () => {
    for (let i = 0; i < 5; i += 1) {
      await service.create({ ...sampleDto(), id: `n${i}` }, TEST_USER_ID);
    }
    const all = await service.findAll(TEST_USER_ID, undefined, 3);
    expect(all).toHaveLength(3);
  });

  it('findAll isolates by userId', async () => {
    await service.create({ ...sampleDto(), id: 'user1-notif' }, 'user-1');
    await service.create({ ...sampleDto(), id: 'user2-notif' }, 'user-2');

    const user1Notifs = await service.findAll('user-1');
    const user2Notifs = await service.findAll('user-2');

    expect(user1Notifs.map((n) => n.id)).toEqual(['user1-notif']);
    expect(user2Notifs.map((n) => n.id)).toEqual(['user2-notif']);
  });

  it('clearAll empties the store for that user only', async () => {
    await service.create({ ...sampleDto(), id: 'user1-notif' }, 'user-1');
    await service.create({ ...sampleDto(), id: 'user2-notif' }, 'user-2');

    await service.clearAll('user-1');

    const user1Notifs = await service.findAll('user-1');
    const user2Notifs = await service.findAll('user-2');

    expect(user1Notifs).toEqual([]);
    expect(user2Notifs).toHaveLength(1);
  });
});
