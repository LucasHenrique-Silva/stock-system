/*
  Warnings:

  - You are about to drop the column `description` on the `categorias` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `categorias` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "categorias" DROP COLUMN "description",
DROP COLUMN "isActive";
