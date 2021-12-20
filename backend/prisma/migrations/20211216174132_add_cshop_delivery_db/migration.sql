-- CreateTable
CREATE TABLE "delivery_product_status" (
    "id" SERIAL NOT NULL,
    "tracking_number" TEXT NOT NULL,
    "added_date" TIMESTAMP NOT NULL,
    "latest_update" TIMESTAMP NOT NULL,
    "complete_date" TIMESTAMP,
    "recipient_name" VARCHAR(60),
    "status" TEXT NOT NULL,
    "delivery_detail" JSONB NOT NULL,

    CONSTRAINT "delivery_product_status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "delivery_admin" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(20) NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "delivery_admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "delivery_admin_log" (
    "admin_id" INTEGER NOT NULL,
    "delivery_id" INTEGER NOT NULL,
    "updated_time" TIMESTAMP NOT NULL,

    CONSTRAINT "delivery_admin_log_pkey" PRIMARY KEY ("admin_id")
);

-- AddForeignKey
ALTER TABLE "delivery_admin_log" ADD CONSTRAINT "delivery_admin_log_delivery_id_fkey" FOREIGN KEY ("delivery_id") REFERENCES "delivery_product_status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
