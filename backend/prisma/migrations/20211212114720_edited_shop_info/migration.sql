/*
  Warnings:

  - Made the column `description` on table `shop_info` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "shop_info" ALTER COLUMN "description" SET NOT NULL;
