/*
  Warnings:

  - The `sections` column on the `shop_section` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "shop_section" DROP COLUMN "sections",
ADD COLUMN     "sections" TEXT[];
