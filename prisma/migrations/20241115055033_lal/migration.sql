/*
  Warnings:

  - The `status` column on the `Doacao` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `Pagamento` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "DoacaoStatus" AS ENUM ('pendente', 'confirmada', 'cancelada');

-- AlterTable
ALTER TABLE "Doacao" DROP COLUMN "status",
ADD COLUMN     "status" "DoacaoStatus" NOT NULL DEFAULT 'pendente';

-- AlterTable
ALTER TABLE "Pagamento" DROP COLUMN "status",
ADD COLUMN     "status" "DoacaoStatus" NOT NULL DEFAULT 'pendente';
