/*
  Warnings:

  - The primary key for the `delivery_admin_log` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "delivery_admin_log" DROP CONSTRAINT "delivery_admin_log_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "delivery_admin_log_pkey" PRIMARY KEY ("id");
