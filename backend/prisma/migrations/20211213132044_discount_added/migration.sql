-- CreateTable
CREATE TABLE "discount_used_coin" (
    "customer_id" INTEGER NOT NULL,
    "used_time" TIMESTAMP NOT NULL,
    "used_amount" INTEGER NOT NULL,
    "user_for" TEXT NOT NULL,

    CONSTRAINT "discount_used_coin_pkey" PRIMARY KEY ("customer_id")
);

-- CreateTable
CREATE TABLE "discount_daily_coin" (
    "customer_id" INTEGER NOT NULL,
    "got_date" DATE NOT NULL,

    CONSTRAINT "discount_daily_coin_pkey" PRIMARY KEY ("customer_id")
);

-- AddForeignKey
ALTER TABLE "discount_used_coin" ADD CONSTRAINT "discount_used_coin_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discount_daily_coin" ADD CONSTRAINT "discount_daily_coin_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
