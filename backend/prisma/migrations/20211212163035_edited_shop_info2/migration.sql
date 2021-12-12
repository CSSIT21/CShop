/*
  Warnings:

  - Made the column `last_active` on table `shop_info` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "shop_info" ALTER COLUMN "followers" SET DEFAULT 0,
ALTER COLUMN "last_active" SET NOT NULL,
ALTER COLUMN "last_active" SET DEFAULT CURRENT_TIMESTAMP;
