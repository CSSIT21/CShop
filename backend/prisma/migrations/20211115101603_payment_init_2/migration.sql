/*
  Warnings:

  - Made the column `refund_id` on table `payment_credit_card_transaction` required. This step will fail if there are existing NULL values in that column.
  - Made the column `refund_id` on table `payment_wallet_transaction` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "payment_credit_card_transaction" ALTER COLUMN "refund_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "payment_wallet_transaction" ALTER COLUMN "refund_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "payment_credit_card_transaction" ADD CONSTRAINT "payment_credit_card_transaction_refund_id_fkey" FOREIGN KEY ("refund_id") REFERENCES "order_refund_item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_wallet_transaction" ADD CONSTRAINT "payment_wallet_transaction_refund_id_fkey" FOREIGN KEY ("refund_id") REFERENCES "order_refund_item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
