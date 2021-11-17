/*
  Warnings:

  - Added the required column `info` to the `product_detail` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "product_detail" ADD COLUMN     "info" TEXT NOT NULL;
