-- CreateEnum
CREATE TYPE "DiscountClass" AS ENUM ('FreeShipping', 'ReducePrice');

-- CreateEnum
CREATE TYPE "DiscountTypes" AS ENUM ('Shop', 'Event', 'App', 'Category');

-- CreateEnum
CREATE TYPE "DiscountUserTypes" AS ENUM ('Bronze', 'Silver', 'Gold', 'Platinum');

-- CreateTable
CREATE TABLE "discount" (
    "id" SERIAL NOT NULL,
    "code" VARCHAR(6) NOT NULL,
    "start_date" TIMESTAMP NOT NULL,
    "end_date" TIMESTAMP NOT NULL,
    "description" TEXT NOT NULL,
    "class" "DiscountClass" NOT NULL,
    "min_price" INTEGER DEFAULT 0,
    "reduce_price" INTEGER,
    "discount_types" "DiscountTypes" NOT NULL,
    "added_date" TIMESTAMP NOT NULL,

    CONSTRAINT "discount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "discount_shop" (
    "discount_id" INTEGER NOT NULL,
    "shop_id" INTEGER NOT NULL,

    CONSTRAINT "discount_shop_pkey" PRIMARY KEY ("discount_id")
);

-- CreateTable
CREATE TABLE "event" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "discount_event" (
    "discount_id" INTEGER NOT NULL,
    "shop_id" INTEGER NOT NULL,
    "event_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "discount_event_pkey" PRIMARY KEY ("discount_id")
);

-- CreateTable
CREATE TABLE "discount_app" (
    "discount_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "discount_app_pkey" PRIMARY KEY ("discount_id")
);

-- CreateTable
CREATE TABLE "discount_category" (
    "discount_id" INTEGER NOT NULL,
    "category_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "discount_category_pkey" PRIMARY KEY ("discount_id")
);

-- CreateTable
CREATE TABLE "discount_user_code" (
    "customer_id" INTEGER NOT NULL,
    "discount_id" INTEGER NOT NULL,

    CONSTRAINT "discount_user_code_pkey" PRIMARY KEY ("customer_id")
);

-- CreateTable
CREATE TABLE "discount_spend_types" (
    "id" SERIAL NOT NULL,
    "type" "DiscountUserTypes" NOT NULL,
    "amonut" INTEGER NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "discount_spend_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "discount_customer_spend" (
    "customer_id" INTEGER NOT NULL,
    "total_spend" INTEGER NOT NULL,
    "spend_type_id" INTEGER NOT NULL,

    CONSTRAINT "discount_customer_spend_pkey" PRIMARY KEY ("customer_id")
);

-- CreateTable
CREATE TABLE "discount_coin_information" (
    "id" SERIAL NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "got_date" TIMESTAMP NOT NULL,
    "expire_date" TIMESTAMP NOT NULL,
    "get_from" TEXT NOT NULL,

    CONSTRAINT "discount_coin_information_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "discount_customer_coin" (
    "customer_id" INTEGER NOT NULL,
    "total_coin" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "discount_customer_coin_pkey" PRIMARY KEY ("customer_id")
);

-- AddForeignKey
ALTER TABLE "discount_shop" ADD CONSTRAINT "discount_shop_discount_id_fkey" FOREIGN KEY ("discount_id") REFERENCES "discount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discount_shop" ADD CONSTRAINT "discount_shop_shop_id_fkey" FOREIGN KEY ("shop_id") REFERENCES "shop_info"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discount_event" ADD CONSTRAINT "discount_event_discount_id_fkey" FOREIGN KEY ("discount_id") REFERENCES "discount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discount_event" ADD CONSTRAINT "discount_event_shop_id_fkey" FOREIGN KEY ("shop_id") REFERENCES "shop_info"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discount_event" ADD CONSTRAINT "discount_event_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discount_app" ADD CONSTRAINT "discount_app_discount_id_fkey" FOREIGN KEY ("discount_id") REFERENCES "discount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discount_category" ADD CONSTRAINT "discount_category_discount_id_fkey" FOREIGN KEY ("discount_id") REFERENCES "discount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discount_category" ADD CONSTRAINT "discount_category_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discount_user_code" ADD CONSTRAINT "discount_user_code_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discount_user_code" ADD CONSTRAINT "discount_user_code_discount_id_fkey" FOREIGN KEY ("discount_id") REFERENCES "discount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discount_customer_spend" ADD CONSTRAINT "discount_customer_spend_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discount_customer_spend" ADD CONSTRAINT "discount_customer_spend_spend_type_id_fkey" FOREIGN KEY ("spend_type_id") REFERENCES "discount_spend_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discount_coin_information" ADD CONSTRAINT "discount_coin_information_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discount_customer_coin" ADD CONSTRAINT "discount_customer_coin_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
