/*
  Warnings:

  - Added the required column `phone_number` to the `address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recipient_name` to the `address` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "address" ADD COLUMN     "phone_number" VARCHAR(10) NOT NULL,
ADD COLUMN     "recipient_name" VARCHAR(60) NOT NULL;
