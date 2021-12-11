/*
  Warnings:

  - You are about to drop the column `picture_id` on the `product_choices` table. All the data in the column will be lost.
  - You are about to drop the `product_picture` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "product_choices" DROP CONSTRAINT "product_choices_picture_id_fkey";

-- DropForeignKey
ALTER TABLE "product_picture" DROP CONSTRAINT "product_picture_product_id_fkey";

-- AlterTable
ALTER TABLE "product_choices" DROP COLUMN "picture_id";

-- DropTable
DROP TABLE "product_picture";
