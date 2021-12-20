/*
  Warnings:

  - The primary key for the `customer_wishlist` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "customer_wishlist" DROP CONSTRAINT "customer_wishlist_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "customer_wishlist_pkey" PRIMARY KEY ("id");
