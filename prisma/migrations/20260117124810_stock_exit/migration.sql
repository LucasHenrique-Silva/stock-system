/*
  Warnings:

  - Added the required column `saleType` to the `estoque_saida_itens` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalPrice` to the `estoque_saida_itens` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unitsRemoved` to the `estoque_saida_itens` table without a default value. This is not possible if the table is not empty.
  - Made the column `unitPrice` on table `estoque_saida_itens` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "SaleType" AS ENUM ('UNIT', 'BOX', 'BUNDLE', 'OTHER');

-- AlterTable
ALTER TABLE "estoque_saida_itens" ADD COLUMN     "saleType" "SaleType" NOT NULL,
ADD COLUMN     "totalPrice" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "unitsRemoved" INTEGER NOT NULL,
ALTER COLUMN "unitPrice" SET NOT NULL;
