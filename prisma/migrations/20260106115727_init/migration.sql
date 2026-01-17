-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMINISTRADOR', 'GERENTE', 'FUNCIONARIO');

-- CreateEnum
CREATE TYPE "ProductType" AS ENUM ('CERVEJA', 'VINHO', 'WHISKY', 'VODKA', 'RUM', 'GIN', 'TEQUILA', 'ESPUMANTE', 'LICOR', 'ENERGETICO', 'REFRIGERANTE', 'SUCO', 'AGUA', 'OUTRO');

-- CreateEnum
CREATE TYPE "StorageType" AS ENUM ('UNIDADE', 'CAIXA', 'FARDOS', 'GRANEL');

-- CreateEnum
CREATE TYPE "VolumeUnit" AS ENUM ('ML', 'L');

-- CreateTable
CREATE TABLE "usuarios" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'FUNCIONARIO',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "produtos" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "brand" TEXT NOT NULL,
    "type" "ProductType" NOT NULL,
    "storageType" "StorageType" NOT NULL,
    "barcode" TEXT,
    "volume" DOUBLE PRECISION NOT NULL,
    "unit" "VolumeUnit" NOT NULL DEFAULT 'L',
    "price" DECIMAL(10,2) NOT NULL,
    "costPrice" DECIMAL(10,2) NOT NULL,
    "stockQuantity" INTEGER NOT NULL DEFAULT 0,
    "expirationDate" TIMESTAMP(3),
    "lotNumber" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "categoryId" TEXT,
    "createdById" TEXT NOT NULL,
    "updatedById" TEXT,

    CONSTRAINT "produtos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categorias" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "categorias_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- CreateIndex
CREATE UNIQUE INDEX "produtos_barcode_key" ON "produtos"("barcode");

-- CreateIndex
CREATE INDEX "produto_codigo_barras_idx" ON "produtos"("barcode");

-- CreateIndex
CREATE INDEX "produto_validade_idx" ON "produtos"("expirationDate");

-- CreateIndex
CREATE UNIQUE INDEX "categorias_name_key" ON "categorias"("name");

-- AddForeignKey
ALTER TABLE "produtos" ADD CONSTRAINT "produtos_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categorias"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "produtos" ADD CONSTRAINT "produtos_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "produtos" ADD CONSTRAINT "produtos_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "usuarios"("id") ON DELETE SET NULL ON UPDATE CASCADE;
