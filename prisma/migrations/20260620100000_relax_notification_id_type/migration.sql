-- M1 follow-up: relax the `id` column from UUID to plain TEXT. The client
-- supplies the id (used as a dedupe key) and the server must accept any
-- string the Android app generates. Migration is a no-op if the column is
-- already TEXT (e.g. fresh installs).
DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'notifications'
      AND column_name = 'id'
      AND data_type = 'uuid'
  ) THEN
    ALTER TABLE "notifications" ALTER COLUMN "id" DROP DEFAULT;
    ALTER TABLE "notifications" ALTER COLUMN "id" TYPE TEXT USING "id"::TEXT;
  END IF;
END $$;
