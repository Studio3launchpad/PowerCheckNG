/*
  Warnings:

  - The values [REPORTED,CONFIRMED,RESTORED,CANCELLED] on the enum `OutageStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `invoiceId` on the `UnitPurchase` table. All the data in the column will be lost.
  - You are about to drop the `Invoice` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "OutageStatus_new" AS ENUM ('POWER_OFF', 'POWER_ON', 'NOT_SURE');
ALTER TABLE "public"."OutageReport" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "OutageReport" ALTER COLUMN "status" TYPE "OutageStatus_new" USING ("status"::text::"OutageStatus_new");
ALTER TYPE "OutageStatus" RENAME TO "OutageStatus_old";
ALTER TYPE "OutageStatus_new" RENAME TO "OutageStatus";
DROP TYPE "public"."OutageStatus_old";
ALTER TABLE "OutageReport" ALTER COLUMN "status" SET DEFAULT 'NOT_SURE';
COMMIT;

-- DropForeignKey
ALTER TABLE "Invoice" DROP CONSTRAINT "Invoice_userId_fkey";

-- DropForeignKey
ALTER TABLE "UnitPurchase" DROP CONSTRAINT "UnitPurchase_invoiceId_fkey";

-- DropIndex
DROP INDEX "UnitPurchase_invoiceId_key";

-- AlterTable
ALTER TABLE "OutageReport" ALTER COLUMN "status" SET DEFAULT 'NOT_SURE';

-- AlterTable
ALTER TABLE "UnitPurchase" DROP COLUMN "invoiceId";

-- DropTable
DROP TABLE "Invoice";

-- DropEnum
DROP TYPE "PaymentStatus";
