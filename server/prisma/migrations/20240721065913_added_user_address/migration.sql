/*
  Warnings:

  - Added the required column `user_address_id` to the `Orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Orders" ADD COLUMN     "user_address_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "UserAddresses" (
    "user_address_id" SERIAL NOT NULL,
    "street" TEXT NOT NULL,
    "village" TEXT NOT NULL,
    "taluk" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "contact_number" INTEGER NOT NULL,
    "pin_code" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "UserAddresses_pkey" PRIMARY KEY ("user_address_id")
);

-- AddForeignKey
ALTER TABLE "UserAddresses" ADD CONSTRAINT "UserAddresses_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_user_address_id_fkey" FOREIGN KEY ("user_address_id") REFERENCES "UserAddresses"("user_address_id") ON DELETE RESTRICT ON UPDATE CASCADE;
