/*
  Warnings:

  - You are about to drop the column `costPrice` on the `produtos` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `produtos` table. All the data in the column will be lost.
  - Added the required column `unitCostPrice` to the `produtos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unitPrice` to the `produtos` table without a default value. This is not possible if the table is not empty.

*/


-- AlterTable
ALTER TABLE "produtos" RENAME COLUMN "price" TO "unitPrice";
ALTER TABLE "produtos" RENAME COLUMN "costPrice" TO "unitCostPrice";

ALTER TABLE "produtos"
ADD COLUMN "unitsPerPackage" INTEGER NOT NULL DEFAULT 1;
