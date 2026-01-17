/*
  Warnings:

  - You are about to drop the `estoque_entrada_itens` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "estoque_entrada_itens" DROP CONSTRAINT "estoque_entrada_itens_entryId_fkey";

-- DropForeignKey
ALTER TABLE "estoque_entrada_itens" DROP CONSTRAINT "estoque_entrada_itens_productId_fkey";

-- DropTable
DROP TABLE "estoque_entrada_itens";

-- CreateTable
CREATE TABLE "StockEntryItem" (
    "id" TEXT NOT NULL,
    "stockEntryId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unitCost" DECIMAL(10,2),
    "lotNumber" TEXT,
    "expiresAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StockEntryItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "StockEntryItem" ADD CONSTRAINT "StockEntryItem_stockEntryId_fkey" FOREIGN KEY ("stockEntryId") REFERENCES "estoque_entradas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockEntryItem" ADD CONSTRAINT "StockEntryItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "produtos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
