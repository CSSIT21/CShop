-- CreateEnum
CREATE TYPE "homeBannerPicturePosition" AS ENUM ('Main', 'Sub');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('Male', 'Female', 'Others', 'PreferNotToSay');

-- CreateEnum
CREATE TYPE "Shop_section" AS ENUM ('Banner', 'BannerCarousel', 'ProductCarousel', 'Video');

-- CreateEnum
CREATE TYPE "Platform" AS ENUM ('Ios', 'Android', 'PC', 'MacOS', 'Linux');

-- CreateEnum
CREATE TYPE "Comment_Raitng" AS ENUM ('Like', 'Dislike');

-- CreateEnum
CREATE TYPE "DiscountClass" AS ENUM ('FreeShipping', 'ReducePrice');

-- CreateEnum
CREATE TYPE "DiscountTypes" AS ENUM ('Shop', 'Event', 'App', 'Category');

-- CreateEnum
CREATE TYPE "DiscountUserTypes" AS ENUM ('Bronze', 'Silver', 'Gold', 'Platinum');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('Pending', 'Success', 'Failed', 'Refunding', 'Refunded');

-- CreateEnum
CREATE TYPE "PaymentTypes" AS ENUM ('QR', 'Deeplink', 'Card');

-- CreateEnum
CREATE TYPE "PaymentCardTransactionStatus" AS ENUM ('Success', 'InsuffientBalance', 'Rejected', 'Refunded');

-- CreateEnum
CREATE TYPE "PaymentWalletTransactionStatus" AS ENUM ('Success', 'InsuffientBalance', 'Refunded');

-- CreateEnum
CREATE TYPE "PaymentBankSelect" AS ENUM ('SCB', 'KBANK', 'TMB', 'KTB');

-- CreateEnum
CREATE TYPE "PaymentCreditTypes" AS ENUM ('MasterCard', 'Visa', 'PayPal');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('Preparing', 'Delivering', 'Delivered');

-- CreateEnum
CREATE TYPE "ChatMessageTypes" AS ENUM ('Text', 'Image', 'Video');

-- CreateEnum
CREATE TYPE "ChatConversationMark" AS ENUM ('Spam', 'Important', 'Unread', 'Done');

-- CreateEnum
CREATE TYPE "SConsoleRefundTypes" AS ENUM ('Defective', 'UnSatisfied');

-- CreateEnum
CREATE TYPE "homePartnerType" AS ENUM ('PaymentMethod', 'Delivery');

-- CreateTable
CREATE TABLE "customer" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(60) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

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
CREATE TABLE "customer_picture_file" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "path" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "primary" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "customer_picture_file_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "address" (
    "id" SERIAL NOT NULL,
    "address_line" VARCHAR(200) NOT NULL,
    "province" VARCHAR(20) NOT NULL,
    "district" VARCHAR(20) NOT NULL,
    "sub_district" VARCHAR(20) NOT NULL,
    "postal_code" VARCHAR(5) NOT NULL,
    "recipient_name" VARCHAR(60) NOT NULL,
    "phone_number" VARCHAR(10) NOT NULL,

    CONSTRAINT "address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customer_address" (
    "customer_id" INTEGER NOT NULL,
    "address_id" INTEGER NOT NULL,
    "primary" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "customer_address_pkey" PRIMARY KEY ("customer_id")
);

-- CreateTable
CREATE TABLE "customer_old_password" (
    "customer_id" INTEGER NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "changed_date" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "customer_old_password_pkey" PRIMARY KEY ("customer_id")
);

-- CreateTable
CREATE TABLE "customer_wishlist" (
    "customer_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "added_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "customer_wishlist_pkey" PRIMARY KEY ("customer_id")
);

-- CreateTable
CREATE TABLE "customer_followed_shop" (
    "customer_id" INTEGER NOT NULL,
    "shop_id" INTEGER NOT NULL,
    "added_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "customer_followed_shop_pkey" PRIMARY KEY ("customer_id")
);

-- CreateTable
CREATE TABLE "customer_email_verification" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(60) NOT NULL,
    "token" TEXT NOT NULL,
    "expire_date" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "customer_email_verification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shop_info" (
    "id" SERIAL NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "shop_address_id" INTEGER NOT NULL,
    "shop_name" VARCHAR(40) NOT NULL,
    "join_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "phone_number" VARCHAR(10) NOT NULL,
    "last_active" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT NOT NULL,
    "followers" INTEGER DEFAULT 0,

    CONSTRAINT "shop_info_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shop_picture" (
    "shop_id" INTEGER NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "path" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,

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
    "sections" JSONB[],

    CONSTRAINT "shop_section_pkey" PRIMARY KEY ("shop_id")
);

-- CreateTable
CREATE TABLE "shop_flashsale" (
    "id" SERIAL NOT NULL,
    "shop_id" INTEGER NOT NULL,
    "started_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ended_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "products" JSONB[],
    "title" TEXT,
    "path" TEXT,
    "thumbnail" TEXT,
    "description" TEXT,

    CONSTRAINT "shop_flashsale_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shop_flashsale_history" (
    "flashsale_id" INTEGER NOT NULL,
    "shop_id" INTEGER NOT NULL,
    "started_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ended_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "products" JSONB[],
    "quantity" JSONB NOT NULL,

    CONSTRAINT "shop_flashsale_history_pkey" PRIMARY KEY ("flashsale_id")
);

-- CreateTable
CREATE TABLE "shop_banner" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "path" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,

    CONSTRAINT "shop_banner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shop_banner_carousel" (
    "id" TEXT NOT NULL,
    "banners" JSONB[],

    CONSTRAINT "shop_banner_carousel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shop_product_carousel" (
    "id" TEXT NOT NULL,
    "filter_name" TEXT NOT NULL,
    "products" INTEGER[],

    CONSTRAINT "shop_product_carousel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shop_video" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "path" TEXT NOT NULL,

    CONSTRAINT "shop_video_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shop_category" (
    "id" SERIAL NOT NULL,
    "shop_id" INTEGER NOT NULL,
    "title" VARCHAR(20) NOT NULL,
    "products" INTEGER[],

    CONSTRAINT "shop_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "category_icon_picture" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "path" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,

    CONSTRAINT "category_icon_picture_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "category_banner_picture" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "path" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,

    CONSTRAINT "category_banner_picture_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "category" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(20) NOT NULL,
    "icon_id" INTEGER NOT NULL,
    "banner_id" INTEGER NOT NULL,

    CONSTRAINT "category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product" (
    "id" SERIAL NOT NULL,
    "shop_id" INTEGER NOT NULL,
    "title" VARCHAR(512) NOT NULL,
    "sub_title" VARCHAR(70) NOT NULL,
    "category_id" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "sold" INTEGER NOT NULL,
    "added_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "suggest_products" INTEGER[],
    "rating" DECIMAL(1,1) NOT NULL,

    CONSTRAINT "product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_detail" (
    "product_id" INTEGER NOT NULL,
    "info" TEXT NOT NULL,

    CONSTRAINT "product_detail_pkey" PRIMARY KEY ("product_id")
);

-- CreateTable
CREATE TABLE "product_reviews" (
    "id" SERIAL NOT NULL,
    "product_id" INTEGER NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "review_time" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "review_picture_id" INTEGER[],

    CONSTRAINT "product_reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_reviews_picture" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "path" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,

    CONSTRAINT "product_reviews_picture_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_short_link" (
    "product_id" INTEGER NOT NULL,
    "shorted_link" TEXT NOT NULL,

    CONSTRAINT "product_short_link_pkey" PRIMARY KEY ("product_id")
);

-- CreateTable
CREATE TABLE "product_comment_rating" (
    "review_id" INTEGER NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "rate" "Comment_Raitng" NOT NULL,
    "comment_time" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "product_comment_rating_pkey" PRIMARY KEY ("review_id")
);

-- CreateTable
CREATE TABLE "product_options" (
    "id" SERIAL NOT NULL,
    "product_id" INTEGER NOT NULL,
    "name" VARCHAR(20) NOT NULL,

    CONSTRAINT "product_options_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_choices" (
    "id" SERIAL NOT NULL,
    "product_options_id" INTEGER NOT NULL,
    "name" VARCHAR(30) NOT NULL,
    "price" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "product_choices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "discount" (
    "id" SERIAL NOT NULL,
    "code" VARCHAR(6) NOT NULL,
    "start_date" TIMESTAMP(6) NOT NULL,
    "end_date" TIMESTAMP(6) NOT NULL,
    "description" TEXT NOT NULL,
    "class" "DiscountClass" NOT NULL,
    "min_price" INTEGER DEFAULT 0,
    "reduce_price" INTEGER,
    "discount_types" "DiscountTypes" NOT NULL,
    "added_date" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "discount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "discount_shop" (
    "discount_id" INTEGER NOT NULL,
    "shop_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "discount_shop_pkey" PRIMARY KEY ("discount_id")
);

-- CreateTable
CREATE TABLE "event" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "discount_event" (
    "discount_id" INTEGER NOT NULL,
    "shop_id" INTEGER NOT NULL,
    "event_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "discount_event_pkey" PRIMARY KEY ("discount_id")
);

-- CreateTable
CREATE TABLE "discount_app" (
    "discount_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "discount_app_pkey" PRIMARY KEY ("discount_id")
);

-- CreateTable
CREATE TABLE "discount_category" (
    "discount_id" INTEGER NOT NULL,
    "category_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "discount_category_pkey" PRIMARY KEY ("discount_id")
);

-- CreateTable
CREATE TABLE "discount_user_code" (
    "customer_id" INTEGER NOT NULL,
    "discount_id" INTEGER NOT NULL,

    CONSTRAINT "discount_user_code_pkey" PRIMARY KEY ("customer_id")
);

-- CreateTable
CREATE TABLE "discount_spend_types" (
    "id" SERIAL NOT NULL,
    "type" "DiscountUserTypes" NOT NULL,
    "amonut" INTEGER NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "discount_spend_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "discount_customer_spend" (
    "customer_id" INTEGER NOT NULL,
    "total_spend" INTEGER NOT NULL,
    "spend_type_id" INTEGER NOT NULL,

    CONSTRAINT "discount_customer_spend_pkey" PRIMARY KEY ("customer_id")
);

-- CreateTable
CREATE TABLE "discount_coin_information" (
    "id" SERIAL NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "got_date" TIMESTAMP(6) NOT NULL,
    "expire_date" TIMESTAMP(6) NOT NULL,
    "get_from" TEXT NOT NULL,

    CONSTRAINT "discount_coin_information_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "discount_customer_coin" (
    "customer_id" INTEGER NOT NULL,
    "total_coin" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "discount_customer_coin_pkey" PRIMARY KEY ("customer_id")
);

-- CreateTable
CREATE TABLE "payment_seller_income" (
    "shop_id" INTEGER NOT NULL,
    "order_id" INTEGER NOT NULL,
    "total_price" INTEGER NOT NULL,
    "time" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "payment_seller_income_pkey" PRIMARY KEY ("shop_id")
);

-- CreateTable
CREATE TABLE "payment_seller_income_receipt" (
    "shop_id" INTEGER NOT NULL,
    "total_income" INTEGER NOT NULL,
    "time" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "receipt" TEXT NOT NULL,

    CONSTRAINT "payment_seller_income_receipt_pkey" PRIMARY KEY ("shop_id")
);

-- CreateTable
CREATE TABLE "payment_shop_bank_account" (
    "shop_id" INTEGER NOT NULL,
    "firstname" VARCHAR(20) NOT NULL,
    "lastname" VARCHAR(20) NOT NULL,
    "bank" "PaymentBankSelect" NOT NULL,
    "account_number" VARCHAR(255) NOT NULL,

    CONSTRAINT "payment_shop_bank_account_pkey" PRIMARY KEY ("shop_id")
);

-- CreateTable
CREATE TABLE "wallet" (
    "id" SERIAL NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "balance" INTEGER NOT NULL DEFAULT 0,
    "updated_time" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "wallet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment_credit_card" (
    "id" SERIAL NOT NULL,
    "card_number" VARCHAR(255) NOT NULL,
    "expire_date" DATE NOT NULL,
    "cvc" VARCHAR(255) NOT NULL,
    "type" "PaymentCreditTypes" NOT NULL,

    CONSTRAINT "payment_credit_card_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment_credit_card_owner" (
    "customer_id" INTEGER NOT NULL,
    "credit_card_id" INTEGER NOT NULL,

    CONSTRAINT "payment_credit_card_owner_pkey" PRIMARY KEY ("credit_card_id")
);

-- CreateTable
CREATE TABLE "payment" (
    "id" SERIAL NOT NULL,
    "order_id" INTEGER NOT NULL,
    "type" "PaymentTypes" NOT NULL,
    "amount" INTEGER NOT NULL,
    "status" "PaymentStatus" NOT NULL,
    "created_date" TIMESTAMP(6) NOT NULL,
    "updated_date" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment_transaction" (
    "id" SERIAL NOT NULL,
    "amount" INTEGER NOT NULL,
    "time" TIMESTAMP(6) NOT NULL,
    "desc" VARCHAR(64) NOT NULL,

    CONSTRAINT "payment_transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment_credit_card_transaction" (
    "id" SERIAL NOT NULL,
    "card_id" INTEGER NOT NULL,
    "status" "PaymentCardTransactionStatus" NOT NULL,
    "transaction_id" INTEGER NOT NULL,
    "refund_id" INTEGER NOT NULL,

    CONSTRAINT "payment_credit_card_transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment_card" (
    "payment_id" INTEGER NOT NULL,
    "card_id" INTEGER NOT NULL,
    "credit_card_transaction_id" INTEGER NOT NULL,

    CONSTRAINT "payment_card_pkey" PRIMARY KEY ("payment_id")
);

-- CreateTable
CREATE TABLE "payment_wallet_transaction" (
    "id" SERIAL NOT NULL,
    "status" "PaymentWalletTransactionStatus" NOT NULL,
    "wallet_id" INTEGER NOT NULL,
    "transaction_id" INTEGER NOT NULL,
    "refund_id" INTEGER NOT NULL,

    CONSTRAINT "payment_wallet_transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment_wallet" (
    "payment_id" INTEGER NOT NULL,
    "wallet_id" INTEGER NOT NULL,
    "wallet_transaction_id" INTEGER NOT NULL,

    CONSTRAINT "payment_wallet_pkey" PRIMARY KEY ("payment_id")
);

-- CreateTable
CREATE TABLE "payment_qr" (
    "payment_id" INTEGER NOT NULL,
    "transaction_id" INTEGER NOT NULL,
    "ref" TEXT NOT NULL,
    "qr" TEXT NOT NULL,

    CONSTRAINT "payment_qr_pkey" PRIMARY KEY ("payment_id")
);

-- CreateTable
CREATE TABLE "payment_deeplink" (
    "payment_id" INTEGER NOT NULL,
    "transaction_id" INTEGER NOT NULL,
    "ref" TEXT NOT NULL,
    "link" TEXT NOT NULL,

    CONSTRAINT "payment_deeplink_pkey" PRIMARY KEY ("payment_id")
);

-- CreateTable
CREATE TABLE "order_deleted_item" (
    "customer_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "time" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "order_deleted_item_pkey" PRIMARY KEY ("customer_id")
);

-- CreateTable
CREATE TABLE "order_rebuy" (
    "customer_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "product_options" INTEGER[],
    "price" INTEGER NOT NULL,
    "date" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "order_rebuy_pkey" PRIMARY KEY ("customer_id")
);

-- CreateTable
CREATE TABLE "order_cart_item" (
    "customer_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "product_options" INTEGER[],
    "quantity" INTEGER NOT NULL,
    "added_time" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "order_cart_item_pkey" PRIMARY KEY ("customer_id")
);

-- CreateTable
CREATE TABLE "order" (
    "id" SERIAL NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "total_price" INTEGER NOT NULL,
    "order_date" TIMESTAMP(6) NOT NULL,
    "status" "OrderStatus" NOT NULL,

    CONSTRAINT "order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_status" (
    "id" SERIAL NOT NULL,
    "delivery_by" TEXT NOT NULL,
    "status" JSONB NOT NULL,

    CONSTRAINT "order_status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_item" (
    "order_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "product_options" INTEGER[],
    "quantity" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "status_id" INTEGER NOT NULL,

    CONSTRAINT "order_item_pkey" PRIMARY KEY ("order_id")
);

-- CreateTable
CREATE TABLE "order_cancel_refund" (
    "id" SERIAL NOT NULL,
    "order_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "product_options" INTEGER[],
    "start_time" TIMESTAMP(6) NOT NULL,
    "canceled_time" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "order_cancel_refund_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_detail" (
    "order_id" INTEGER NOT NULL,
    "address_id" INTEGER NOT NULL,
    "payment_id" INTEGER NOT NULL,
    "discount_id" INTEGER NOT NULL,

    CONSTRAINT "order_detail_pkey" PRIMARY KEY ("order_id")
);

-- CreateTable
CREATE TABLE "order_billing" (
    "order_id" INTEGER NOT NULL,
    "request" BOOLEAN NOT NULL DEFAULT false,
    "request_time" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "order_billing_pkey" PRIMARY KEY ("order_id")
);

-- CreateTable
CREATE TABLE "order_refund_item" (
    "id" SERIAL NOT NULL,
    "order_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "product_options" INTEGER[],
    "request" BOOLEAN NOT NULL DEFAULT false,
    "time_remaining" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "order_refund_item_pkey" PRIMARY KEY ("id")
);

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
CREATE TABLE "chat_automated_response" (
    "id" SERIAL NOT NULL,
    "query" TEXT NOT NULL,
    "response" TEXT NOT NULL,

    CONSTRAINT "chat_automated_response_pkey" PRIMARY KEY ("id")
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
    "seen" BOOLEAN NOT NULL DEFAULT false,

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
    "report_date" TIMESTAMP(6) NOT NULL,

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

    CONSTRAINT "chat_image_pkey" PRIMARY KEY ("message_id")
);

-- CreateTable
CREATE TABLE "chat_video" (
    "message_id" INTEGER NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "path" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,

    CONSTRAINT "chat_video_pkey" PRIMARY KEY ("message_id")
);

-- CreateTable
CREATE TABLE "chat_sticker_lookup" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "path" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,

    CONSTRAINT "chat_sticker_lookup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chat_sticker" (
    "message_id" INTEGER NOT NULL,
    "sticker_id" INTEGER NOT NULL,

    CONSTRAINT "chat_sticker_pkey" PRIMARY KEY ("message_id")
);

-- CreateTable
CREATE TABLE "chat_deleted_message" (
    "message_id" INTEGER NOT NULL,
    "conversation_id" INTEGER NOT NULL,
    "from_customer" BOOLEAN NOT NULL DEFAULT false,
    "message_time" TIMESTAMP(6) NOT NULL,
    "content_type" "ChatMessageTypes" NOT NULL,

    CONSTRAINT "chat_deleted_message_pkey" PRIMARY KEY ("message_id")
);

-- CreateTable
CREATE TABLE "rem_number_view_product" (
    "customer_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "total_view" INTEGER NOT NULL,
    "event_id" INTEGER NOT NULL,
    "added_time" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "rem_number_view_product_pkey" PRIMARY KEY ("customer_id")
);

-- CreateTable
CREATE TABLE "rem_number_product_in_cart" (
    "customer_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "sum_in_cart" INTEGER NOT NULL,
    "added_time" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "event_id" INTEGER NOT NULL,

    CONSTRAINT "rem_number_product_in_cart_pkey" PRIMARY KEY ("customer_id")
);

-- CreateTable
CREATE TABLE "rem_number_payment_product" (
    "customer_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "sum_buy" INTEGER NOT NULL,
    "added_time" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "event_id" INTEGER NOT NULL,

    CONSTRAINT "rem_number_payment_product_pkey" PRIMARY KEY ("customer_id")
);

-- CreateTable
CREATE TABLE "rem_number_interaction_user" (
    "customer_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "interaction_score" INTEGER NOT NULL,
    "added_time" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "rem_number_interaction_user_pkey" PRIMARY KEY ("customer_id")
);

-- CreateTable
CREATE TABLE "rem_related_products" (
    "product_id" INTEGER NOT NULL,
    "related_product" INTEGER[],

    CONSTRAINT "rem_related_products_pkey" PRIMARY KEY ("product_id")
);

-- CreateTable
CREATE TABLE "rem_suggestion_homepage" (
    "customer_id" INTEGER NOT NULL,
    "product_id" INTEGER[],

    CONSTRAINT "rem_suggestion_homepage_pkey" PRIMARY KEY ("customer_id")
);

-- CreateTable
CREATE TABLE "rem_may_favorite_product" (
    "product_id" INTEGER NOT NULL,
    "related_products" INTEGER[],

    CONSTRAINT "rem_may_favorite_product_pkey" PRIMARY KEY ("product_id")
);

-- CreateTable
CREATE TABLE "rem_number_keyword_search" (
    "keyword" TEXT NOT NULL,
    "number_searched" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "rem_number_keyword_search_pkey" PRIMARY KEY ("keyword")
);

-- CreateTable
CREATE TABLE "rem_product_promotion" (
    "product_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "discount_id" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,

    CONSTRAINT "rem_product_promotion_pkey" PRIMARY KEY ("product_id")
);

-- CreateTable
CREATE TABLE "rem_promotion_type_interaction" (
    "event_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "interaction_score" INTEGER NOT NULL,
    "added_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "rem_promotion_type_interaction_pkey" PRIMARY KEY ("event_id")
);

-- CreateTable
CREATE TABLE "sconsole_stock_history" (
    "id" SERIAL NOT NULL,
    "product_id" INTEGER NOT NULL,
    "shop_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "updated_date" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "sconsole_stock_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sconsole_order_status" (
    "id" SERIAL NOT NULL,
    "order_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "shop_id" INTEGER NOT NULL,
    "started_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" JSONB NOT NULL,

    CONSTRAINT "sconsole_order_status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sconsole_discount_log" (
    "id" SERIAL NOT NULL,
    "discount_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "shop_id" INTEGER NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "used_date" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "sconsole_discount_log_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sconsole_flashsale_log" (
    "id" SERIAL NOT NULL,
    "shop_id" INTEGER NOT NULL,
    "flashsale_id" INTEGER NOT NULL,
    "added_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ended_date" TIMESTAMP(6),

    CONSTRAINT "sconsole_flashsale_log_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sconsole_order_history" (
    "id" SERIAL NOT NULL,
    "order_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "shop_id" INTEGER NOT NULL,
    "started_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ended_date" TIMESTAMP(6) NOT NULL,
    "status" JSONB NOT NULL,

    CONSTRAINT "sconsole_order_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sconsole_set_lanch_product" (
    "product_id" INTEGER NOT NULL,
    "lanch_time" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "sconsole_set_lanch_product_pkey" PRIMARY KEY ("product_id")
);

-- CreateTable
CREATE TABLE "sconsole_refund" (
    "id" SERIAL NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "shop_id" INTEGER NOT NULL,
    "type" "SConsoleRefundTypes" NOT NULL,
    "description" TEXT NOT NULL,
    "refund_time" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "sconsole_refund_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sconsole_refund_status" (
    "refund_id" INTEGER NOT NULL,
    "status" JSONB NOT NULL,

    CONSTRAINT "sconsole_refund_status_pkey" PRIMARY KEY ("refund_id")
);

-- CreateTable
CREATE TABLE "sconsole_refund_money" (
    "refund_id" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "payment_id" INTEGER NOT NULL,
    "refund" BOOLEAN NOT NULL,
    "refund_time" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "sconsole_refund_money_pkey" PRIMARY KEY ("refund_id")
);

-- CreateTable
CREATE TABLE "sconsole_refund_history" (
    "id" INTEGER NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "shop_id" INTEGER NOT NULL,
    "type" "SConsoleRefundTypes" NOT NULL,
    "description" TEXT NOT NULL,
    "started_time" TIMESTAMP(6) NOT NULL,
    "ended_time" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "quantity" INTEGER NOT NULL,
    "status" JSONB NOT NULL,

    CONSTRAINT "sconsole_refund_history_pkey" PRIMARY KEY ("id")
);

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

    CONSTRAINT "admin_support_picture_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admin_support" (
    "id" SERIAL NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "support_type_id" INTEGER NOT NULL,
    "sent_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ended_date" TIMESTAMP(6),
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
    "start_date" TIMESTAMP(6) NOT NULL,
    "end_date" TIMESTAMP(6) NOT NULL,
    "description" TEXT NOT NULL,
    "picture_id" INTEGER NOT NULL,
    "suspension_type_id" INTEGER NOT NULL,
    "admin_id" INTEGER NOT NULL,

    CONSTRAINT "admin_customer_suspensions_pkey" PRIMARY KEY ("customer_id")
);

-- CreateTable
CREATE TABLE "admin_shop_suspensions" (
    "shop_id" INTEGER NOT NULL,
    "start_date" TIMESTAMP(6) NOT NULL,
    "end_date" TIMESTAMP(6) NOT NULL,
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
    "sent_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ended_date" TIMESTAMP(6),
    "picture_id" INTEGER NOT NULL,
    "status" JSONB NOT NULL,

    CONSTRAINT "admin_reported_shop_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admin_reported_customer" (
    "id" SERIAL NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "reported_customer_id" INTEGER NOT NULL,
    "sent_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ended_date" TIMESTAMP(6),
    "picture_id" INTEGER NOT NULL,
    "status" JSONB NOT NULL,

    CONSTRAINT "admin_reported_customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admin_audit" (
    "admin_id" INTEGER NOT NULL,
    "login_date" TIMESTAMP(6) NOT NULL,
    "action" TEXT NOT NULL,

    CONSTRAINT "admin_audit_pkey" PRIMARY KEY ("admin_id")
);

-- CreateTable
CREATE TABLE "home_banner_picture" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "position" "homeBannerPicturePosition" NOT NULL,
    "type" "homePartnerType" NOT NULL,
    "path" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,

    CONSTRAINT "home_banner_picture_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "home_banner" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "start_date" TIMESTAMP(6) NOT NULL,
    "end_date" TIMESTAMP(6) NOT NULL,
    "picture_id" INTEGER[],
    "order" INTEGER NOT NULL,
    "keywords" VARCHAR(20)[],
    "visible" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "home_banner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "home_popup" (
    "id" SERIAL NOT NULL,
    "start_date" TIMESTAMP(6) NOT NULL,
    "end_date" TIMESTAMP(6) NOT NULL,
    "description" TEXT NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "path" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,

    CONSTRAINT "home_popup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "home_app_review" (
    "id" SERIAL NOT NULL,
    "firstname" VARCHAR(20) NOT NULL,
    "lastname" VARCHAR(20) NOT NULL,
    "nickname" VARCHAR(20) NOT NULL,
    "review_date" TIMESTAMP(6) NOT NULL,
    "comment" TEXT NOT NULL,
    "theme_color" TEXT NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "path" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,

    CONSTRAINT "home_app_review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "home_partner" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "start_date" TIMESTAMP(6) NOT NULL,
    "end_date" TIMESTAMP(6) NOT NULL,
    "join_date" TIMESTAMP(6) NOT NULL,
    "description" TEXT NOT NULL,
    "title_pic" VARCHAR(50) NOT NULL,
    "path" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,

    CONSTRAINT "home_partner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "home_product_log" (
    "customer_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "view_date" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "home_product_log_pkey" PRIMARY KEY ("customer_id")
);

-- CreateTable
CREATE TABLE "home_add_to_cart_log" (
    "customer_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "added_date" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "home_add_to_cart_log_pkey" PRIMARY KEY ("customer_id")
);

-- CreateTable
CREATE TABLE "home_shop_log" (
    "customer_id" INTEGER NOT NULL,
    "shop_id" INTEGER NOT NULL,

    CONSTRAINT "home_shop_log_pkey" PRIMARY KEY ("customer_id")
);

-- CreateTable
CREATE TABLE "home_payment_log" (
    "customer_id" INTEGER NOT NULL,
    "payment_id" INTEGER NOT NULL,
    "issue_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "home_payment_log_pkey" PRIMARY KEY ("customer_id")
);

-- CreateTable
CREATE TABLE "home_discount_log" (
    "customer_id" INTEGER NOT NULL,
    "discount_id" INTEGER NOT NULL,
    "view_date" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "home_discount_log_pkey" PRIMARY KEY ("customer_id")
);

-- CreateTable
CREATE TABLE "search_history" (
    "customer_id" INTEGER NOT NULL,
    "query" TEXT NOT NULL,
    "search_time" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "search_history_pkey" PRIMARY KEY ("customer_id")
);

-- CreateTable
CREATE TABLE "search_keyword_interacts" (
    "keyword" VARCHAR(16) NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "timestamp" TIMESTAMP(6),

    CONSTRAINT "search_keyword_interacts_pkey" PRIMARY KEY ("keyword")
);

-- CreateTable
CREATE TABLE "search_suggestion_matchpoint" (
    "start_key" VARCHAR(16) NOT NULL,
    "next_key" VARCHAR(16) NOT NULL,
    "timestamp" TIMESTAMP(6),

    CONSTRAINT "search_suggestion_matchpoint_pkey" PRIMARY KEY ("start_key")
);

-- CreateTable
CREATE TABLE "search_suggestion_history" (
    "start_key" VARCHAR(16) NOT NULL,
    "next_key" VARCHAR(16) NOT NULL,
    "count" INTEGER NOT NULL,

    CONSTRAINT "search_suggestion_history_pkey" PRIMARY KEY ("start_key")
);

-- CreateTable
CREATE TABLE "search_suggestion_score" (
    "start_keyword" VARCHAR(16) NOT NULL,
    "next_keyword" VARCHAR(16) NOT NULL,
    "score" INTEGER NOT NULL,

    CONSTRAINT "search_suggestion_score_pkey" PRIMARY KEY ("start_keyword")
);

-- CreateTable
CREATE TABLE "search_trend_summaries" (
    "keyword" VARCHAR(16) NOT NULL,
    "count" INTEGER NOT NULL,
    "day" SMALLINT NOT NULL,
    "month" SMALLINT NOT NULL,
    "year" SMALLINT NOT NULL,

    CONSTRAINT "search_trend_summaries_pkey" PRIMARY KEY ("keyword")
);

-- CreateTable
CREATE TABLE "search_trend_records" (
    "keyword" VARCHAR(16) NOT NULL,
    "timestamp" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "search_trend_records_pkey" PRIMARY KEY ("keyword")
);

-- CreateTable
CREATE TABLE "search_mispelling_log" (
    "sentence" TEXT NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "timestamp" TIMESTAMP(6),

    CONSTRAINT "search_mispelling_log_pkey" PRIMARY KEY ("sentence")
);

-- CreateTable
CREATE TABLE "search_mispelling_edits" (
    "orginal_keyword" VARCHAR(16) NOT NULL,
    "edited_keyword" VARCHAR(16) NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "count" INTEGER NOT NULL,

    CONSTRAINT "search_mispelling_edits_pkey" PRIMARY KEY ("orginal_keyword")
);

-- CreateTable
CREATE TABLE "search_mispelling_proofed" (
    "orginal_keyword" VARCHAR(16) NOT NULL,
    "edited_keyword" VARCHAR(16) NOT NULL,

    CONSTRAINT "search_mispelling_proofed_pkey" PRIMARY KEY ("orginal_keyword")
);

-- CreateTable
CREATE TABLE "business_page_types" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(16) NOT NULL,
    "path" VARCHAR(64) NOT NULL,

    CONSTRAINT "business_page_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "business_conversation_types" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(16) NOT NULL,
    "weight" SMALLINT NOT NULL,

    CONSTRAINT "business_conversation_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "business_page_view_records" (
    "page_type_id" INTEGER NOT NULL,
    "referer_page_type_id" INTEGER NOT NULL,
    "duration" INTEGER NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "timestamp" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "business_page_view_records_pkey" PRIMARY KEY ("page_type_id")
);

-- CreateTable
CREATE TABLE "business_product_view_records" (
    "product_id" INTEGER NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "duration" INTEGER NOT NULL,
    "timestamp" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "business_product_view_records_pkey" PRIMARY KEY ("product_id")
);

-- CreateTable
CREATE TABLE "business_conversation_records" (
    "conversation_id" INTEGER NOT NULL,
    "referer_page_types_id" INTEGER NOT NULL,
    "timestamp" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "business_conversation_records_pkey" PRIMARY KEY ("conversation_id")
);

-- CreateTable
CREATE TABLE "business_pageview_count_summaries" (
    "pagetype_id" INTEGER NOT NULL,
    "registered" SMALLINT NOT NULL,
    "avgduration" INTEGER NOT NULL,
    "count" INTEGER NOT NULL,
    "date" DATE NOT NULL,

    CONSTRAINT "business_pageview_count_summaries_pkey" PRIMARY KEY ("pagetype_id")
);

-- CreateTable
CREATE TABLE "business_pageview_referer_summaries" (
    "pagetype_id" INTEGER NOT NULL,
    "referer_page_type" INTEGER NOT NULL,
    "count" INTEGER NOT NULL,
    "date" DATE NOT NULL,

    CONSTRAINT "business_pageview_referer_summaries_pkey" PRIMARY KEY ("pagetype_id")
);

-- CreateTable
CREATE TABLE "business_product_view_summaries" (
    "product_id" INTEGER NOT NULL,
    "avgduration" INTEGER NOT NULL,
    "count" INTEGER NOT NULL,
    "date" DATE NOT NULL,

    CONSTRAINT "business_product_view_summaries_pkey" PRIMARY KEY ("product_id")
);

-- CreateTable
CREATE TABLE "business_conversation_count_summaries" (
    "conversation_id" INTEGER NOT NULL,
    "referer_page_type_id" INTEGER NOT NULL,
    "count" INTEGER NOT NULL,
    "date" DATE NOT NULL,

    CONSTRAINT "business_conversation_count_summaries_pkey" PRIMARY KEY ("conversation_id")
);

-- CreateTable
CREATE TABLE "business_interaction_weight" (
    "weight" INTEGER NOT NULL,
    "date" DATE NOT NULL,

    CONSTRAINT "business_interaction_weight_pkey" PRIMARY KEY ("weight")
);

-- CreateIndex
CREATE UNIQUE INDEX "customer_email_key" ON "customer"("email");

-- AddForeignKey
ALTER TABLE "customer_info" ADD CONSTRAINT "customer_info_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customer_picture" ADD CONSTRAINT "customer_picture_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customer_picture" ADD CONSTRAINT "customer_picture_picture_id_fkey" FOREIGN KEY ("picture_id") REFERENCES "customer_picture_file"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customer_address" ADD CONSTRAINT "customer_address_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customer_address" ADD CONSTRAINT "customer_address_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customer_old_password" ADD CONSTRAINT "customer_old_password_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customer_wishlist" ADD CONSTRAINT "customer_wishlist_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customer_followed_shop" ADD CONSTRAINT "customer_followed_shop_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customer_followed_shop" ADD CONSTRAINT "customer_followed_shop_shop_id_fkey" FOREIGN KEY ("shop_id") REFERENCES "shop_info"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

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
ALTER TABLE "shop_flashsale_history" ADD CONSTRAINT "shop_flashsale_history_flashsale_id_fkey" FOREIGN KEY ("flashsale_id") REFERENCES "shop_flashsale"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shop_flashsale_history" ADD CONSTRAINT "shop_flashsale_history_shop_id_fkey" FOREIGN KEY ("shop_id") REFERENCES "shop_info"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shop_category" ADD CONSTRAINT "shop_category_shop_id_fkey" FOREIGN KEY ("shop_id") REFERENCES "shop_info"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "category" ADD CONSTRAINT "category_banner_id_fkey" FOREIGN KEY ("banner_id") REFERENCES "category_banner_picture"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "category" ADD CONSTRAINT "category_icon_id_fkey" FOREIGN KEY ("icon_id") REFERENCES "category_icon_picture"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_shop_id_fkey" FOREIGN KEY ("shop_id") REFERENCES "shop_info"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_detail" ADD CONSTRAINT "product_detail_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_reviews" ADD CONSTRAINT "product_reviews_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_reviews" ADD CONSTRAINT "product_reviews_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_short_link" ADD CONSTRAINT "product_short_link_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_comment_rating" ADD CONSTRAINT "product_comment_rating_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_comment_rating" ADD CONSTRAINT "product_comment_rating_review_id_fkey" FOREIGN KEY ("review_id") REFERENCES "product_reviews"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_options" ADD CONSTRAINT "product_options_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_choices" ADD CONSTRAINT "product_choices_product_options_id_fkey" FOREIGN KEY ("product_options_id") REFERENCES "product_options"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discount_shop" ADD CONSTRAINT "discount_shop_discount_id_fkey" FOREIGN KEY ("discount_id") REFERENCES "discount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discount_shop" ADD CONSTRAINT "discount_shop_shop_id_fkey" FOREIGN KEY ("shop_id") REFERENCES "shop_info"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discount_event" ADD CONSTRAINT "discount_event_discount_id_fkey" FOREIGN KEY ("discount_id") REFERENCES "discount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discount_event" ADD CONSTRAINT "discount_event_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discount_event" ADD CONSTRAINT "discount_event_shop_id_fkey" FOREIGN KEY ("shop_id") REFERENCES "shop_info"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discount_app" ADD CONSTRAINT "discount_app_discount_id_fkey" FOREIGN KEY ("discount_id") REFERENCES "discount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discount_category" ADD CONSTRAINT "discount_category_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discount_category" ADD CONSTRAINT "discount_category_discount_id_fkey" FOREIGN KEY ("discount_id") REFERENCES "discount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discount_user_code" ADD CONSTRAINT "discount_user_code_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discount_user_code" ADD CONSTRAINT "discount_user_code_discount_id_fkey" FOREIGN KEY ("discount_id") REFERENCES "discount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discount_customer_spend" ADD CONSTRAINT "discount_customer_spend_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discount_customer_spend" ADD CONSTRAINT "discount_customer_spend_spend_type_id_fkey" FOREIGN KEY ("spend_type_id") REFERENCES "discount_spend_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discount_coin_information" ADD CONSTRAINT "discount_coin_information_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discount_customer_coin" ADD CONSTRAINT "discount_customer_coin_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_seller_income" ADD CONSTRAINT "payment_seller_income_shop_id_fkey" FOREIGN KEY ("shop_id") REFERENCES "shop_info"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_seller_income_receipt" ADD CONSTRAINT "payment_seller_income_receipt_shop_id_fkey" FOREIGN KEY ("shop_id") REFERENCES "shop_info"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_shop_bank_account" ADD CONSTRAINT "payment_shop_bank_account_shop_id_fkey" FOREIGN KEY ("shop_id") REFERENCES "shop_info"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wallet" ADD CONSTRAINT "wallet_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_credit_card_owner" ADD CONSTRAINT "payment_credit_card_owner_credit_card_id_fkey" FOREIGN KEY ("credit_card_id") REFERENCES "payment_credit_card"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_credit_card_owner" ADD CONSTRAINT "payment_credit_card_owner_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_credit_card_transaction" ADD CONSTRAINT "payment_credit_card_transaction_card_id_fkey" FOREIGN KEY ("card_id") REFERENCES "payment_credit_card"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_credit_card_transaction" ADD CONSTRAINT "payment_credit_card_transaction_refund_id_fkey" FOREIGN KEY ("refund_id") REFERENCES "order_refund_item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_credit_card_transaction" ADD CONSTRAINT "payment_credit_card_transaction_transaction_id_fkey" FOREIGN KEY ("transaction_id") REFERENCES "payment_transaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_card" ADD CONSTRAINT "payment_card_card_id_fkey" FOREIGN KEY ("card_id") REFERENCES "payment_credit_card"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_card" ADD CONSTRAINT "payment_card_credit_card_transaction_id_fkey" FOREIGN KEY ("credit_card_transaction_id") REFERENCES "payment_credit_card_transaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_card" ADD CONSTRAINT "payment_card_payment_id_fkey" FOREIGN KEY ("payment_id") REFERENCES "payment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_wallet_transaction" ADD CONSTRAINT "payment_wallet_transaction_refund_id_fkey" FOREIGN KEY ("refund_id") REFERENCES "order_refund_item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_wallet_transaction" ADD CONSTRAINT "payment_wallet_transaction_transaction_id_fkey" FOREIGN KEY ("transaction_id") REFERENCES "payment_transaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_wallet_transaction" ADD CONSTRAINT "payment_wallet_transaction_wallet_id_fkey" FOREIGN KEY ("wallet_id") REFERENCES "wallet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_wallet" ADD CONSTRAINT "payment_wallet_payment_id_fkey" FOREIGN KEY ("payment_id") REFERENCES "payment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_wallet" ADD CONSTRAINT "payment_wallet_wallet_id_fkey" FOREIGN KEY ("wallet_id") REFERENCES "wallet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_wallet" ADD CONSTRAINT "payment_wallet_wallet_transaction_id_fkey" FOREIGN KEY ("wallet_transaction_id") REFERENCES "payment_wallet_transaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_qr" ADD CONSTRAINT "payment_qr_payment_id_fkey" FOREIGN KEY ("payment_id") REFERENCES "payment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_qr" ADD CONSTRAINT "payment_qr_transaction_id_fkey" FOREIGN KEY ("transaction_id") REFERENCES "payment_transaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_deeplink" ADD CONSTRAINT "payment_deeplink_payment_id_fkey" FOREIGN KEY ("payment_id") REFERENCES "payment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_deeplink" ADD CONSTRAINT "payment_deeplink_transaction_id_fkey" FOREIGN KEY ("transaction_id") REFERENCES "payment_transaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_deleted_item" ADD CONSTRAINT "order_deleted_item_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_deleted_item" ADD CONSTRAINT "order_deleted_item_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_rebuy" ADD CONSTRAINT "order_rebuy_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_rebuy" ADD CONSTRAINT "order_rebuy_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_cart_item" ADD CONSTRAINT "order_cart_item_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_cart_item" ADD CONSTRAINT "order_cart_item_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_item" ADD CONSTRAINT "order_item_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_item" ADD CONSTRAINT "order_item_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_item" ADD CONSTRAINT "order_item_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "order_status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_cancel_refund" ADD CONSTRAINT "order_cancel_refund_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_cancel_refund" ADD CONSTRAINT "order_cancel_refund_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_detail" ADD CONSTRAINT "order_detail_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_detail" ADD CONSTRAINT "order_detail_discount_id_fkey" FOREIGN KEY ("discount_id") REFERENCES "discount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_detail" ADD CONSTRAINT "order_detail_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_detail" ADD CONSTRAINT "order_detail_payment_id_fkey" FOREIGN KEY ("payment_id") REFERENCES "payment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_billing" ADD CONSTRAINT "order_billing_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_refund_item" ADD CONSTRAINT "order_refund_item_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_refund_item" ADD CONSTRAINT "order_refund_item_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat_shop_label" ADD CONSTRAINT "chat_shop_label_shop_id_fkey" FOREIGN KEY ("shop_id") REFERENCES "shop_info"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat_shop_stat" ADD CONSTRAINT "chat_shop_stat_shop_id_fkey" FOREIGN KEY ("shop_id") REFERENCES "shop_info"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat_shop_preference" ADD CONSTRAINT "chat_shop_preference_automation_id_fkey" FOREIGN KEY ("automation_id") REFERENCES "chat_automated_response"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat_shop_preference" ADD CONSTRAINT "chat_shop_preference_shop_id_fkey" FOREIGN KEY ("shop_id") REFERENCES "shop_info"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

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
ALTER TABLE "chat_reported_message" ADD CONSTRAINT "chat_reported_message_message_id_fkey" FOREIGN KEY ("message_id") REFERENCES "chat_message"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat_reported_message" ADD CONSTRAINT "chat_reported_message_report_id_fkey" FOREIGN KEY ("report_id") REFERENCES "chat_reported_conversation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

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
ALTER TABLE "chat_deleted_message" ADD CONSTRAINT "chat_deleted_message_conversation_id_fkey" FOREIGN KEY ("conversation_id") REFERENCES "chat_conversation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rem_number_view_product" ADD CONSTRAINT "rem_number_view_product_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rem_number_view_product" ADD CONSTRAINT "rem_number_view_product_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rem_number_view_product" ADD CONSTRAINT "rem_number_view_product_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rem_number_product_in_cart" ADD CONSTRAINT "rem_number_product_in_cart_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rem_number_product_in_cart" ADD CONSTRAINT "rem_number_product_in_cart_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rem_number_product_in_cart" ADD CONSTRAINT "rem_number_product_in_cart_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rem_number_payment_product" ADD CONSTRAINT "rem_number_payment_product_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rem_number_payment_product" ADD CONSTRAINT "rem_number_payment_product_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rem_number_payment_product" ADD CONSTRAINT "rem_number_payment_product_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rem_number_interaction_user" ADD CONSTRAINT "rem_number_interaction_user_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rem_number_interaction_user" ADD CONSTRAINT "rem_number_interaction_user_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rem_related_products" ADD CONSTRAINT "rem_related_products_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rem_suggestion_homepage" ADD CONSTRAINT "rem_suggestion_homepage_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rem_may_favorite_product" ADD CONSTRAINT "rem_may_favorite_product_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rem_product_promotion" ADD CONSTRAINT "rem_product_promotion_discount_id_fkey" FOREIGN KEY ("discount_id") REFERENCES "discount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rem_product_promotion" ADD CONSTRAINT "rem_product_promotion_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rem_promotion_type_interaction" ADD CONSTRAINT "rem_promotion_type_interaction_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rem_promotion_type_interaction" ADD CONSTRAINT "rem_promotion_type_interaction_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sconsole_stock_history" ADD CONSTRAINT "sconsole_stock_history_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sconsole_stock_history" ADD CONSTRAINT "sconsole_stock_history_shop_id_fkey" FOREIGN KEY ("shop_id") REFERENCES "shop_info"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sconsole_order_status" ADD CONSTRAINT "sconsole_order_status_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sconsole_order_status" ADD CONSTRAINT "sconsole_order_status_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sconsole_order_status" ADD CONSTRAINT "sconsole_order_status_shop_id_fkey" FOREIGN KEY ("shop_id") REFERENCES "shop_info"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sconsole_discount_log" ADD CONSTRAINT "sconsole_discount_log_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sconsole_discount_log" ADD CONSTRAINT "sconsole_discount_log_discount_id_fkey" FOREIGN KEY ("discount_id") REFERENCES "discount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sconsole_discount_log" ADD CONSTRAINT "sconsole_discount_log_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sconsole_discount_log" ADD CONSTRAINT "sconsole_discount_log_shop_id_fkey" FOREIGN KEY ("shop_id") REFERENCES "shop_info"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sconsole_flashsale_log" ADD CONSTRAINT "sconsole_flashsale_log_flashsale_id_fkey" FOREIGN KEY ("flashsale_id") REFERENCES "shop_flashsale"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sconsole_flashsale_log" ADD CONSTRAINT "sconsole_flashsale_log_shop_id_fkey" FOREIGN KEY ("shop_id") REFERENCES "shop_info"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sconsole_order_history" ADD CONSTRAINT "sconsole_order_history_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sconsole_order_history" ADD CONSTRAINT "sconsole_order_history_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sconsole_order_history" ADD CONSTRAINT "sconsole_order_history_shop_id_fkey" FOREIGN KEY ("shop_id") REFERENCES "shop_info"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sconsole_set_lanch_product" ADD CONSTRAINT "sconsole_set_lanch_product_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sconsole_refund" ADD CONSTRAINT "sconsole_refund_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sconsole_refund" ADD CONSTRAINT "sconsole_refund_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sconsole_refund" ADD CONSTRAINT "sconsole_refund_shop_id_fkey" FOREIGN KEY ("shop_id") REFERENCES "shop_info"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sconsole_refund_status" ADD CONSTRAINT "sconsole_refund_status_refund_id_fkey" FOREIGN KEY ("refund_id") REFERENCES "sconsole_refund"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sconsole_refund_money" ADD CONSTRAINT "sconsole_refund_money_payment_id_fkey" FOREIGN KEY ("payment_id") REFERENCES "payment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sconsole_refund_money" ADD CONSTRAINT "sconsole_refund_money_refund_id_fkey" FOREIGN KEY ("refund_id") REFERENCES "sconsole_refund"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sconsole_refund_history" ADD CONSTRAINT "sconsole_refund_history_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sconsole_refund_history" ADD CONSTRAINT "sconsole_refund_history_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sconsole_refund_history" ADD CONSTRAINT "sconsole_refund_history_shop_id_fkey" FOREIGN KEY ("shop_id") REFERENCES "shop_info"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admin_support" ADD CONSTRAINT "admin_support_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admin_support" ADD CONSTRAINT "admin_support_picture_id_fkey" FOREIGN KEY ("picture_id") REFERENCES "admin_support_picture"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admin_support" ADD CONSTRAINT "admin_support_support_type_id_fkey" FOREIGN KEY ("support_type_id") REFERENCES "admin_support_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admin_support_status" ADD CONSTRAINT "admin_support_status_support_id_fkey" FOREIGN KEY ("support_id") REFERENCES "admin_support"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admin_customer_suspensions" ADD CONSTRAINT "admin_customer_suspensions_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admin_customer_suspensions" ADD CONSTRAINT "admin_customer_suspensions_picture_id_fkey" FOREIGN KEY ("picture_id") REFERENCES "admin_support_picture"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admin_customer_suspensions" ADD CONSTRAINT "admin_customer_suspensions_suspension_type_id_fkey" FOREIGN KEY ("suspension_type_id") REFERENCES "admin_suspension_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admin_shop_suspensions" ADD CONSTRAINT "admin_shop_suspensions_picture_id_fkey" FOREIGN KEY ("picture_id") REFERENCES "admin_support_picture"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admin_shop_suspensions" ADD CONSTRAINT "admin_shop_suspensions_shop_id_fkey" FOREIGN KEY ("shop_id") REFERENCES "shop_info"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admin_shop_suspensions" ADD CONSTRAINT "admin_shop_suspensions_suspension_type_id_fkey" FOREIGN KEY ("suspension_type_id") REFERENCES "admin_suspension_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admin_reported_shop" ADD CONSTRAINT "admin_reported_shop_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admin_reported_shop" ADD CONSTRAINT "admin_reported_shop_picture_id_fkey" FOREIGN KEY ("picture_id") REFERENCES "admin_support_picture"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admin_reported_shop" ADD CONSTRAINT "admin_reported_shop_reported_shop_id_fkey" FOREIGN KEY ("reported_shop_id") REFERENCES "shop_info"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admin_reported_customer" ADD CONSTRAINT "admin_reported_customer_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admin_reported_customer" ADD CONSTRAINT "admin_reported_customer_picture_id_fkey" FOREIGN KEY ("picture_id") REFERENCES "admin_support_picture"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "home_product_log" ADD CONSTRAINT "home_product_log_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "home_product_log" ADD CONSTRAINT "home_product_log_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "home_add_to_cart_log" ADD CONSTRAINT "home_add_to_cart_log_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "home_add_to_cart_log" ADD CONSTRAINT "home_add_to_cart_log_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "home_shop_log" ADD CONSTRAINT "home_shop_log_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "home_shop_log" ADD CONSTRAINT "home_shop_log_shop_id_fkey" FOREIGN KEY ("shop_id") REFERENCES "shop_info"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "home_payment_log" ADD CONSTRAINT "home_payment_log_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "home_payment_log" ADD CONSTRAINT "home_payment_log_payment_id_fkey" FOREIGN KEY ("payment_id") REFERENCES "payment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "home_discount_log" ADD CONSTRAINT "home_discount_log_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "home_discount_log" ADD CONSTRAINT "home_discount_log_discount_id_fkey" FOREIGN KEY ("discount_id") REFERENCES "discount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "search_history" ADD CONSTRAINT "search_history_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "search_keyword_interacts" ADD CONSTRAINT "search_keyword_interacts_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "search_mispelling_log" ADD CONSTRAINT "search_mispelling_log_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "search_mispelling_edits" ADD CONSTRAINT "search_mispelling_edits_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_page_view_records" ADD CONSTRAINT "business_page_view_records_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_page_view_records" ADD CONSTRAINT "business_page_view_records_page_type_id_fkey" FOREIGN KEY ("page_type_id") REFERENCES "business_page_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_product_view_records" ADD CONSTRAINT "business_product_view_records_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_product_view_records" ADD CONSTRAINT "business_product_view_records_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_conversation_records" ADD CONSTRAINT "business_conversation_records_conversation_id_fkey" FOREIGN KEY ("conversation_id") REFERENCES "business_conversation_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_conversation_records" ADD CONSTRAINT "business_conversation_records_referer_page_types_id_fkey" FOREIGN KEY ("referer_page_types_id") REFERENCES "business_page_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_pageview_count_summaries" ADD CONSTRAINT "business_pageview_count_summaries_pagetype_id_fkey" FOREIGN KEY ("pagetype_id") REFERENCES "business_page_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_pageview_referer_summaries" ADD CONSTRAINT "business_pageview_referer_summaries_pagetype_id_fkey" FOREIGN KEY ("pagetype_id") REFERENCES "business_page_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_product_view_summaries" ADD CONSTRAINT "business_product_view_summaries_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_conversation_count_summaries" ADD CONSTRAINT "business_conversation_count_summaries_conversation_id_fkey" FOREIGN KEY ("conversation_id") REFERENCES "business_conversation_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_conversation_count_summaries" ADD CONSTRAINT "business_conversation_count_summaries_referer_page_type_id_fkey" FOREIGN KEY ("referer_page_type_id") REFERENCES "business_page_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
