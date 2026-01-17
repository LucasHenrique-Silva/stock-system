/*
  Warnings:

  - You are about to drop the column `barcode` on the `produtos` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `produtos` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "produto_codigo_barras_idx";

-- DropIndex
DROP INDEX "produtos_barcode_key";

-- AlterTable
ALTER TABLE "produtos" DROP COLUMN "barcode",
DROP COLUMN "type";
