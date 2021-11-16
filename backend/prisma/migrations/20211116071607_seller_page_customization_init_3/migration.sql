/*
  Warnings:

  - The primary key for the `shop_flashsale` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `shop_flashsale_history` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `description` to the `shop_flashsale` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mime_type` to the `shop_flashsale` table without a default value. This is not possible if the table is not empty.
  - Added the required column `path` to the `shop_flashsale` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thumbnail` to the `shop_flashsale` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `shop_flashsale` table without a default value. This is not possible if the table is not empty.
  - Added the required column `flashsale_id` to the `shop_flashsale_history` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "shop_flashsale" DROP CONSTRAINT "shop_flashsale_pkey",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "mime_type" VARCHAR(20) NOT NULL,
ADD COLUMN     "path" TEXT NOT NULL,
ADD COLUMN     "thumbnail" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
ADD CONSTRAINT "shop_flashsale_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "shop_flashsale_history" DROP CONSTRAINT "shop_flashsale_history_pkey",
ADD COLUMN     "flashsale_id" INTEGER NOT NULL,
ADD CONSTRAINT "shop_flashsale_history_pkey" PRIMARY KEY ("flashsale_id");

-- AddForeignKey
ALTER TABLE "shop_flashsale_history" ADD CONSTRAINT "shop_flashsale_history_flashsale_id_fkey" FOREIGN KEY ("flashsale_id") REFERENCES "shop_flashsale"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
