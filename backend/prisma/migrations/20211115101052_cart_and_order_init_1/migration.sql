-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('Preparing', 'Delivering', 'Delivered');

-- CreateTable
CREATE TABLE "order_deleted_item" (
    "customer_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "time" TIMESTAMP NOT NULL,

    CONSTRAINT "order_deleted_item_pkey" PRIMARY KEY ("customer_id")
);

-- CreateTable
CREATE TABLE "order_rebuy" (
    "customer_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "product_options" INTEGER[],
    "price" INTEGER NOT NULL,
    "date" TIMESTAMP NOT NULL,

    CONSTRAINT "order_rebuy_pkey" PRIMARY KEY ("customer_id")
);

-- CreateTable
CREATE TABLE "order_cart_item" (
    "customer_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "product_options" INTEGER[],
    "quantity" INTEGER NOT NULL,
    "added_time" TIMESTAMP NOT NULL,

    CONSTRAINT "order_cart_item_pkey" PRIMARY KEY ("customer_id")
);

-- CreateTable
CREATE TABLE "order" (
    "id" SERIAL NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "total_price" INTEGER NOT NULL,
    "order_date" TIMESTAMP NOT NULL,
    "status" "OrderStatus" NOT NULL,

    CONSTRAINT "order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_status" (
    "id" SERIAL NOT NULL,
    "delivery_by" TEXT NOT NULL,
    "status" JSONB NOT NULL,

    CONSTRAINT "order_status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_item" (
    "order_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "product_options" INTEGER[],
    "quantity" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "status_id" INTEGER NOT NULL,

    CONSTRAINT "order_item_pkey" PRIMARY KEY ("order_id")
);

-- CreateTable
CREATE TABLE "order_cancel_refund" (
    "id" SERIAL NOT NULL,
    "order_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "product_options" INTEGER[],
    "start_time" TIMESTAMP NOT NULL,
    "canceled_time" TIMESTAMP NOT NULL,

    CONSTRAINT "order_cancel_refund_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_detail" (
    "order_id" INTEGER NOT NULL,
    "address_id" INTEGER NOT NULL,
    "payment_id" INTEGER NOT NULL,
    "discount_id" INTEGER NOT NULL,

    CONSTRAINT "order_detail_pkey" PRIMARY KEY ("order_id")
);

-- CreateTable
CREATE TABLE "order_billing" (
    "order_id" INTEGER NOT NULL,
    "request" BOOLEAN NOT NULL DEFAULT false,
    "request_time" TIMESTAMP NOT NULL,

    CONSTRAINT "order_billing_pkey" PRIMARY KEY ("order_id")
);

-- CreateTable
CREATE TABLE "order_refund_item" (
    "id" SERIAL NOT NULL,
    "order_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "product_options" INTEGER[],
    "request" BOOLEAN NOT NULL DEFAULT false,
    "time_remaining" TIMESTAMP NOT NULL,

    CONSTRAINT "order_refund_item_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "order_deleted_item" ADD CONSTRAINT "order_deleted_item_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_deleted_item" ADD CONSTRAINT "order_deleted_item_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_rebuy" ADD CONSTRAINT "order_rebuy_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_rebuy" ADD CONSTRAINT "order_rebuy_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_cart_item" ADD CONSTRAINT "order_cart_item_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_cart_item" ADD CONSTRAINT "order_cart_item_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_item" ADD CONSTRAINT "order_item_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_item" ADD CONSTRAINT "order_item_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_item" ADD CONSTRAINT "order_item_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "order_status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_cancel_refund" ADD CONSTRAINT "order_cancel_refund_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_cancel_refund" ADD CONSTRAINT "order_cancel_refund_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_detail" ADD CONSTRAINT "order_detail_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_detail" ADD CONSTRAINT "order_detail_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_detail" ADD CONSTRAINT "order_detail_payment_id_fkey" FOREIGN KEY ("payment_id") REFERENCES "payment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_detail" ADD CONSTRAINT "order_detail_discount_id_fkey" FOREIGN KEY ("discount_id") REFERENCES "discount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_billing" ADD CONSTRAINT "order_billing_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_refund_item" ADD CONSTRAINT "order_refund_item_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_refund_item" ADD CONSTRAINT "order_refund_item_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
