-- CreateTable
CREATE TABLE "Users" (
    "user_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "profile_url" TEXT,
    "isGoogleAuth" BOOLEAN NOT NULL DEFAULT false,
    "isBuyer" BOOLEAN NOT NULL DEFAULT true,
    "isSeller" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Sellers" (
    "seller_id" SERIAL NOT NULL,
    "seller_name" TEXT NOT NULL,
    "seller_logo_url" TEXT,
    "seller_address" TEXT NOT NULL,
    "seller_contact_number" VARCHAR(10) NOT NULL,
    "seller_url" TEXT,
    "seller_email" TEXT NOT NULL,
    "seller_bio" TEXT,
    "seller_description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Sellers_pkey" PRIMARY KEY ("seller_id")
);

-- CreateTable
CREATE TABLE "Products" (
    "product_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "sub_name" TEXT,
    "price" DOUBLE PRECISION NOT NULL,
    "description" TEXT NOT NULL,
    "image_url" TEXT,
    "viedo_url" TEXT,
    "seller_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Products_pkey" PRIMARY KEY ("product_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE INDEX "Users_email_idx" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Sellers_user_id_key" ON "Sellers"("user_id");

-- AddForeignKey
ALTER TABLE "Sellers" ADD CONSTRAINT "Sellers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_seller_id_fkey" FOREIGN KEY ("seller_id") REFERENCES "Sellers"("seller_id") ON DELETE RESTRICT ON UPDATE CASCADE;
