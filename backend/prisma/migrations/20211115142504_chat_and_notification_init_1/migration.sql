-- CreateEnum
CREATE TYPE "ChatMessageTypes" AS ENUM ('Text', 'Image', 'Video');

-- CreateEnum
CREATE TYPE "ChatConversationMark" AS ENUM ('Spam', 'Important', 'Unread', 'Done');

-- CreateTable
CREATE TABLE "chat_shop_label" (
    "label_no" SERIAL NOT NULL,
    "shop_id" INTEGER NOT NULL,
    "label_text" TEXT NOT NULL,
    "label_color" VARCHAR(15) NOT NULL,

    CONSTRAINT "chat_shop_label_pkey" PRIMARY KEY ("label_no")
);

-- CreateTable
CREATE TABLE "chat_shop_stat" (
    "shop_id" INTEGER NOT NULL,
    "response_rate" SMALLINT NOT NULL,
    "response_time" INTEGER NOT NULL,

    CONSTRAINT "chat_shop_stat_pkey" PRIMARY KEY ("shop_id")
);

-- CreateTable
CREATE TABLE "automated_response" (
    "id" SERIAL NOT NULL,
    "query" TEXT NOT NULL,
    "response" TEXT NOT NULL,

    CONSTRAINT "automated_response_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chat_shop_preference" (
    "shop_id" INTEGER NOT NULL,
    "greeting_message" TEXT NOT NULL,
    "automation_id" INTEGER NOT NULL,
    "url_slug" TEXT NOT NULL,

    CONSTRAINT "chat_shop_preference_pkey" PRIMARY KEY ("shop_id")
);

-- CreateTable
CREATE TABLE "chat_preference" (
    "customer_id" INTEGER NOT NULL,
    "enter_to_send" BOOLEAN NOT NULL DEFAULT false,
    "click_sticker" BOOLEAN NOT NULL DEFAULT false,
    "font_size" INTEGER NOT NULL DEFAULT 16,

    CONSTRAINT "chat_preference_pkey" PRIMARY KEY ("customer_id")
);

-- CreateTable
CREATE TABLE "chat_conversation" (
    "id" SERIAL NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "shop_id" INTEGER NOT NULL,
    "marked_as" "ChatConversationMark" NOT NULL,
    "note" TEXT NOT NULL,
    "is_muted" BOOLEAN NOT NULL DEFAULT false,
    "is_blocked" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "chat_conversation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chat_message" (
    "id" SERIAL NOT NULL,
    "conversation_id" INTEGER NOT NULL,
    "from_customer" BOOLEAN NOT NULL,
    "message_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "content_type" "ChatMessageTypes" NOT NULL,
    "seem" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "chat_message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chat_notification" (
    "message_id" INTEGER NOT NULL,
    "action_url" TEXT NOT NULL,
    "type" "ChatMessageTypes" NOT NULL,
    "notification_text" TEXT NOT NULL,

    CONSTRAINT "chat_notification_pkey" PRIMARY KEY ("message_id")
);

-- CreateTable
CREATE TABLE "chat_reported_conversation" (
    "id" SERIAL NOT NULL,
    "conversation_id" INTEGER NOT NULL,
    "report_date" TIMESTAMP NOT NULL,

    CONSTRAINT "chat_reported_conversation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chat_reported_message" (
    "report_id" INTEGER NOT NULL,
    "message_id" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "reviewed_by" INTEGER NOT NULL,

    CONSTRAINT "chat_reported_message_pkey" PRIMARY KEY ("report_id")
);

-- CreateTable
CREATE TABLE "chat_text" (
    "message_id" INTEGER NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "chat_text_pkey" PRIMARY KEY ("message_id")
);

-- CreateTable
CREATE TABLE "chat_image" (
    "message_id" INTEGER NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "path" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "mime_type" VARCHAR(20) NOT NULL,

    CONSTRAINT "chat_image_pkey" PRIMARY KEY ("message_id")
);

-- CreateTable
CREATE TABLE "chat_video" (
    "message_id" INTEGER NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "path" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "mime_type" VARCHAR(20) NOT NULL,

    CONSTRAINT "chat_video_pkey" PRIMARY KEY ("message_id")
);

-- CreateTable
CREATE TABLE "chat_sticker_lookup" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "path" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "mime_type" VARCHAR(20) NOT NULL,

    CONSTRAINT "chat_sticker_lookup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chat_sticker" (
    "message_id" INTEGER NOT NULL,
    "sticker_id" INTEGER NOT NULL,

    CONSTRAINT "chat_sticker_pkey" PRIMARY KEY ("message_id")
);

-- CreateTable
CREATE TABLE "deleted_message" (
    "message_id" INTEGER NOT NULL,
    "conversation_id" INTEGER NOT NULL,
    "from_a_to_b" BOOLEAN NOT NULL DEFAULT false,
    "message_time" TIMESTAMP NOT NULL,
    "content_type" "ChatMessageTypes" NOT NULL,

    CONSTRAINT "deleted_message_pkey" PRIMARY KEY ("message_id")
);

-- AddForeignKey
ALTER TABLE "chat_shop_label" ADD CONSTRAINT "chat_shop_label_shop_id_fkey" FOREIGN KEY ("shop_id") REFERENCES "shop_info"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat_shop_stat" ADD CONSTRAINT "chat_shop_stat_shop_id_fkey" FOREIGN KEY ("shop_id") REFERENCES "shop_info"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat_shop_preference" ADD CONSTRAINT "chat_shop_preference_shop_id_fkey" FOREIGN KEY ("shop_id") REFERENCES "shop_info"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat_shop_preference" ADD CONSTRAINT "chat_shop_preference_automation_id_fkey" FOREIGN KEY ("automation_id") REFERENCES "automated_response"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat_preference" ADD CONSTRAINT "chat_preference_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat_conversation" ADD CONSTRAINT "chat_conversation_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat_conversation" ADD CONSTRAINT "chat_conversation_shop_id_fkey" FOREIGN KEY ("shop_id") REFERENCES "shop_info"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat_message" ADD CONSTRAINT "chat_message_conversation_id_fkey" FOREIGN KEY ("conversation_id") REFERENCES "chat_conversation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat_notification" ADD CONSTRAINT "chat_notification_message_id_fkey" FOREIGN KEY ("message_id") REFERENCES "chat_message"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat_reported_conversation" ADD CONSTRAINT "chat_reported_conversation_conversation_id_fkey" FOREIGN KEY ("conversation_id") REFERENCES "chat_conversation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat_reported_message" ADD CONSTRAINT "chat_reported_message_report_id_fkey" FOREIGN KEY ("report_id") REFERENCES "chat_reported_conversation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat_reported_message" ADD CONSTRAINT "chat_reported_message_message_id_fkey" FOREIGN KEY ("message_id") REFERENCES "chat_message"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat_reported_message" ADD CONSTRAINT "chat_reported_message_reviewed_by_fkey" FOREIGN KEY ("reviewed_by") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat_text" ADD CONSTRAINT "chat_text_message_id_fkey" FOREIGN KEY ("message_id") REFERENCES "chat_message"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat_image" ADD CONSTRAINT "chat_image_message_id_fkey" FOREIGN KEY ("message_id") REFERENCES "chat_message"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat_video" ADD CONSTRAINT "chat_video_message_id_fkey" FOREIGN KEY ("message_id") REFERENCES "chat_message"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat_sticker" ADD CONSTRAINT "chat_sticker_message_id_fkey" FOREIGN KEY ("message_id") REFERENCES "chat_message"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat_sticker" ADD CONSTRAINT "chat_sticker_sticker_id_fkey" FOREIGN KEY ("sticker_id") REFERENCES "chat_sticker_lookup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "deleted_message" ADD CONSTRAINT "deleted_message_message_id_fkey" FOREIGN KEY ("message_id") REFERENCES "chat_message"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "deleted_message" ADD CONSTRAINT "deleted_message_conversation_id_fkey" FOREIGN KEY ("conversation_id") REFERENCES "chat_conversation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
