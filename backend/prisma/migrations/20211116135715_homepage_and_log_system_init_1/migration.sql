-- CreateEnum
CREATE TYPE "homePartnerType" AS ENUM ('PaymentMethod', 'Delivery');

-- CreateTable
CREATE TABLE "home_banner_picture" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "path" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "mime_type" VARCHAR(20) NOT NULL,

    CONSTRAINT "home_banner_picture_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "home_banner" (
    "id" SERIAL NOT NULL,
    "start_date" TIMESTAMP NOT NULL,
    "end_date" TIMESTAMP NOT NULL,
    "picture_id" INTEGER NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "home_banner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "home_popup" (
    "id" SERIAL NOT NULL,
    "start_date" TIMESTAMP NOT NULL,
    "end_date" TIMESTAMP NOT NULL,
    "description" TEXT NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "path" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "mime_type" VARCHAR(20) NOT NULL,

    CONSTRAINT "home_popup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "home_app_review" (
    "id" SERIAL NOT NULL,
    "firstname" VARCHAR(20) NOT NULL,
    "lastname" VARCHAR(20) NOT NULL,
    "nickname" VARCHAR(20) NOT NULL,
    "review_date" TIMESTAMP NOT NULL,
    "comment" TEXT NOT NULL,
    "theme_color" TEXT NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "path" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "mime_type" VARCHAR(20) NOT NULL,

    CONSTRAINT "home_app_review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "home_partner" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "start_date" TIMESTAMP NOT NULL,
    "end_date" TIMESTAMP NOT NULL,
    "join_date" TIMESTAMP NOT NULL,
    "description" TEXT NOT NULL,
    "keyword" VARCHAR(20) NOT NULL,
    "title_pic" VARCHAR(50) NOT NULL,
    "path" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "mime_type" VARCHAR(20) NOT NULL,

    CONSTRAINT "home_partner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "home_product_log" (
    "customer_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "view_date" TIMESTAMP NOT NULL,

    CONSTRAINT "home_product_log_pkey" PRIMARY KEY ("customer_id")
);

-- CreateTable
CREATE TABLE "home_add_to_cart_log" (
    "customer_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "added_date" TIMESTAMP NOT NULL,

    CONSTRAINT "home_add_to_cart_log_pkey" PRIMARY KEY ("customer_id")
);

-- CreateTable
CREATE TABLE "home_shop_log" (
    "customer_id" INTEGER NOT NULL,
    "shop_id" INTEGER NOT NULL,

    CONSTRAINT "home_shop_log_pkey" PRIMARY KEY ("customer_id")
);

-- CreateTable
CREATE TABLE "home_payment_log" (
    "customer_id" INTEGER NOT NULL,
    "payment_id" INTEGER NOT NULL,
    "issue_at" TIMESTAMP NOT NULL,

    CONSTRAINT "home_payment_log_pkey" PRIMARY KEY ("customer_id")
);

-- CreateTable
CREATE TABLE "home_discount_log" (
    "customer_id" INTEGER NOT NULL,
    "discount_id" INTEGER NOT NULL,
    "view_date" TIMESTAMP NOT NULL,

    CONSTRAINT "home_discount_log_pkey" PRIMARY KEY ("customer_id")
);

-- AddForeignKey
ALTER TABLE "home_banner" ADD CONSTRAINT "home_banner_picture_id_fkey" FOREIGN KEY ("picture_id") REFERENCES "home_banner_picture"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "home_product_log" ADD CONSTRAINT "home_product_log_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "home_product_log" ADD CONSTRAINT "home_product_log_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "home_add_to_cart_log" ADD CONSTRAINT "home_add_to_cart_log_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "home_add_to_cart_log" ADD CONSTRAINT "home_add_to_cart_log_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "home_shop_log" ADD CONSTRAINT "home_shop_log_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "home_shop_log" ADD CONSTRAINT "home_shop_log_shop_id_fkey" FOREIGN KEY ("shop_id") REFERENCES "shop_info"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "home_payment_log" ADD CONSTRAINT "home_payment_log_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "home_payment_log" ADD CONSTRAINT "home_payment_log_payment_id_fkey" FOREIGN KEY ("payment_id") REFERENCES "payment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "home_discount_log" ADD CONSTRAINT "home_discount_log_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "home_discount_log" ADD CONSTRAINT "home_discount_log_discount_id_fkey" FOREIGN KEY ("discount_id") REFERENCES "discount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
