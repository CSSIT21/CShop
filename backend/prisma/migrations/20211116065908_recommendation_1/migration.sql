-- CreateTable
CREATE TABLE "rem_number_view_product" (
    "customer_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "total_view" INTEGER NOT NULL,
    "event_id" INTEGER NOT NULL,

    CONSTRAINT "rem_number_view_product_pkey" PRIMARY KEY ("customer_id")
);

-- CreateTable
CREATE TABLE "rem_number_product_in_cart" (
    "customer_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "sum_in_cart" INTEGER NOT NULL,
    "added_time" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "event_id" INTEGER NOT NULL,

    CONSTRAINT "rem_number_product_in_cart_pkey" PRIMARY KEY ("customer_id")
);

-- CreateTable
CREATE TABLE "rem_number_payment_product" (
    "customer_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "sum_buy" INTEGER NOT NULL,
    "added_time" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "event_id" INTEGER NOT NULL,

    CONSTRAINT "rem_number_payment_product_pkey" PRIMARY KEY ("customer_id")
);

-- CreateTable
CREATE TABLE "rem_number_interaction_user" (
    "customer_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "interaction_score" INTEGER NOT NULL,
    "added_time" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "rem_number_interaction_user_pkey" PRIMARY KEY ("customer_id")
);

-- CreateTable
CREATE TABLE "rem_related_products" (
    "product_id" INTEGER NOT NULL,
    "related_product" INTEGER[],
    "added_time" TIMESTAMP NOT NULL,

    CONSTRAINT "rem_related_products_pkey" PRIMARY KEY ("product_id")
);

-- CreateTable
CREATE TABLE "rem_suggestion_homepage" (
    "customer_id" INTEGER NOT NULL,
    "product_id" INTEGER[],

    CONSTRAINT "rem_suggestion_homepage_pkey" PRIMARY KEY ("customer_id")
);

-- CreateTable
CREATE TABLE "rem_may_favorite_product" (
    "product_id" INTEGER NOT NULL,
    "related_products" INTEGER[],
    "added_time" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "rem_may_favorite_product_pkey" PRIMARY KEY ("product_id")
);

-- CreateTable
CREATE TABLE "rem_number_keyword_search" (
    "keyword" TEXT NOT NULL,
    "number_searched" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "rem_number_keyword_search_pkey" PRIMARY KEY ("keyword")
);

-- CreateTable
CREATE TABLE "rem_product_promotion" (
    "product_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "discount_id" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,

    CONSTRAINT "rem_product_promotion_pkey" PRIMARY KEY ("product_id")
);

-- CreateTable
CREATE TABLE "rem_promotion_type_interaction" (
    "event_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "interaction_score" INTEGER NOT NULL,
    "added_date" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "rem_promotion_type_interaction_pkey" PRIMARY KEY ("event_id")
);

-- AddForeignKey
ALTER TABLE "rem_number_view_product" ADD CONSTRAINT "rem_number_view_product_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rem_number_view_product" ADD CONSTRAINT "rem_number_view_product_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rem_number_view_product" ADD CONSTRAINT "rem_number_view_product_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rem_number_product_in_cart" ADD CONSTRAINT "rem_number_product_in_cart_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rem_number_product_in_cart" ADD CONSTRAINT "rem_number_product_in_cart_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rem_number_product_in_cart" ADD CONSTRAINT "rem_number_product_in_cart_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rem_number_payment_product" ADD CONSTRAINT "rem_number_payment_product_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rem_number_payment_product" ADD CONSTRAINT "rem_number_payment_product_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rem_number_payment_product" ADD CONSTRAINT "rem_number_payment_product_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rem_number_interaction_user" ADD CONSTRAINT "rem_number_interaction_user_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rem_number_interaction_user" ADD CONSTRAINT "rem_number_interaction_user_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rem_related_products" ADD CONSTRAINT "rem_related_products_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rem_suggestion_homepage" ADD CONSTRAINT "rem_suggestion_homepage_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rem_may_favorite_product" ADD CONSTRAINT "rem_may_favorite_product_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rem_product_promotion" ADD CONSTRAINT "rem_product_promotion_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rem_product_promotion" ADD CONSTRAINT "rem_product_promotion_discount_id_fkey" FOREIGN KEY ("discount_id") REFERENCES "discount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rem_promotion_type_interaction" ADD CONSTRAINT "rem_promotion_type_interaction_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rem_promotion_type_interaction" ADD CONSTRAINT "rem_promotion_type_interaction_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
