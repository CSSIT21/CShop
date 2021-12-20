/*
  Warnings:

  - You are about to drop the column `filter_name` on the `shop_product_carousel` table. All the data in the column will be lost.
  - You are about to drop the column `products` on the `shop_product_carousel` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `shop_product_carousel` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `category` to the `shop_product_carousel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "product" ALTER COLUMN "rating" SET DATA TYPE DECIMAL(2,1);

-- AlterTable
ALTER TABLE "shop_product_carousel" DROP COLUMN "filter_name",
DROP COLUMN "products",
ADD COLUMN     "category" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "shop_product_carousel_select" (
    "id" TEXT NOT NULL,
    "filter_name" TEXT NOT NULL,
    "products" INTEGER[],

    CONSTRAINT "shop_product_carousel_select_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "shop_product_carousel_select_id_key" ON "shop_product_carousel_select"("id");

-- CreateIndex
CREATE UNIQUE INDEX "shop_product_carousel_id_key" ON "shop_product_carousel"("id");
