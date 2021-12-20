/*
  Warnings:

  - You are about to drop the column `status` on the `order_status` table. All the data in the column will be lost.
  - Added the required column `status_id` to the `order_status` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "order_status" DROP COLUMN "status",
ADD COLUMN     "status_id" INTEGER NOT NULL,
ALTER COLUMN "delivery_by" SET DEFAULT E'CShop Delivery';

-- AddForeignKey
ALTER TABLE "order_status" ADD CONSTRAINT "order_status_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "delivery_product_status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
