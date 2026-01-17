/*
  Warnings:

  - You are about to drop the column `brand` on the `produtos` table. All the data in the column will be lost.
  - You are about to drop the column `expirationDate` on the `produtos` table. All the data in the column will be lost.
  - You are about to drop the column `unitCostPrice` on the `produtos` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "produto_validade_idx";

-- AlterTable
ALTER TABLE "produtos" DROP COLUMN "brand",
DROP COLUMN "expirationDate",
DROP COLUMN "unitCostPrice";
