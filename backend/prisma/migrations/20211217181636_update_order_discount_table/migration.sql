/*
  Warnings:

  - The primary key for the `discount_customer_spend` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `discount_daily_coin` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `discount_used_coin` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `discount_user_code` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `order_cart_item` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `rating` on the `product_reviews` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `Decimal(2,1)`.
  - You are about to alter the column `rating` on the `shop_comment` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `Decimal(2,1)`.

*/
-- AlterTable
ALTER TABLE "discount_customer_spend" DROP CONSTRAINT "discount_customer_spend_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "discount_customer_spend_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "discount_daily_coin" DROP CONSTRAINT "discount_daily_coin_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "discount_daily_coin_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "discount_used_coin" DROP CONSTRAINT "discount_used_coin_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "discount_used_coin_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "discount_user_code" DROP CONSTRAINT "discount_user_code_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "discount_user_code_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "order_cart_item" DROP CONSTRAINT "order_cart_item_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "order_cart_item_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "product_reviews" ALTER COLUMN "rating" SET DATA TYPE DECIMAL(2,1);

-- AlterTable
ALTER TABLE "shop_comment" ALTER COLUMN "rating" SET DATA TYPE DECIMAL(2,1);
