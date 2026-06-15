import { Test, TestingModule } from '@nestjs/testing';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';

const sampleDto = (): CreateNotificationDto => ({
  id: 'ntf_test_1',
  sourceType: 'SMS',
  sender: '+8801700000000',
  content: 'hello',
  timestamp: Date.now(),
  packageName: 'com.example.messaging',
});

describe('NotificationsService', () => {
  let service: NotificationsService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [NotificationsService],
    }).compile();
    service = moduleRef.get<NotificationsService>(NotificationsService);
  });

  afterEach(() => service.clearAll());

  it('creates a notification and returns the record', () => {
    const record = service.create(sampleDto());
    expect(record.id).toBe('ntf_test_1');
    expect(record.sourceType).toBe('SMS');
    expect(record.receivedAt).toBeInstanceOf(Date);
  });

  it('dedupes by id — second create with same id returns the original', () => {
    const first = service.create(sampleDto());
    const second = service.create({ ...sampleDto(), content: 'different' });
    expect(second).toBe(first);
    expect(second.content).toBe('hello');
  });

  it('findAll returns notifications newest-first', () => {
    service.create({ ...sampleDto(), id: 'a' });
    service.create({ ...sampleDto(), id: 'b' });
    const all = service.findAll();
    expect(all.map((n) => n.id)).toEqual(['b', 'a']);
  });

  it('caps storage at 100 and evicts the oldest', () => {
    for (let i = 0; i < 105; i += 1) {
      service.create({ ...sampleDto(), id: `n${i}` });
    }
    expect(service.findAll()).toHaveLength(100);
    expect(service.findAll()[99]?.id).toBe('n5');
  });

  it('clearAll empties the store', () => {
    service.create(sampleDto());
    service.clearAll();
    expect(service.findAll()).toEqual([]);
  });
});
