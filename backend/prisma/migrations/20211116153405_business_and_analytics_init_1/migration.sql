/*
  Warnings:

  - You are about to drop the column `added_time` on the `rem_may_favorite_product` table. All the data in the column will be lost.
  - You are about to drop the column `added_time` on the `rem_related_products` table. All the data in the column will be lost.
  - Added the required column `added_time` to the `rem_number_view_product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "rem_may_favorite_product" DROP COLUMN "added_time";

-- AlterTable
ALTER TABLE "rem_number_view_product" ADD COLUMN     "added_time" TIMESTAMP NOT NULL;

-- AlterTable
ALTER TABLE "rem_related_products" DROP COLUMN "added_time";

-- CreateTable
CREATE TABLE "business_page_types" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(16) NOT NULL,
    "path" VARCHAR(64) NOT NULL,

    CONSTRAINT "business_page_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "business_conversation_types" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(16) NOT NULL,
    "weight" SMALLINT NOT NULL,

    CONSTRAINT "business_conversation_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "business_page_view_records" (
    "page_type_id" INTEGER NOT NULL,
    "referer_page_type_id" INTEGER NOT NULL,
    "duration" INTEGER NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "timestamp" TIMESTAMP NOT NULL,

    CONSTRAINT "business_page_view_records_pkey" PRIMARY KEY ("page_type_id")
);

-- CreateTable
CREATE TABLE "business_product_view_records" (
    "product_id" INTEGER NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "duration" INTEGER NOT NULL,
    "timestamp" TIMESTAMP NOT NULL,

    CONSTRAINT "business_product_view_records_pkey" PRIMARY KEY ("product_id")
);

-- CreateTable
CREATE TABLE "business_conversation_records" (
    "conversation_id" INTEGER NOT NULL,
    "referer_page_types_id" INTEGER NOT NULL,
    "timestamp" TIMESTAMP NOT NULL,

    CONSTRAINT "business_conversation_records_pkey" PRIMARY KEY ("conversation_id")
);

-- CreateTable
CREATE TABLE "business_pageview_count_summaries" (
    "pagetype_id" INTEGER NOT NULL,
    "registered" SMALLINT NOT NULL,
    "avgduration" INTEGER NOT NULL,
    "count" INTEGER NOT NULL,
    "date" DATE NOT NULL,

    CONSTRAINT "business_pageview_count_summaries_pkey" PRIMARY KEY ("pagetype_id")
);

-- CreateTable
CREATE TABLE "business_pageview_referer_summaries" (
    "pagetype_id" INTEGER NOT NULL,
    "referer_page_type" INTEGER NOT NULL,
    "count" INTEGER NOT NULL,
    "date" DATE NOT NULL,

    CONSTRAINT "business_pageview_referer_summaries_pkey" PRIMARY KEY ("pagetype_id")
);

-- CreateTable
CREATE TABLE "business_product_view_summaries" (
    "product_id" INTEGER NOT NULL,
    "avgduration" INTEGER NOT NULL,
    "count" INTEGER NOT NULL,
    "date" DATE NOT NULL,

    CONSTRAINT "business_product_view_summaries_pkey" PRIMARY KEY ("product_id")
);

-- CreateTable
CREATE TABLE "business_conversation_count_summaries" (
    "conversation_id" INTEGER NOT NULL,
    "referer_page_type_id" INTEGER NOT NULL,
    "count" INTEGER NOT NULL,
    "date" DATE NOT NULL,

    CONSTRAINT "business_conversation_count_summaries_pkey" PRIMARY KEY ("conversation_id")
);

-- CreateTable
CREATE TABLE "business_interaction_weight" (
    "weight" INTEGER NOT NULL,
    "date" DATE NOT NULL,

    CONSTRAINT "business_interaction_weight_pkey" PRIMARY KEY ("weight")
);

-- AddForeignKey
ALTER TABLE "customer_followed_shop" ADD CONSTRAINT "customer_followed_shop_shop_id_fkey" FOREIGN KEY ("shop_id") REFERENCES "shop_info"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_page_view_records" ADD CONSTRAINT "business_page_view_records_page_type_id_fkey" FOREIGN KEY ("page_type_id") REFERENCES "business_page_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_page_view_records" ADD CONSTRAINT "business_page_view_records_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_product_view_records" ADD CONSTRAINT "business_product_view_records_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_product_view_records" ADD CONSTRAINT "business_product_view_records_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_conversation_records" ADD CONSTRAINT "business_conversation_records_conversation_id_fkey" FOREIGN KEY ("conversation_id") REFERENCES "business_conversation_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_conversation_records" ADD CONSTRAINT "business_conversation_records_referer_page_types_id_fkey" FOREIGN KEY ("referer_page_types_id") REFERENCES "business_page_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_pageview_count_summaries" ADD CONSTRAINT "business_pageview_count_summaries_pagetype_id_fkey" FOREIGN KEY ("pagetype_id") REFERENCES "business_page_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_pageview_referer_summaries" ADD CONSTRAINT "business_pageview_referer_summaries_pagetype_id_fkey" FOREIGN KEY ("pagetype_id") REFERENCES "business_page_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_product_view_summaries" ADD CONSTRAINT "business_product_view_summaries_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_conversation_count_summaries" ADD CONSTRAINT "business_conversation_count_summaries_conversation_id_fkey" FOREIGN KEY ("conversation_id") REFERENCES "business_conversation_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_conversation_count_summaries" ADD CONSTRAINT "business_conversation_count_summaries_referer_page_type_id_fkey" FOREIGN KEY ("referer_page_type_id") REFERENCES "business_page_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
