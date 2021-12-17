/*
  Warnings:

  - You are about to drop the column `join_date` on the `customer` table. All the data in the column will be lost.
  - You are about to drop the column `join_date` on the `shop_info` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Comment_Raitng" AS ENUM ('Like', 'Dislike');

-- AlterTable
ALTER TABLE "customer" DROP COLUMN "join_date",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "shop_info" DROP COLUMN "join_date",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "icon_picture" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "path" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "mime_type" VARCHAR(20) NOT NULL,

    CONSTRAINT "icon_picture_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "banner_picture" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "path" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "mime_type" VARCHAR(20) NOT NULL,

    CONSTRAINT "banner_picture_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "category" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(20) NOT NULL,
    "icon_id" INTEGER NOT NULL,
    "banner_id" INTEGER NOT NULL,

    CONSTRAINT "category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product" (
    "id" SERIAL NOT NULL,
    "shop_id" INTEGER NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "sub_title" VARCHAR(70) NOT NULL,
    "category_id" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "sold" INTEGER NOT NULL,
    "added_date" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "suggest_products" INTEGER[],
    "rating" DECIMAL(1,1) NOT NULL,

    CONSTRAINT "product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_detail" (
    "product_id" INTEGER NOT NULL,

    CONSTRAINT "product_detail_pkey" PRIMARY KEY ("product_id")
);

-- CreateTable
CREATE TABLE "product_picture" (
    "product_id" INTEGER NOT NULL,
    "photo_id" SERIAL NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "path" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "mime_type" VARCHAR(20) NOT NULL,

    CONSTRAINT "product_picture_pkey" PRIMARY KEY ("photo_id")
);

-- CreateTable
CREATE TABLE "product_reviews" (
    "id" SERIAL NOT NULL,
    "product_id" INTEGER NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "review_time" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "product_reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "review_picture" (
    "product_review_id" INTEGER NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "path" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "mime_type" VARCHAR(20) NOT NULL,

    CONSTRAINT "review_picture_pkey" PRIMARY KEY ("product_review_id")
);

-- CreateTable
CREATE TABLE "product_short_link" (
    "product_id" INTEGER NOT NULL,
    "shorted_link" TEXT NOT NULL,

    CONSTRAINT "product_short_link_pkey" PRIMARY KEY ("product_id")
);

-- CreateTable
CREATE TABLE "comment_rating" (
    "review_id" INTEGER NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "rate" "Comment_Raitng" NOT NULL,
    "comment_time" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "comment_rating_pkey" PRIMARY KEY ("review_id")
);

-- CreateTable
CREATE TABLE "product_options" (
    "id" SERIAL NOT NULL,
    "product_id" INTEGER NOT NULL,
    "name" VARCHAR(20) NOT NULL,

    CONSTRAINT "product_options_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_choices" (
    "id" SERIAL NOT NULL,
    "product_options_id" INTEGER NOT NULL,
    "name" VARCHAR(30) NOT NULL,
    "price" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "picture_id" INTEGER NOT NULL,

    CONSTRAINT "product_choices_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "category" ADD CONSTRAINT "category_icon_id_fkey" FOREIGN KEY ("icon_id") REFERENCES "icon_picture"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "category" ADD CONSTRAINT "category_banner_id_fkey" FOREIGN KEY ("banner_id") REFERENCES "banner_picture"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_shop_id_fkey" FOREIGN KEY ("shop_id") REFERENCES "shop_info"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_detail" ADD CONSTRAINT "product_detail_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_picture" ADD CONSTRAINT "product_picture_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_reviews" ADD CONSTRAINT "product_reviews_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_reviews" ADD CONSTRAINT "product_reviews_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review_picture" ADD CONSTRAINT "review_picture_product_review_id_fkey" FOREIGN KEY ("product_review_id") REFERENCES "product_reviews"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_short_link" ADD CONSTRAINT "product_short_link_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment_rating" ADD CONSTRAINT "comment_rating_review_id_fkey" FOREIGN KEY ("review_id") REFERENCES "product_reviews"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment_rating" ADD CONSTRAINT "comment_rating_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_options" ADD CONSTRAINT "product_options_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_choices" ADD CONSTRAINT "product_choices_product_options_id_fkey" FOREIGN KEY ("product_options_id") REFERENCES "product_options"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_choices" ADD CONSTRAINT "product_choices_picture_id_fkey" FOREIGN KEY ("picture_id") REFERENCES "product_picture"("photo_id") ON DELETE RESTRICT ON UPDATE CASCADE;
