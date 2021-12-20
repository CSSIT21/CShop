/*
  Warnings:

  - Added the required column `view_date` to the `home_shop_log` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "home_shop_log" ADD COLUMN     "view_date" TIMESTAMP NOT NULL;
