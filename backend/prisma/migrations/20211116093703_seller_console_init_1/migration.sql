-- CreateEnum
CREATE TYPE "SConsoleRefundTypes" AS ENUM ('Defective', 'UnSatisfied');

-- CreateTable
CREATE TABLE "sconsole_stock_history" (
    "id" SERIAL NOT NULL,
    "product_id" INTEGER NOT NULL,
    "shop_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "updated_date" TIMESTAMP NOT NULL,

    CONSTRAINT "sconsole_stock_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sconsole_order_status" (
    "id" SERIAL NOT NULL,
    "order_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "shop_id" INTEGER NOT NULL,
    "started_date" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" JSONB NOT NULL,

    CONSTRAINT "sconsole_order_status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sconsole_discount_log" (
    "id" SERIAL NOT NULL,
    "discount_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "shop_id" INTEGER NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "used_date" TIMESTAMP NOT NULL,

    CONSTRAINT "sconsole_discount_log_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sconsole_flashsale_log" (
    "id" SERIAL NOT NULL,
    "shop_id" INTEGER NOT NULL,
    "flashsale_id" INTEGER NOT NULL,
    "added_date" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ended_date" TIMESTAMP,

    CONSTRAINT "sconsole_flashsale_log_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sconsole_order_history" (
    "id" SERIAL NOT NULL,
    "order_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "shop_id" INTEGER NOT NULL,
    "started_date" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ended_date" TIMESTAMP NOT NULL,
    "status" JSONB NOT NULL,

    CONSTRAINT "sconsole_order_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sconsole_set_lanch_product" (
    "product_id" INTEGER NOT NULL,
    "lanch_time" TIMESTAMP NOT NULL,

    CONSTRAINT "sconsole_set_lanch_product_pkey" PRIMARY KEY ("product_id")
);

-- CreateTable
CREATE TABLE "sconsole_refund" (
    "id" SERIAL NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "shop_id" INTEGER NOT NULL,
    "type" "SConsoleRefundTypes" NOT NULL,
    "description" TEXT NOT NULL,
    "refund_time" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "sconsole_refund_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sconsole_refund_status" (
    "refund_id" INTEGER NOT NULL,
    "status" JSONB NOT NULL,

    CONSTRAINT "sconsole_refund_status_pkey" PRIMARY KEY ("refund_id")
);

-- CreateTable
CREATE TABLE "sconsole_refund_money" (
    "refund_id" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "payment_id" INTEGER NOT NULL,
    "refund" BOOLEAN NOT NULL,
    "refund_time" TIMESTAMP NOT NULL,

    CONSTRAINT "sconsole_refund_money_pkey" PRIMARY KEY ("refund_id")
);

-- CreateTable
CREATE TABLE "sconsole_refund_history" (
    "id" INTEGER NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "shop_id" INTEGER NOT NULL,
    "type" "SConsoleRefundTypes" NOT NULL,
    "description" TEXT NOT NULL,
    "started_time" TIMESTAMP NOT NULL,
    "ended_time" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "quantity" INTEGER NOT NULL,
    "status" JSONB NOT NULL,

    CONSTRAINT "sconsole_refund_history_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "sconsole_stock_history" ADD CONSTRAINT "sconsole_stock_history_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sconsole_stock_history" ADD CONSTRAINT "sconsole_stock_history_shop_id_fkey" FOREIGN KEY ("shop_id") REFERENCES "shop_info"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sconsole_order_status" ADD CONSTRAINT "sconsole_order_status_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sconsole_order_status" ADD CONSTRAINT "sconsole_order_status_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sconsole_order_status" ADD CONSTRAINT "sconsole_order_status_shop_id_fkey" FOREIGN KEY ("shop_id") REFERENCES "shop_info"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sconsole_discount_log" ADD CONSTRAINT "sconsole_discount_log_discount_id_fkey" FOREIGN KEY ("discount_id") REFERENCES "discount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sconsole_discount_log" ADD CONSTRAINT "sconsole_discount_log_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sconsole_discount_log" ADD CONSTRAINT "sconsole_discount_log_shop_id_fkey" FOREIGN KEY ("shop_id") REFERENCES "shop_info"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sconsole_discount_log" ADD CONSTRAINT "sconsole_discount_log_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sconsole_flashsale_log" ADD CONSTRAINT "sconsole_flashsale_log_shop_id_fkey" FOREIGN KEY ("shop_id") REFERENCES "shop_info"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sconsole_flashsale_log" ADD CONSTRAINT "sconsole_flashsale_log_flashsale_id_fkey" FOREIGN KEY ("flashsale_id") REFERENCES "shop_flashsale"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sconsole_order_history" ADD CONSTRAINT "sconsole_order_history_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sconsole_order_history" ADD CONSTRAINT "sconsole_order_history_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sconsole_order_history" ADD CONSTRAINT "sconsole_order_history_shop_id_fkey" FOREIGN KEY ("shop_id") REFERENCES "shop_info"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sconsole_set_lanch_product" ADD CONSTRAINT "sconsole_set_lanch_product_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sconsole_refund" ADD CONSTRAINT "sconsole_refund_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sconsole_refund" ADD CONSTRAINT "sconsole_refund_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sconsole_refund" ADD CONSTRAINT "sconsole_refund_shop_id_fkey" FOREIGN KEY ("shop_id") REFERENCES "shop_info"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sconsole_refund_status" ADD CONSTRAINT "sconsole_refund_status_refund_id_fkey" FOREIGN KEY ("refund_id") REFERENCES "sconsole_refund"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sconsole_refund_money" ADD CONSTRAINT "sconsole_refund_money_refund_id_fkey" FOREIGN KEY ("refund_id") REFERENCES "sconsole_refund"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sconsole_refund_money" ADD CONSTRAINT "sconsole_refund_money_payment_id_fkey" FOREIGN KEY ("payment_id") REFERENCES "payment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sconsole_refund_history" ADD CONSTRAINT "sconsole_refund_history_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sconsole_refund_history" ADD CONSTRAINT "sconsole_refund_history_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sconsole_refund_history" ADD CONSTRAINT "sconsole_refund_history_shop_id_fkey" FOREIGN KEY ("shop_id") REFERENCES "shop_info"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
