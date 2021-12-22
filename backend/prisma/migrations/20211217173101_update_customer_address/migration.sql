/*
  Warnings:

  - The primary key for the `customer_address` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "customer_address" DROP CONSTRAINT "customer_address_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "customer_address_pkey" PRIMARY KEY ("id");
