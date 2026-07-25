/*
  Warnings:

  - Added the required column `user_id` to the `notifications` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "notifications" ADD COLUMN "user_id" UUID;

-- Set a default user_id for existing rows (using the first user in the system)
-- In production, you would want to handle this differently
UPDATE "notifications" SET "user_id" = (SELECT id FROM "users" LIMIT 1);

-- Now make it NOT NULL
ALTER TABLE "notifications" ALTER COLUMN "user_id" SET NOT NULL;

-- CreateIndex
CREATE INDEX "notifications_user_id_received_at_idx" ON "notifications"("user_id", "received_at");

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
