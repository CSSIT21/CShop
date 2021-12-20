/*
  Warnings:

  - You are about to drop the column `path` on the `discount` table. All the data in the column will be lost.
  - You are about to drop the column `thumbnail` on the `discount` table. All the data in the column will be lost.
  - Added the required column `picture_path` to the `discount` table without a default value. This is not possible if the table is not empty.
  - Added the required column `picture_thumbnail` to the `discount` table without a default value. This is not possible if the table is not empty.
  - Added the required column `picture_title` to the `discount` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "discount" DROP COLUMN "path",
DROP COLUMN "thumbnail",
ADD COLUMN     "picture_path" TEXT NOT NULL,
ADD COLUMN     "picture_thumbnail" TEXT NOT NULL,
ADD COLUMN     "picture_title" TEXT NOT NULL;
