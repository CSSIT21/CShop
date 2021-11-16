-- CreateTable
CREATE TABLE "shop_category" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(20) NOT NULL,
    "products" INTEGER[],

    CONSTRAINT "shop_category_pkey" PRIMARY KEY ("id")
);
