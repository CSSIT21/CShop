/*
  Warnings:

  - You are about to drop the `banner` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `banner_carousel` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `product_carousel` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `video` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "banner";

-- DropTable
DROP TABLE "banner_carousel";

-- DropTable
DROP TABLE "product_carousel";

-- DropTable
DROP TABLE "video";

-- CreateTable
CREATE TABLE "shop_banner" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "path" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "mime_type" VARCHAR(20) NOT NULL,

    CONSTRAINT "shop_banner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shop_banner_carousel" (
    "id" SERIAL NOT NULL,
    "banners" JSONB NOT NULL,

    CONSTRAINT "shop_banner_carousel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shop_product_carousel" (
    "id" SERIAL NOT NULL,
    "products" INTEGER[],

    CONSTRAINT "shop_product_carousel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shop_video" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "path" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "mime_type" VARCHAR(20) NOT NULL,

    CONSTRAINT "shop_video_pkey" PRIMARY KEY ("id")
);
