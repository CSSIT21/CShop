/*
  Warnings:

  - You are about to drop the `email_verification` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `followed_shop` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `old_password` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `picture_file` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `wishlist` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "customer_picture" DROP CONSTRAINT "customer_picture_picture_id_fkey";

-- DropForeignKey
ALTER TABLE "followed_shop" DROP CONSTRAINT "followed_shop_customer_id_fkey";

-- DropForeignKey
ALTER TABLE "old_password" DROP CONSTRAINT "old_password_customer_id_fkey";

-- DropForeignKey
ALTER TABLE "wishlist" DROP CONSTRAINT "wishlist_customer_id_fkey";

-- DropTable
DROP TABLE "email_verification";

-- DropTable
DROP TABLE "followed_shop";

-- DropTable
DROP TABLE "old_password";

-- DropTable
DROP TABLE "picture_file";

-- DropTable
DROP TABLE "wishlist";

-- CreateTable
CREATE TABLE "customer_picture_file" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "path" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "mime_type" VARCHAR(20) NOT NULL,
    "primary" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "customer_picture_file_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customer_old_password" (
    "customer_id" INTEGER NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "changed_date" TIMESTAMP NOT NULL,

    CONSTRAINT "customer_old_password_pkey" PRIMARY KEY ("customer_id")
);

-- CreateTable
CREATE TABLE "customer_wishlist" (
    "customer_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "added_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "customer_wishlist_pkey" PRIMARY KEY ("customer_id")
);

-- CreateTable
CREATE TABLE "customer_followed_shop" (
    "customer_id" INTEGER NOT NULL,
    "shop_id" INTEGER NOT NULL,
    "added_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "customer_followed_shop_pkey" PRIMARY KEY ("customer_id")
);

-- CreateTable
CREATE TABLE "customer_email_verification" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(60) NOT NULL,
    "token" TEXT NOT NULL,
    "expire_date" TIMESTAMP NOT NULL,

    CONSTRAINT "customer_email_verification_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "customer_picture" ADD CONSTRAINT "customer_picture_picture_id_fkey" FOREIGN KEY ("picture_id") REFERENCES "customer_picture_file"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customer_old_password" ADD CONSTRAINT "customer_old_password_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customer_wishlist" ADD CONSTRAINT "customer_wishlist_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customer_followed_shop" ADD CONSTRAINT "customer_followed_shop_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
