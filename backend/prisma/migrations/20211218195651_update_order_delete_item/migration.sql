/*
  Warnings:

  - The primary key for the `order_deleted_item` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "order_deleted_item" DROP CONSTRAINT "order_deleted_item_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "order_deleted_item_pkey" PRIMARY KEY ("id");
