/*
  Warnings:

  - Added the required column `path` to the `discount` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thumbnail` to the `discount` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "discount" ADD COLUMN     "path" TEXT NOT NULL,
ADD COLUMN     "thumbnail" TEXT NOT NULL;
