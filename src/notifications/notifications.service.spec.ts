import { Test, TestingModule } from '@nestjs/testing';
import { NotificationsService } from './notifications.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateNotificationDto } from './dto/create-notification.dto';

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
          data: Omit<Row, 'id' | 'receivedAt'> & {
            id?: string;
            receivedAt?: Date;
          };
        }) => {
          const row: Row = {
            id: data.id ?? crypto.randomUUID(),
            deviceId: data.deviceId,
            sourceType: data.sourceType,
            sender: data.sender,
            content: data.content,
            packageName: data.packageName,
            occurredAt: data.occurredAt,
            receivedAt: new Date(),
          };
          store.set(row.id, row);
          return row;
        },
      ),
      deleteMany: jest.fn(async () => {
        store.clear();
        return { count: 0 };
      }),
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
    const record = await service.create(sampleDto());
    expect(record.id).toBe('ntf_test_1');
    expect(record.sourceType).toBe('NOTIFICATION');
    expect(record.receivedAt).toBeInstanceOf(Date);
  });

  it('dedupes by id — second create with same id returns the original', async () => {
    const first = await service.create(sampleDto());
    const second = await service.create({
      ...sampleDto(),
      content: 'different',
    });
    expect(second).toEqual(first);
    expect(second.content).toBe('hello');
  });

  it('findAll returns notifications newest-first', async () => {
    await service.create({ ...sampleDto(), id: 'a' });
    await new Promise((r) => setTimeout(r, 5));
    await service.create({ ...sampleDto(), id: 'b' });
    const all = await service.findAll();
    expect(all.map((n) => n.id)).toEqual(['b', 'a']);
  });

  it('findAll filters by deviceId', async () => {
    await service.create({ ...sampleDto(), id: 'x', deviceId: 'dev_a' });
    await service.create({ ...sampleDto(), id: 'y', deviceId: 'dev_b' });
    const aOnly = await service.findAll('dev_a');
    expect(aOnly.map((n) => n.id)).toEqual(['x']);
  });

  it('findAll respects limit', async () => {
    for (let i = 0; i < 5; i += 1) {
      await service.create({ ...sampleDto(), id: `n${i}` });
    }
    const all = await service.findAll(undefined, 3);
    expect(all).toHaveLength(3);
  });

  it('clearAll empties the store', async () => {
    await service.create(sampleDto());
    await service.clearAll();
    const all = await service.findAll();
    expect(all).toEqual([]);
  });
});
