/*
  Warnings:

  - You are about to drop the column `section_type` on the `shop_section_log` table. All the data in the column will be lost.
  - Changed the type of `device` on the `shop_section_log` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "shop_section_log" DROP COLUMN "section_type",
DROP COLUMN "device",
ADD COLUMN     "device" TEXT NOT NULL;

-- DropEnum
DROP TYPE "Platform";
