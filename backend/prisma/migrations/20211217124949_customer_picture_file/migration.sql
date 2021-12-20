/*
  Warnings:

  - You are about to drop the column `primary` on the `customer_picture_file` table. All the data in the column will be lost.
  - You are about to drop the column `tracking_number` on the `delivery_product_status` table. All the data in the column will be lost.
  - Added the required column `province` to the `delivery_product_status` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "customer_picture_file" DROP COLUMN "primary";

-- AlterTable
ALTER TABLE "delivery_product_status" DROP COLUMN "tracking_number",
ADD COLUMN     "province" VARCHAR(2) NOT NULL;
