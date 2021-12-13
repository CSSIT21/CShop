/*
  Warnings:

  - Added the required column `admin_id` to the `admin_support` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `admin_support` table without a default value. This is not possible if the table is not empty.
  - Added the required column `target` to the `admin_support` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `admin_support` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "admin_support" ADD COLUMN     "admin_id" INTEGER NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "target" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;
