/*
  Warnings:

  - You are about to drop the column `lotNumber` on the `produtos` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "StockEntryType" AS ENUM ('COMPRA', 'AJUSTE', 'DEVOLUCAO');

-- CreateEnum
CREATE TYPE "StockExitType" AS ENUM ('VENDA', 'AJUSTE', 'PERDA', 'VENCIMENTO');

-- AlterTable
ALTER TABLE "produtos" DROP COLUMN "lotNumber";

-- CreateTable
CREATE TABLE "estoque_entradas" (
    "id" TEXT NOT NULL,
    "type" "StockEntryType" NOT NULL DEFAULT 'COMPRA',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdById" TEXT NOT NULL,

    CONSTRAINT "estoque_entradas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "estoque_entrada_itens" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unitCost" DECIMAL(10,2),
    "lotNumber" TEXT,
    "entryId" TEXT NOT NULL,

    CONSTRAINT "estoque_entrada_itens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "estoque_saidas" (
    "id" TEXT NOT NULL,
    "type" "StockExitType" NOT NULL DEFAULT 'VENDA',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdById" TEXT NOT NULL,

    CONSTRAINT "estoque_saidas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "estoque_saida_itens" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unitPrice" DECIMAL(10,2),
    "exitId" TEXT NOT NULL,

    CONSTRAINT "estoque_saida_itens_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "estoque_entradas_createdAt_idx" ON "estoque_entradas"("createdAt");

-- CreateIndex
CREATE INDEX "estoque_saidas_createdAt_idx" ON "estoque_saidas"("createdAt");

-- AddForeignKey
ALTER TABLE "estoque_entradas" ADD CONSTRAINT "estoque_entradas_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "estoque_entrada_itens" ADD CONSTRAINT "estoque_entrada_itens_productId_fkey" FOREIGN KEY ("productId") REFERENCES "produtos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "estoque_entrada_itens" ADD CONSTRAINT "estoque_entrada_itens_entryId_fkey" FOREIGN KEY ("entryId") REFERENCES "estoque_entradas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "estoque_saidas" ADD CONSTRAINT "estoque_saidas_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "estoque_saida_itens" ADD CONSTRAINT "estoque_saida_itens_productId_fkey" FOREIGN KEY ("productId") REFERENCES "produtos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "estoque_saida_itens" ADD CONSTRAINT "estoque_saida_itens_exitId_fkey" FOREIGN KEY ("exitId") REFERENCES "estoque_saidas"("id") ON DELETE CASCADE ON UPDATE CASCADE;
