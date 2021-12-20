/*
  Warnings:

  - The primary key for the `customer_followed_shop` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `home_add_to_cart_log` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `home_discount_log` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `home_payment_log` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `home_product_log` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `home_shop_log` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "customer_followed_shop" DROP CONSTRAINT "customer_followed_shop_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "customer_followed_shop_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "home_add_to_cart_log" DROP CONSTRAINT "home_add_to_cart_log_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "home_add_to_cart_log_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "home_discount_log" DROP CONSTRAINT "home_discount_log_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "home_discount_log_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "home_payment_log" DROP CONSTRAINT "home_payment_log_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "home_payment_log_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "home_product_log" DROP CONSTRAINT "home_product_log_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "home_product_log_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "home_shop_log" DROP CONSTRAINT "home_shop_log_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "home_shop_log_pkey" PRIMARY KEY ("id");
