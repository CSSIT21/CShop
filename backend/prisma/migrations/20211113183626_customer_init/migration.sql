-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('Male', 'Female', 'Others', 'Prefer_to_not_say');

-- CreateTable
CREATE TABLE "customer" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(60) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "join_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customer_info" (
    "customer_id" INTEGER NOT NULL,
    "firstname" VARCHAR(20) NOT NULL,
    "lastname" VARCHAR(20) NOT NULL,
    "phone_number" VARCHAR(10) NOT NULL,
    "gender" "Gender" NOT NULL,
    "birthdate" TIMESTAMP(3),

    CONSTRAINT "customer_info_pkey" PRIMARY KEY ("customer_id")
);

-- CreateTable
CREATE TABLE "customer_picture" (
    "customer_id" INTEGER NOT NULL,
    "picture_id" INTEGER NOT NULL,

    CONSTRAINT "customer_picture_pkey" PRIMARY KEY ("customer_id")
);

-- CreateTable
CREATE TABLE "picture_file" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "path" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "mime_type" VARCHAR(20) NOT NULL,
    "primary" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "picture_file_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "address" (
    "id" SERIAL NOT NULL,
    "address_line" VARCHAR(200) NOT NULL,
    "province" VARCHAR(20) NOT NULL,
    "district" VARCHAR(20) NOT NULL,
    "sub_district" VARCHAR(20) NOT NULL,
    "postal_code" VARCHAR(5) NOT NULL,

    CONSTRAINT "address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customer_address" (
    "customer_id" INTEGER NOT NULL,
    "address_id" INTEGER NOT NULL DEFAULT 1,
    "primary" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "customer_address_pkey" PRIMARY KEY ("customer_id")
);

-- CreateTable
CREATE TABLE "old_password" (
    "customer_id" INTEGER NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "changed_date" TIMESTAMP NOT NULL,

    CONSTRAINT "old_password_pkey" PRIMARY KEY ("customer_id")
);

-- CreateTable
CREATE TABLE "wishlist" (
    "customer_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL DEFAULT 1,
    "added_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "wishlist_pkey" PRIMARY KEY ("customer_id")
);

-- CreateTable
CREATE TABLE "followed_shop" (
    "customer_id" INTEGER NOT NULL,
    "shop_id" INTEGER NOT NULL DEFAULT 1,
    "added_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "followed_shop_pkey" PRIMARY KEY ("customer_id")
);

-- CreateTable
CREATE TABLE "email_verification" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(60) NOT NULL,
    "token" TEXT NOT NULL,
    "expire_date" TIMESTAMP NOT NULL,

    CONSTRAINT "email_verification_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "customer_info" ADD CONSTRAINT "customer_info_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customer_picture" ADD CONSTRAINT "customer_picture_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customer_picture" ADD CONSTRAINT "customer_picture_picture_id_fkey" FOREIGN KEY ("picture_id") REFERENCES "picture_file"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customer_address" ADD CONSTRAINT "customer_address_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customer_address" ADD CONSTRAINT "customer_address_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "old_password" ADD CONSTRAINT "old_password_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wishlist" ADD CONSTRAINT "wishlist_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "followed_shop" ADD CONSTRAINT "followed_shop_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
