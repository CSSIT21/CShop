/*
  Warnings:

  - The primary key for the `rem_number_interaction_user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `rem_number_payment_product` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `rem_number_product_in_cart` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `rem_number_view_product` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "rem_number_interaction_user" DROP CONSTRAINT "rem_number_interaction_user_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "rem_number_interaction_user_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "rem_number_payment_product" DROP CONSTRAINT "rem_number_payment_product_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "rem_number_payment_product_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "rem_number_product_in_cart" DROP CONSTRAINT "rem_number_product_in_cart_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "rem_number_product_in_cart_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "rem_number_view_product" DROP CONSTRAINT "rem_number_view_product_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "rem_number_view_product_pkey" PRIMARY KEY ("id");
