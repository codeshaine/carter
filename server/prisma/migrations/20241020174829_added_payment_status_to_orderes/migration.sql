-- AlterTable
ALTER TABLE "Orders" ADD COLUMN     "payment_status" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "transaction_id" TEXT;
