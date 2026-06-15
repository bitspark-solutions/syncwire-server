import { z } from 'zod';

/**
 * Centralized environment-variable schema. Imported by `app.module.ts` and
 * validated once at boot — if a required var is missing or malformed, the
 * process exits with a clear error rather than crashing later at runtime.
 *
 * Phase 0 ships only the boot-time vars. Phase 1 (Prisma + auth) will add
 * `DATABASE_URL` and JWT secrets; Phase 2 (MQTT) will add EMQX_URL. Add them
 * here when their feature lands — never read `process.env.X` directly.
 */
const envSchema = z.object({
  // Server
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  PORT: z.coerce.number().int().min(1).max(65535).default(8080),
  LOG_LEVEL: z
    .enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace'])
    .default('info'),

  // Phase 1+ — placeholder so the schema is forward-compatible. Marked optional
  // until the feature that uses them lands, then flip to required.
  DATABASE_URL: z.string().url().optional(),
  JWT_SECRET: z.string().min(32).optional(),
  JWT_SECRET_PREVIOUS: z.string().min(32).optional(),
  JWT_ACCESS_TTL_SECONDS: z.coerce.number().int().positive().default(3600),
  JWT_REFRESH_TTL_SECONDS: z.coerce
    .number()
    .int()
    .positive()
    .default(7_776_000), // 90 days

  // Phase 2+ — MQTT broker
  EMQX_URL: z.string().url().optional(),
  EMQX_BRIDGE_USERNAME: z.string().optional(),
  EMQX_BRIDGE_PASSWORD: z.string().optional(),

  // Storage / retention
  NOTIFICATION_RETENTION_DAYS: z.coerce.number().int().positive().default(30),
});

export type AppEnv = z.infer<typeof envSchema>;

export function validateEnv(raw: NodeJS.ProcessEnv): AppEnv {
  const parsed = envSchema.safeParse(raw);
  if (!parsed.success) {
    console.error(
      '❌ Invalid environment variables:\n',
      JSON.stringify(parsed.error.flatten().fieldErrors, null, 2),
    );
    process.exit(1);
  }
  return parsed.data;
}
