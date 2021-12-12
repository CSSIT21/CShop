/*
  Warnings:

  - Added the required column `shop_id` to the `shop_category` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "shop_category" ADD COLUMN     "shop_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "shop_category" ADD CONSTRAINT "shop_category_shop_id_fkey" FOREIGN KEY ("shop_id") REFERENCES "shop_info"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
