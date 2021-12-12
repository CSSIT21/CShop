/*
  Warnings:

  - Added the required column `description` to the `shop_info` table without a default value. This is not possible if the table is not empty.
  - Added the required column `followers` to the `shop_info` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_active` to the `shop_info` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "shop_info" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "followers" INTEGER NOT NULL,
ADD COLUMN     "last_active" TIMESTAMP(3) NOT NULL;
