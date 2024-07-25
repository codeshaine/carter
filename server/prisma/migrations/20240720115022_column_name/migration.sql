/*
  Warnings:

  - You are about to drop the column `quanity` on the `Orders` table. All the data in the column will be lost.
  - Added the required column `quantity` to the `Orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Orders" DROP COLUMN "quanity",
ADD COLUMN     "quantity" INTEGER NOT NULL;
