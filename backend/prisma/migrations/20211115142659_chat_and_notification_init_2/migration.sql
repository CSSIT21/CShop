/*
  Warnings:

  - You are about to drop the `automated_response` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `deleted_message` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "chat_shop_preference" DROP CONSTRAINT "chat_shop_preference_automation_id_fkey";

-- DropForeignKey
ALTER TABLE "deleted_message" DROP CONSTRAINT "deleted_message_conversation_id_fkey";

-- DropForeignKey
ALTER TABLE "deleted_message" DROP CONSTRAINT "deleted_message_message_id_fkey";

-- DropTable
DROP TABLE "automated_response";

-- DropTable
DROP TABLE "deleted_message";

-- CreateTable
CREATE TABLE "chat_automated_response" (
    "id" SERIAL NOT NULL,
    "query" TEXT NOT NULL,
    "response" TEXT NOT NULL,

    CONSTRAINT "chat_automated_response_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chat_deleted_message" (
    "message_id" INTEGER NOT NULL,
    "conversation_id" INTEGER NOT NULL,
    "from_a_to_b" BOOLEAN NOT NULL DEFAULT false,
    "message_time" TIMESTAMP NOT NULL,
    "content_type" "ChatMessageTypes" NOT NULL,

    CONSTRAINT "chat_deleted_message_pkey" PRIMARY KEY ("message_id")
);

-- AddForeignKey
ALTER TABLE "chat_shop_preference" ADD CONSTRAINT "chat_shop_preference_automation_id_fkey" FOREIGN KEY ("automation_id") REFERENCES "chat_automated_response"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat_deleted_message" ADD CONSTRAINT "chat_deleted_message_message_id_fkey" FOREIGN KEY ("message_id") REFERENCES "chat_message"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat_deleted_message" ADD CONSTRAINT "chat_deleted_message_conversation_id_fkey" FOREIGN KEY ("conversation_id") REFERENCES "chat_conversation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
