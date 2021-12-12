/*
  Warnings:

  - You are about to drop the column `keyword` on the `home_banner` table. All the data in the column will be lost.
  - Added the required column `order` to the `home_banner` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "home_banner" DROP COLUMN "keyword",
ADD COLUMN     "keywords" VARCHAR(20)[],
ADD COLUMN     "order" INTEGER NOT NULL;
