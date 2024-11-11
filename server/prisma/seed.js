import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  const ifuserExit = await prisma.users.findFirst({
    where: {
      name: "userX",
    },
    select: {
      user_id: true,
    },
  });
  if (ifuserExit) return;
  const user = await prisma.users.create({
    data: {
      name: "userX",
      email: "default@gmail.com",
      password: "$2b$10$py8oS5tWhc8aOdtyAIe73.iTplIb9tP6n3r.6nu5qNKik3T10elm2", // 123456
      isGoogleAuth: false,
      isBuyer: true,
      isSeller: true,
    },
  });

  const seller = await prisma.sellers.create({
    data: {
      seller_name: "sellerX",
      seller_logo_url: "https://example.com/logo.jpg",
      seller_address: "1234 Elm St",
      seller_contact_number: "1234567890",
      seller_url: "www.sellerx.com",
      seller_email: "default.seller@example.com",
      user_id: user.user_id,
    },
  });
  const products = [
    {
      name: "Wireless Noise-Cancelling Headphones",
      sub_name: "Bluetooth Over-Ear Headset",
      price: 16499,
      description:
        "Experience superior sound quality with these wireless noise-cancelling headphones. Designed for comfort and long listening sessions, these headphones offer up to 30 hours of battery life, deep bass, and clear high-frequency response. The built-in microphone ensures crystal-clear calls, making them perfect for both work and leisure.",
      category: "Electronics",
      stock: 150,
      seller_id: seller.seller_id,
    },
    {
      name: "Casual Denim Jacket",
      sub_name: "Classic Blue Jean Jacket",
      price: 4099,
      description:
        "This classic blue denim jacket is perfect for any casual occasion, featuring durable fabric and a timeless design. The relaxed fit and buttoned cuffs add a touch of vintage charm, while the versatile style pairs effortlessly with your favorite outfits. Ideal for layering in different weather conditions.",
      category: "Clothes",
      stock: 85,
      seller_id: seller.seller_id,
    },
    {
      name: "Ergonomic Office Chair",
      sub_name: "High-Back Mesh Chair with Lumbar Support",
      price: 12499,
      description:
        "Upgrade your workspace with this ergonomic office chair designed for comfort and support. With adjustable armrests, a breathable mesh back, and a high-back design that offers ample lumbar support, this chair helps reduce back strain and promotes good posture during long hours of work.",
      category: "Furniture",
      stock: 50,
      seller_id: seller.seller_id,
    },
    {
      name: "Modern Desk Lamp",
      sub_name: "LED Lamp with Adjustable Brightness",
      price: 2499,
      description:
        "Illuminate your workspace with this modern LED desk lamp, featuring adjustable brightness levels and touch-sensitive controls. With a sleek and compact design, it fits seamlessly into any home or office setup. The energy-efficient LED provides bright, glare-free light, perfect for reading or working.",
      category: "Accessories",
      stock: 120,
      seller_id: seller.seller_id,
    },
    {
      name: "Smartwatch Pro",
      sub_name: "Fitness and Health Tracker",
      price: 8999,
      description:
        "This smartwatch is your ultimate companion for fitness and productivity. Equipped with a heart rate monitor, sleep tracking, step counter, and a variety of workout modes, it ensures that you stay on top of your health. The device also features message notifications and music control for added convenience.",
      category: "Electronics",
      stock: 200,
      seller_id: seller.seller_id,
    },
    {
      name: "Plush Teddy Bear",
      sub_name: "18-Inch Soft Stuffed Animal",
      price: 1699,
      description:
        "This adorable 18-inch plush teddy bear is perfect for kids and collectors alike. Crafted from high-quality, ultra-soft fabric, it is designed for endless cuddling. Whether as a gift or a comforting companion, this bear is sure to bring smiles and warmth to anyone who holds it.",
      category: "Toys",
      stock: 300,
      seller_id: seller.seller_id,
    },
    {
      name: "Leather Wallet",
      sub_name: "Genuine Leather with RFID Blocking",
      price: 2899,
      description:
        "Keep your essentials safe and stylish with this genuine leather wallet. Designed with RFID blocking technology, it ensures your cards are protected from electronic theft. The wallet features multiple card slots, a bill compartment, and a coin pocket for practical organization.",
      category: "Accessories",
      stock: 180,
      seller_id: seller.seller_id,
    },
    {
      name: "Bestselling Mystery Novel",
      sub_name: '"The Hidden Truth"',
      price: 899,
      description:
        'Dive into the thrilling pages of "The Hidden Truth," a bestselling mystery novel that keeps you at the edge of your seat until the final revelation. Richly written with unexpected twists, this book is a must-read for any fan of mystery and suspense.',
      category: "Books",
      stock: 500,
      seller_id: seller.seller_id,
    },
    {
      name: "Kids’ Wooden Building Blocks",
      sub_name: "Educational Playset for Kids",
      price: 2199,
      description:
        "Encourage creativity and early learning with this 50-piece wooden building block set. The pieces come in various shapes and vibrant colors, providing endless possibilities for building. Safe and non-toxic, these blocks help children develop problem-solving skills and fine motor coordination.",
      category: "Toys",
      stock: 150,
      seller_id: seller.seller_id,
    },
    {
      name: "Wool Knit Scarf",
      sub_name: "Handwoven Winter Scarf",
      price: 1599,
      description:
        "Stay warm and stylish during the winter months with this handwoven wool scarf. Made from soft, high-quality wool, it provides excellent warmth without sacrificing style. Available in a variety of colors, this scarf is perfect for any wardrobe.",
      category: "Clothes",
      stock: 250,
      seller_id: seller.seller_id,
    },
  ];

  // Array of corresponding image URLs
  const imageUrls = [
    "https://res.cloudinary.com/dksaivxtl/image/upload/v1730719303/products/osughxcohrmn23lphvft.jpg", // Image ID 1
    "https://res.cloudinary.com/dksaivxtl/image/upload/v1730719365/products/k2scdeqcgftgbuhgceup.jpg", // Image ID 2
    "https://res.cloudinary.com/dksaivxtl/image/upload/v1730719389/products/jxrthhzbleg4disdhsqu.jpg", // Image ID 3
    "https://res.cloudinary.com/dksaivxtl/image/upload/v1730719404/products/s84ivyg6eczk0db8oqsl.jpg", // Image ID 4
    "https://res.cloudinary.com/dksaivxtl/image/upload/v1730719420/products/ygso8i5yfgvnvmm1icfn.jpg", // Image ID 5
    "https://res.cloudinary.com/dksaivxtl/image/upload/v1730719432/products/oj7sixuo4pikak0zeqhy.jpg", // Image ID 6
    "https://res.cloudinary.com/dksaivxtl/image/upload/v1730719441/products/czwfazsomp5gykvi2nhh.jpg", // Image ID 7
    "https://res.cloudinary.com/dksaivxtl/image/upload/v1730719452/products/r5ztecmkocqzvmj1taiq.jpg", // Image ID 8
    "https://res.cloudinary.com/dksaivxtl/image/upload/v1730719461/products/orbknzdk17a1bbjkbilc.jpg", // Image ID 9
    "https://res.cloudinary.com/dksaivxtl/image/upload/v1730719472/products/dxkb45id8pwutmvm3mwo.jpg", // Image ID 10
  ];

  for (let i = 0; i < products.length; i++) {
    const product = products[i];

    const createdProduct = await prisma.products.create({
      data: {
        ...product,
        slug: product.name.toLowerCase().replace(/ /g, "-"),
      },
    });

    await prisma.productImages.create({
      data: {
        image_url: imageUrls[i],
        product_id: createdProduct.product_id,
      },
    });
  }

  console.log("Seeding completed.");
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
