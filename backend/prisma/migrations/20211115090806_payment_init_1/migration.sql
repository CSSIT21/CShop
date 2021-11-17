-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('Pending', 'Success', 'Failed', 'Refunding', 'Refunded');

-- CreateEnum
CREATE TYPE "PaymentTypes" AS ENUM ('QR', 'Deeplink', 'Card');

-- CreateEnum
CREATE TYPE "PaymentCardTransactionStatus" AS ENUM ('Success', 'InsuffientBalance', 'Rejected', 'Refunded');

-- CreateEnum
CREATE TYPE "PaymentWalletTransactionStatus" AS ENUM ('Success', 'InsuffientBalance', 'Refunded');

-- CreateEnum
CREATE TYPE "PaymentBankSelect" AS ENUM ('SCB', 'KBANK', 'TMB', 'KTB');

-- CreateEnum
CREATE TYPE "PaymentCreditTypes" AS ENUM ('MasterCard', 'Visa', 'PayPal');

-- CreateTable
CREATE TABLE "payment_seller_income" (
    "shop_id" INTEGER NOT NULL,
    "order_id" INTEGER NOT NULL,
    "total_price" INTEGER NOT NULL,
    "time" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "payment_seller_income_pkey" PRIMARY KEY ("shop_id")
);

-- CreateTable
CREATE TABLE "payment_seller_income_receipt" (
    "shop_id" INTEGER NOT NULL,
    "total_income" INTEGER NOT NULL,
    "time" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "receipt" TEXT NOT NULL,

    CONSTRAINT "payment_seller_income_receipt_pkey" PRIMARY KEY ("shop_id")
);

-- CreateTable
CREATE TABLE "payment_shop_bank_account" (
    "shop_id" INTEGER NOT NULL,
    "firstname" VARCHAR(20) NOT NULL,
    "lastname" VARCHAR(20) NOT NULL,
    "bank" "PaymentBankSelect" NOT NULL,
    "account_number" VARCHAR(255) NOT NULL,

    CONSTRAINT "payment_shop_bank_account_pkey" PRIMARY KEY ("shop_id")
);

-- CreateTable
CREATE TABLE "wallet" (
    "id" SERIAL NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "balance" INTEGER NOT NULL DEFAULT 0,
    "updated_time" TIMESTAMP NOT NULL,

    CONSTRAINT "wallet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment_credit_card" (
    "id" SERIAL NOT NULL,
    "card_number" VARCHAR(255) NOT NULL,
    "expire_date" DATE NOT NULL,
    "cvc" VARCHAR(255) NOT NULL,
    "type" "PaymentCreditTypes" NOT NULL,

    CONSTRAINT "payment_credit_card_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment_credit_card_owner" (
    "customer_id" INTEGER NOT NULL,
    "credit_card_id" INTEGER NOT NULL,

    CONSTRAINT "payment_credit_card_owner_pkey" PRIMARY KEY ("credit_card_id")
);

-- CreateTable
CREATE TABLE "payment" (
    "id" SERIAL NOT NULL,
    "order_id" INTEGER NOT NULL,
    "type" "PaymentTypes" NOT NULL,
    "amount" INTEGER NOT NULL,
    "status" "PaymentStatus" NOT NULL,
    "created_date" TIMESTAMP NOT NULL,
    "updated_date" TIMESTAMP NOT NULL,

    CONSTRAINT "payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment_transaction" (
    "id" SERIAL NOT NULL,
    "amount" INTEGER NOT NULL,
    "time" TIMESTAMP NOT NULL,
    "desc" VARCHAR(64) NOT NULL,

    CONSTRAINT "payment_transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment_credit_card_transaction" (
    "id" SERIAL NOT NULL,
    "card_id" INTEGER NOT NULL,
    "status" "PaymentCardTransactionStatus" NOT NULL,
    "transaction_id" INTEGER NOT NULL,
    "refund_id" INTEGER,

    CONSTRAINT "payment_credit_card_transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment_card" (
    "payment_id" INTEGER NOT NULL,
    "card_id" INTEGER NOT NULL,
    "credit_card_transaction_id" INTEGER NOT NULL,

    CONSTRAINT "payment_card_pkey" PRIMARY KEY ("payment_id")
);

-- CreateTable
CREATE TABLE "payment_wallet_transaction" (
    "id" SERIAL NOT NULL,
    "status" "PaymentWalletTransactionStatus" NOT NULL,
    "wallet_id" INTEGER NOT NULL,
    "transaction_id" INTEGER NOT NULL,
    "refund_id" INTEGER,

    CONSTRAINT "payment_wallet_transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment_wallet" (
    "payment_id" INTEGER NOT NULL,
    "wallet_id" INTEGER NOT NULL,
    "wallet_transaction_id" INTEGER NOT NULL,

    CONSTRAINT "payment_wallet_pkey" PRIMARY KEY ("payment_id")
);

-- CreateTable
CREATE TABLE "payment_qr" (
    "payment_id" INTEGER NOT NULL,
    "transaction_id" INTEGER NOT NULL,
    "ref" TEXT NOT NULL,
    "qr" TEXT NOT NULL,

    CONSTRAINT "payment_qr_pkey" PRIMARY KEY ("payment_id")
);

-- CreateTable
CREATE TABLE "payment_deeplink" (
    "payment_id" INTEGER NOT NULL,
    "transaction_id" INTEGER NOT NULL,
    "ref" TEXT NOT NULL,
    "link" TEXT NOT NULL,

    CONSTRAINT "payment_deeplink_pkey" PRIMARY KEY ("payment_id")
);

-- AddForeignKey
ALTER TABLE "payment_seller_income" ADD CONSTRAINT "payment_seller_income_shop_id_fkey" FOREIGN KEY ("shop_id") REFERENCES "shop_info"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_seller_income_receipt" ADD CONSTRAINT "payment_seller_income_receipt_shop_id_fkey" FOREIGN KEY ("shop_id") REFERENCES "shop_info"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_shop_bank_account" ADD CONSTRAINT "payment_shop_bank_account_shop_id_fkey" FOREIGN KEY ("shop_id") REFERENCES "shop_info"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wallet" ADD CONSTRAINT "wallet_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_credit_card_owner" ADD CONSTRAINT "payment_credit_card_owner_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_credit_card_owner" ADD CONSTRAINT "payment_credit_card_owner_credit_card_id_fkey" FOREIGN KEY ("credit_card_id") REFERENCES "payment_credit_card"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_credit_card_transaction" ADD CONSTRAINT "payment_credit_card_transaction_card_id_fkey" FOREIGN KEY ("card_id") REFERENCES "payment_credit_card"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_credit_card_transaction" ADD CONSTRAINT "payment_credit_card_transaction_transaction_id_fkey" FOREIGN KEY ("transaction_id") REFERENCES "payment_transaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_card" ADD CONSTRAINT "payment_card_payment_id_fkey" FOREIGN KEY ("payment_id") REFERENCES "payment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_card" ADD CONSTRAINT "payment_card_card_id_fkey" FOREIGN KEY ("card_id") REFERENCES "payment_credit_card"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_card" ADD CONSTRAINT "payment_card_credit_card_transaction_id_fkey" FOREIGN KEY ("credit_card_transaction_id") REFERENCES "payment_credit_card_transaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_wallet_transaction" ADD CONSTRAINT "payment_wallet_transaction_wallet_id_fkey" FOREIGN KEY ("wallet_id") REFERENCES "wallet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_wallet_transaction" ADD CONSTRAINT "payment_wallet_transaction_transaction_id_fkey" FOREIGN KEY ("transaction_id") REFERENCES "payment_transaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_wallet" ADD CONSTRAINT "payment_wallet_payment_id_fkey" FOREIGN KEY ("payment_id") REFERENCES "payment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_wallet" ADD CONSTRAINT "payment_wallet_wallet_id_fkey" FOREIGN KEY ("wallet_id") REFERENCES "wallet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_wallet" ADD CONSTRAINT "payment_wallet_wallet_transaction_id_fkey" FOREIGN KEY ("wallet_transaction_id") REFERENCES "payment_wallet_transaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_qr" ADD CONSTRAINT "payment_qr_payment_id_fkey" FOREIGN KEY ("payment_id") REFERENCES "payment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_qr" ADD CONSTRAINT "payment_qr_transaction_id_fkey" FOREIGN KEY ("transaction_id") REFERENCES "payment_transaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_deeplink" ADD CONSTRAINT "payment_deeplink_payment_id_fkey" FOREIGN KEY ("payment_id") REFERENCES "payment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_deeplink" ADD CONSTRAINT "payment_deeplink_transaction_id_fkey" FOREIGN KEY ("transaction_id") REFERENCES "payment_transaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
