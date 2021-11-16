-- CreateTable
CREATE TABLE "search_history" (
    "customer_id" INTEGER NOT NULL,
    "query" TEXT NOT NULL,
    "search_time" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "search_history_pkey" PRIMARY KEY ("customer_id")
);

-- CreateTable
CREATE TABLE "search_keyword_interacts" (
    "keyword" VARCHAR(16) NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "timestamp" TIMESTAMP,

    CONSTRAINT "search_keyword_interacts_pkey" PRIMARY KEY ("keyword")
);

-- CreateTable
CREATE TABLE "search_suggestion_matchpoint" (
    "start_key" VARCHAR(16) NOT NULL,
    "next_key" VARCHAR(16) NOT NULL,
    "timestamp" TIMESTAMP,

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
    "timestamp" TIMESTAMP NOT NULL,

    CONSTRAINT "search_trend_records_pkey" PRIMARY KEY ("keyword")
);

-- CreateTable
CREATE TABLE "search_mispelling_log" (
    "sentence" TEXT NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "timestamp" TIMESTAMP,

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

-- AddForeignKey
ALTER TABLE "search_history" ADD CONSTRAINT "search_history_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "search_keyword_interacts" ADD CONSTRAINT "search_keyword_interacts_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "search_mispelling_log" ADD CONSTRAINT "search_mispelling_log_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "search_mispelling_edits" ADD CONSTRAINT "search_mispelling_edits_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
