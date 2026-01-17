/*
  Warnings:

  - You are about to drop the column `boxInStock` on the `produtos` table. All the data in the column will be lost.
  - You are about to drop the column `bundleInStock` on the `produtos` table. All the data in the column will be lost.
  - You are about to drop the column `minboxInStock` on the `produtos` table. All the data in the column will be lost.
  - You are about to drop the column `minbundleInStock` on the `produtos` table. All the data in the column will be lost.
  - You are about to drop the column `minotherInStock` on the `produtos` table. All the data in the column will be lost.
  - You are about to drop the column `otherInStock` on the `produtos` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "produtos" DROP COLUMN "boxInStock",
DROP COLUMN "bundleInStock",
DROP COLUMN "minboxInStock",
DROP COLUMN "minbundleInStock",
DROP COLUMN "minotherInStock",
DROP COLUMN "otherInStock";
