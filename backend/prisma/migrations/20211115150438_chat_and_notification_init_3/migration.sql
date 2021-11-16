/*
  Warnings:

  - You are about to drop the column `from_a_to_b` on the `chat_deleted_message` table. All the data in the column will be lost.
  - You are about to drop the column `seem` on the `chat_message` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "chat_deleted_message" DROP COLUMN "from_a_to_b",
ADD COLUMN     "from_customer" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "chat_message" DROP COLUMN "seem",
ADD COLUMN     "seen" BOOLEAN NOT NULL DEFAULT false;
