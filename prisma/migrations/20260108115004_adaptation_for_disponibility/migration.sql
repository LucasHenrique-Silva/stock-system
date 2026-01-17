/*
  Warnings:

  - You are about to drop the column `storageType` on the `produtos` table. All the data in the column will be lost.
  - You are about to drop the column `unitsPerPackage` on the `produtos` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "produtos" DROP COLUMN "storageType",
DROP COLUMN "unitsPerPackage",
ADD COLUMN     "availableBox" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "availableBundle" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "availableOther" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "availableUnit" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "unitsPerBox" INTEGER,
ADD COLUMN     "unitsPerBundle" INTEGER,
ADD COLUMN     "unitsPerOther" INTEGER;

-- DropEnum
DROP TYPE "StorageType";
