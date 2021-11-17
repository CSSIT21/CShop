-- CreateEnum
CREATE TYPE "Shop_section" AS ENUM ('Banner', 'BannerCarousel', 'ProductCarousel', 'Video');

-- CreateEnum
CREATE TYPE "Platform" AS ENUM ('Ios', 'Android', 'PC', 'MacOS', 'Linux');

-- CreateTable
CREATE TABLE "shop_info" (
    "id" SERIAL NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "shop_address_id" INTEGER NOT NULL,
    "shop_name" VARCHAR(40) NOT NULL,
    "join_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "phone_number" VARCHAR(10) NOT NULL,

    CONSTRAINT "shop_info_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shop_picture" (
    "shop_id" INTEGER NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "path" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "mime_type" VARCHAR(20) NOT NULL,

    CONSTRAINT "shop_picture_pkey" PRIMARY KEY ("shop_id")
);

-- CreateTable
CREATE TABLE "shop_comment" (
    "id" SERIAL NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "shop_id" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "shop_comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shop_section_log" (
    "id" SERIAL NOT NULL,
    "shop_id" INTEGER NOT NULL,
    "section_type" "Shop_section" NOT NULL,
    "added_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "device" "Platform" NOT NULL,

    CONSTRAINT "shop_section_log_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shop_section" (
    "shop_id" INTEGER NOT NULL,
    "sections" JSONB NOT NULL,

    CONSTRAINT "shop_section_pkey" PRIMARY KEY ("shop_id")
);

-- CreateTable
CREATE TABLE "shop_flashsale" (
    "shop_id" INTEGER NOT NULL,
    "started_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ended_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "products" JSONB NOT NULL,

    CONSTRAINT "shop_flashsale_pkey" PRIMARY KEY ("shop_id")
);

-- CreateTable
CREATE TABLE "shop_flashsale_history" (
    "shop_id" INTEGER NOT NULL,
    "started_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ended_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "products" JSONB NOT NULL,
    "quantity" JSONB NOT NULL,

    CONSTRAINT "shop_flashsale_history_pkey" PRIMARY KEY ("shop_id")
);

-- CreateTable
CREATE TABLE "banner" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "path" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "mime_type" VARCHAR(20) NOT NULL,

    CONSTRAINT "banner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "banner_carousel" (
    "id" SERIAL NOT NULL,
    "banners" JSONB NOT NULL,

    CONSTRAINT "banner_carousel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_carousel" (
    "id" SERIAL NOT NULL,
    "products" INTEGER[],

    CONSTRAINT "product_carousel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "video" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "path" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "mime_type" VARCHAR(20) NOT NULL,

    CONSTRAINT "video_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "shop_info" ADD CONSTRAINT "shop_info_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shop_info" ADD CONSTRAINT "shop_info_shop_address_id_fkey" FOREIGN KEY ("shop_address_id") REFERENCES "address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shop_picture" ADD CONSTRAINT "shop_picture_shop_id_fkey" FOREIGN KEY ("shop_id") REFERENCES "shop_info"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shop_comment" ADD CONSTRAINT "shop_comment_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shop_comment" ADD CONSTRAINT "shop_comment_shop_id_fkey" FOREIGN KEY ("shop_id") REFERENCES "shop_info"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shop_section_log" ADD CONSTRAINT "shop_section_log_shop_id_fkey" FOREIGN KEY ("shop_id") REFERENCES "shop_info"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shop_section" ADD CONSTRAINT "shop_section_shop_id_fkey" FOREIGN KEY ("shop_id") REFERENCES "shop_info"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shop_flashsale" ADD CONSTRAINT "shop_flashsale_shop_id_fkey" FOREIGN KEY ("shop_id") REFERENCES "shop_info"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shop_flashsale_history" ADD CONSTRAINT "shop_flashsale_history_shop_id_fkey" FOREIGN KEY ("shop_id") REFERENCES "shop_info"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
