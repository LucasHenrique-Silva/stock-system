/*
  Warnings:

  - You are about to drop the column `stockQuantity` on the `produtos` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "produtos" DROP COLUMN "stockQuantity",
ADD COLUMN     "boxInStock" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "bundleInStock" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "otherInStock" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "unitsInStock" INTEGER NOT NULL DEFAULT 0;
