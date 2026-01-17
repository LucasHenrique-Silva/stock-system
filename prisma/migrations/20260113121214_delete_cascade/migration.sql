-- DropForeignKey
ALTER TABLE "ProductBarcode" DROP CONSTRAINT "ProductBarcode_productId_fkey";

-- AddForeignKey
ALTER TABLE "ProductBarcode" ADD CONSTRAINT "ProductBarcode_productId_fkey" FOREIGN KEY ("productId") REFERENCES "produtos"("id") ON DELETE CASCADE ON UPDATE CASCADE;
