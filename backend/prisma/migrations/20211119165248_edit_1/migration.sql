/*
  Warnings:

  - You are about to drop the column `keyword` on the `home_partner` table. All the data in the column will be lost.
  - The primary key for the `product_reviews_picture` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `product_review_id` on the `product_reviews_picture` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "product_reviews_picture" DROP CONSTRAINT "product_reviews_picture_product_review_id_fkey";

-- AlterTable
ALTER TABLE "home_banner" ADD COLUMN     "keyword" VARCHAR(20)[],
ADD COLUMN     "visible" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "home_partner" DROP COLUMN "keyword";

-- AlterTable
ALTER TABLE "product_reviews" ADD COLUMN     "review_picture_id" INTEGER[];

-- AlterTable
ALTER TABLE "product_reviews_picture" DROP CONSTRAINT "product_reviews_picture_pkey",
DROP COLUMN "product_review_id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "product_reviews_picture_pkey" PRIMARY KEY ("id");
