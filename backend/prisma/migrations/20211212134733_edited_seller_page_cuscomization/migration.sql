/*
  Warnings:

  - The primary key for the `shop_banner` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `shop_banner_carousel` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `shop_product_carousel` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `shop_video` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "shop_banner" DROP CONSTRAINT "shop_banner_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "shop_banner_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "shop_banner_id_seq";

-- AlterTable
ALTER TABLE "shop_banner_carousel" DROP CONSTRAINT "shop_banner_carousel_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "shop_banner_carousel_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "shop_banner_carousel_id_seq";

-- AlterTable
ALTER TABLE "shop_product_carousel" DROP CONSTRAINT "shop_product_carousel_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "shop_product_carousel_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "shop_product_carousel_id_seq";

-- AlterTable
ALTER TABLE "shop_video" DROP CONSTRAINT "shop_video_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "shop_video_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "shop_video_id_seq";
