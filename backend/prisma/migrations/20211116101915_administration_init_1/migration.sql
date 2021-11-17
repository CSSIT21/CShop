-- CreateTable
CREATE TABLE "admin_support_type" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "admin_support_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admin_support_picture" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "path" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "mime_type" VARCHAR(20) NOT NULL,

    CONSTRAINT "admin_support_picture_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admin_support" (
    "id" SERIAL NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "support_type_id" INTEGER NOT NULL,
    "sent_date" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ended_date" TIMESTAMP,
    "picture_id" INTEGER NOT NULL,

    CONSTRAINT "admin_support_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admin_support_status" (
    "support_id" INTEGER NOT NULL,
    "status" JSONB NOT NULL,

    CONSTRAINT "admin_support_status_pkey" PRIMARY KEY ("support_id")
);

-- CreateTable
CREATE TABLE "admin_suspension_type" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "admin_suspension_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admin_customer_suspensions" (
    "customer_id" INTEGER NOT NULL,
    "start_date" TIMESTAMP NOT NULL,
    "end_date" TIMESTAMP NOT NULL,
    "description" TEXT NOT NULL,
    "picture_id" INTEGER NOT NULL,
    "suspension_type_id" INTEGER NOT NULL,
    "admin_id" INTEGER NOT NULL,

    CONSTRAINT "admin_customer_suspensions_pkey" PRIMARY KEY ("customer_id")
);

-- CreateTable
CREATE TABLE "admin_shop_suspensions" (
    "shop_id" INTEGER NOT NULL,
    "start_date" TIMESTAMP NOT NULL,
    "end_date" TIMESTAMP NOT NULL,
    "description" TEXT NOT NULL,
    "picture_id" INTEGER NOT NULL,
    "suspension_type_id" INTEGER NOT NULL,
    "admin_id" INTEGER NOT NULL,

    CONSTRAINT "admin_shop_suspensions_pkey" PRIMARY KEY ("shop_id")
);

-- CreateTable
CREATE TABLE "admin_reported_shop" (
    "id" SERIAL NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "reported_shop_id" INTEGER NOT NULL,
    "sent_date" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ended_date" TIMESTAMP,
    "picture_id" INTEGER NOT NULL,
    "status" JSONB NOT NULL,

    CONSTRAINT "admin_reported_shop_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admin_reported_customer" (
    "id" SERIAL NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "reported_customer_id" INTEGER NOT NULL,
    "sent_date" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ended_date" TIMESTAMP,
    "picture_id" INTEGER NOT NULL,
    "status" JSONB NOT NULL,

    CONSTRAINT "admin_reported_customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admin_audit" (
    "admin_id" INTEGER NOT NULL,
    "login_date" TIMESTAMP NOT NULL,
    "action" TEXT NOT NULL,

    CONSTRAINT "admin_audit_pkey" PRIMARY KEY ("admin_id")
);

-- AddForeignKey
ALTER TABLE "admin_support" ADD CONSTRAINT "admin_support_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admin_support" ADD CONSTRAINT "admin_support_support_type_id_fkey" FOREIGN KEY ("support_type_id") REFERENCES "admin_support_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admin_support" ADD CONSTRAINT "admin_support_picture_id_fkey" FOREIGN KEY ("picture_id") REFERENCES "admin_support_picture"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admin_support_status" ADD CONSTRAINT "admin_support_status_support_id_fkey" FOREIGN KEY ("support_id") REFERENCES "admin_support"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admin_customer_suspensions" ADD CONSTRAINT "admin_customer_suspensions_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admin_customer_suspensions" ADD CONSTRAINT "admin_customer_suspensions_picture_id_fkey" FOREIGN KEY ("picture_id") REFERENCES "admin_support_picture"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admin_customer_suspensions" ADD CONSTRAINT "admin_customer_suspensions_suspension_type_id_fkey" FOREIGN KEY ("suspension_type_id") REFERENCES "admin_suspension_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admin_shop_suspensions" ADD CONSTRAINT "admin_shop_suspensions_shop_id_fkey" FOREIGN KEY ("shop_id") REFERENCES "shop_info"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admin_shop_suspensions" ADD CONSTRAINT "admin_shop_suspensions_picture_id_fkey" FOREIGN KEY ("picture_id") REFERENCES "admin_support_picture"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admin_shop_suspensions" ADD CONSTRAINT "admin_shop_suspensions_suspension_type_id_fkey" FOREIGN KEY ("suspension_type_id") REFERENCES "admin_suspension_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admin_reported_shop" ADD CONSTRAINT "admin_reported_shop_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admin_reported_shop" ADD CONSTRAINT "admin_reported_shop_reported_shop_id_fkey" FOREIGN KEY ("reported_shop_id") REFERENCES "shop_info"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admin_reported_shop" ADD CONSTRAINT "admin_reported_shop_picture_id_fkey" FOREIGN KEY ("picture_id") REFERENCES "admin_support_picture"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admin_reported_customer" ADD CONSTRAINT "admin_reported_customer_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admin_reported_customer" ADD CONSTRAINT "admin_reported_customer_picture_id_fkey" FOREIGN KEY ("picture_id") REFERENCES "admin_support_picture"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
