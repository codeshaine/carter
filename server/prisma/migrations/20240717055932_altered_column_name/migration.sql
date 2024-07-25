/*
  Warnings:

  - You are about to drop the column `viedo_url` on the `Products` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Products" DROP COLUMN "viedo_url",
ADD COLUMN     "video_url" TEXT;
