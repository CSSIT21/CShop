-- AddForeignKey
ALTER TABLE "customer_wishlist" ADD CONSTRAINT "customer_wishlist_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
