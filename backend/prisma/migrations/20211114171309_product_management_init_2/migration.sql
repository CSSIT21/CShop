/*
  Warnings:

  - You are about to drop the `banner_picture` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `comment_rating` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `icon_picture` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `review_picture` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "category" DROP CONSTRAINT "category_banner_id_fkey";

-- DropForeignKey
ALTER TABLE "category" DROP CONSTRAINT "category_icon_id_fkey";

-- DropForeignKey
ALTER TABLE "comment_rating" DROP CONSTRAINT "comment_rating_customer_id_fkey";

-- DropForeignKey
ALTER TABLE "comment_rating" DROP CONSTRAINT "comment_rating_review_id_fkey";

-- DropForeignKey
ALTER TABLE "review_picture" DROP CONSTRAINT "review_picture_product_review_id_fkey";

-- DropTable
DROP TABLE "banner_picture";

-- DropTable
DROP TABLE "comment_rating";

-- DropTable
DROP TABLE "icon_picture";

-- DropTable
DROP TABLE "review_picture";

-- CreateTable
CREATE TABLE "category_icon_picture" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "path" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "mime_type" VARCHAR(20) NOT NULL,

    CONSTRAINT "category_icon_picture_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "category_banner_picture" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "path" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "mime_type" VARCHAR(20) NOT NULL,

    CONSTRAINT "category_banner_picture_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_reviews_picture" (
    "product_review_id" INTEGER NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "path" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "mime_type" VARCHAR(20) NOT NULL,

    CONSTRAINT "product_reviews_picture_pkey" PRIMARY KEY ("product_review_id")
);

-- CreateTable
CREATE TABLE "product_comment_rating" (
    "review_id" INTEGER NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "rate" "Comment_Raitng" NOT NULL,
    "comment_time" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "product_comment_rating_pkey" PRIMARY KEY ("review_id")
);

-- AddForeignKey
ALTER TABLE "category" ADD CONSTRAINT "category_icon_id_fkey" FOREIGN KEY ("icon_id") REFERENCES "category_icon_picture"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "category" ADD CONSTRAINT "category_banner_id_fkey" FOREIGN KEY ("banner_id") REFERENCES "category_banner_picture"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_reviews_picture" ADD CONSTRAINT "product_reviews_picture_product_review_id_fkey" FOREIGN KEY ("product_review_id") REFERENCES "product_reviews"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_comment_rating" ADD CONSTRAINT "product_comment_rating_review_id_fkey" FOREIGN KEY ("review_id") REFERENCES "product_reviews"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_comment_rating" ADD CONSTRAINT "product_comment_rating_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
