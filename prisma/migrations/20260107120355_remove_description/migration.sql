/*
  Warnings:

  - The values [GRANEL] on the enum `StorageType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `description` on the `produtos` table. All the data in the column will be lost.
  - You are about to drop the column `unit` on the `produtos` table. All the data in the column will be lost.
  - Changed the type of `type` on the `produtos` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "StorageType_new" AS ENUM ('UNIDADE', 'CAIXA', 'FARDOS');
ALTER TABLE "produtos" ALTER COLUMN "storageType" TYPE "StorageType_new" USING ("storageType"::text::"StorageType_new");
ALTER TYPE "StorageType" RENAME TO "StorageType_old";
ALTER TYPE "StorageType_new" RENAME TO "StorageType";
DROP TYPE "public"."StorageType_old";
COMMIT;

-- AlterTable
ALTER TABLE "produtos" DROP COLUMN "description",
DROP COLUMN "unit",
DROP COLUMN "type",
ADD COLUMN     "type" TEXT NOT NULL,
ALTER COLUMN "volume" SET DATA TYPE TEXT;

-- DropEnum
DROP TYPE "ProductType";

-- DropEnum
DROP TYPE "VolumeUnit";
