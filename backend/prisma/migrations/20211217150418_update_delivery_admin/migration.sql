/*
  Warnings:

  - Added the required column `token` to the `delivery_admin` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "delivery_admin" ADD COLUMN     "token" TEXT NOT NULL;
