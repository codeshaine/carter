/*
  Warnings:

  - You are about to drop the column `image_url` on the `Products` table. All the data in the column will be lost.
  - You are about to drop the column `video_url` on the `Products` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Products" DROP COLUMN "image_url",
DROP COLUMN "video_url";

-- CreateTable
CREATE TABLE "ProductImages" (
    "image_id" SERIAL NOT NULL,
    "image_url" TEXT NOT NULL,
    "product_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductImages_pkey" PRIMARY KEY ("image_id")
);

-- AddForeignKey
ALTER TABLE "ProductImages" ADD CONSTRAINT "ProductImages_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Products"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;
