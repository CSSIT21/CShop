/*
  Warnings:

  - You are about to drop the column `date` on the `shop_info` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "shop_info" DROP COLUMN "date",
ADD COLUMN     "join_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
