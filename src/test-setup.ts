// Jest setup file — runs once per test file before any tests execute.
//
// SyncWire tests MUST NOT make real I/O. The unit and e2e tests
// fully mock PrismaService (and any other external clients). Real DB
// connectivity is verified separately by curling /api/health against
// the running docker stack.
//
// This setup:
//   1. Sets a placeholder DATABASE_URL so the zod env validation in
//      ConfigModule.forRoot doesn't fail when a test imports AppModule.
//   2. Tests that need a *real* DB connection override this by setting
//      DATABASE_URL in their own shell before `npm test`. (None in Phase 1;
//      this safety net lands in later phases if/when we add integration
//      tests that intentionally hit Postgres.)

if (!process.env.DATABASE_URL) {
  // Placeholder — tests must mock PrismaService so this URL is never
  // actually dialed. If you see a connection-refused error in tests,
  // you forgot to mock PrismaService in the test module.
  process.env.DATABASE_URL = 'postgresql://test:test@localhost:5432/test';
}
