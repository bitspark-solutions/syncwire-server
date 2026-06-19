// PrismaService unit test — uses jest.mock to fully replace @prisma/client
// and @prisma/adapter-pg. We never touch a real database in unit tests; the
// real PrismaService is exercised against the docker stack via curl, not
// from within the test suite.

const mockConnect = jest.fn().mockResolvedValue(undefined);
const mockDisconnect = jest.fn().mockResolvedValue(undefined);
const mockUserFindMany = jest.fn().mockResolvedValue([]);

jest.mock('@prisma/adapter-pg', () => ({
  PrismaPg: jest.fn().mockImplementation((config: unknown) => ({ __mock: 'PrismaPg', config })),
}));

// Mock the Prisma 7 generated-client path (matches the `output` in
// prisma/schema.prisma). Prisma 7 dropped the `PrismaClient` export from
// `@prisma/client` directly; the supported pattern is to generate into a
// project-local path and import from there.
jest.mock('./generated/client/client', () => {
  // Important: do NOT return an object from the constructor. When the
  // derived class (PrismaService) calls super(), if the parent constructor
  // returns an object it BECOMES the new `this` of the derived class,
  // and our prototype-defined methods (onModuleInit, onModuleDestroy)
  // are no longer accessible. By mutating `this` instead of returning,
  // the derived class instance is preserved and its prototype methods
  // remain reachable.
  return {
    PrismaClient: jest.fn().mockImplementation(function (this: unknown) {
      (this as Record<string, unknown>).$connect = mockConnect;
      (this as Record<string, unknown>).$disconnect = mockDisconnect;
      (this as Record<string, unknown>).$queryRaw = jest
        .fn()
        .mockResolvedValue([{ now: new Date('2026-01-01T00:00:00Z') }]);
      (this as Record<string, unknown>).user = { findMany: mockUserFindMany };
      // No return — let `this` remain the derived-class instance.
    }),
  };
});

import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaService } from './prisma.service';

describe('PrismaService', () => {
  const TEST_URL = 'postgresql://test:***@localhost:5432/test';

  let service: PrismaService;

  beforeEach(async () => {
    jest.clearAllMocks();
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        PrismaService,
        { provide: ConfigService, useValue: { get: () => TEST_URL } },
      ],
    }).compile();
    service = moduleRef.get<PrismaService>(PrismaService);
  });

  it('constructs a PrismaPg adapter with the DATABASE_URL from config', () => {
    expect(PrismaPg).toHaveBeenCalledTimes(1);
    expect(PrismaPg).toHaveBeenCalledWith(
      expect.objectContaining({ connectionString: TEST_URL }),
    );
  });

  it('throws if DATABASE_URL is not set', () => {
    expect(() => {
      new PrismaService({ get: () => undefined } as unknown as ConfigService);
    }).toThrow(/DATABASE_URL is not set/);
  });

  it('calls $connect on OnModuleInit', async () => {
    await service.onModuleInit();
    expect(mockConnect).toHaveBeenCalledTimes(1);
  });

  it('calls $disconnect on OnModuleDestroy', async () => {
    await service.onModuleDestroy();
    expect(mockDisconnect).toHaveBeenCalledTimes(1);
  });

  it('exposes the Prisma client surface (user model is reachable)', () => {
    expect(service.user).toBeDefined();
    expect(service.user.findMany).toBe(mockUserFindMany);
  });
});
