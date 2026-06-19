import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('SyncWire API (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    // Match production: routes are namespaced under /api
    app.setGlobalPrefix('api');
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('GET /api/health returns 200 with the stable shape', () => {
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
      });
  });

  it('POST /api/notifications creates and returns 201 with receivedAt', () => {
    return request(app.getHttpServer())
      .post('/api/notifications')
      .send({
        id: 'e2e_create_1',
        sourceType: 'SMS',
        sender: '+15555550100',
        content: 'e2e test message',
        timestamp: Date.now(),
        packageName: 'com.test.app',
      })
      .expect(201)
      .expect((res) => {
        if (res.body.id !== 'e2e_create_1') {
          throw new Error(`id should be 'e2e_create_1', got ${res.body.id}`);
        }
        if (!res.body.receivedAt) {
          throw new Error('receivedAt should be set by the server');
        }
      });
  });

  it('GET /api/notifications returns the in-memory list as an array', async () => {
    // Seed one notification
    await request(app.getHttpServer())
      .post('/api/notifications')
      .send({
        id: 'e2e_list_1',
        sourceType: 'NOTIFICATION',
        sender: 'com.test.app',
        content: 'e2e list test',
        timestamp: Date.now(),
        packageName: 'com.test.app',
      })
      .expect(201);

    return request(app.getHttpServer())
      .get('/api/notifications')
      .expect(200)
      .expect((res) => {
        if (!Array.isArray(res.body)) {
          throw new Error('response should be an array');
        }
        const ids = (res.body as Array<{ id: string }>).map((n) => n.id);
        if (!ids.includes('e2e_list_1')) {
          throw new Error(`expected e2e_list_1 in list, got ${ids.join(',')}`);
        }
      });
  });
});
