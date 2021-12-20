/*
  Warnings:

  - The `delivery_detail` column on the `delivery_product_status` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "delivery_product_status" DROP COLUMN "delivery_detail",
ADD COLUMN     "delivery_detail" JSONB[];
