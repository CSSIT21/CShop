/*
  Warnings:

  - You are about to drop the column `type` on the `home_banner` table. All the data in the column will be lost.
  - Added the required column `type` to the `home_partner` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "home_banner" DROP COLUMN "type";

-- AlterTable
ALTER TABLE "home_partner" ADD COLUMN     "type" "homePartnerType" NOT NULL;
