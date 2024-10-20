import prismaClient from "../../clients/prismaClient.js";
import {
  ApiError,
  ApiResponse,
  validateUpdateUserProfile,
  validateReviewBody,
  validateAddToCart,
  validatePurchaseBody,
} from "../../services/index.js";
import fs from "fs/promises";
import redisClient from "../../clients/redisCleint.js";
import { validateUserAddress } from "../../services/zod/userAddress.js";
import cloudinary from "../../services/cloudinary/config.js";
import { urlExtractor } from "../../services/cloudinary/urlExtractor.js";
import { Prisma } from "@prisma/client";

// ******************managin user profile********************************
export async function handleGetUserInfo(req, res) {
  const CACHE_KEY = "user:user_details:" + req.user.user_id;
  const CACHE_EXPIRATION = 60;
  const cachedData = await redisClient.get(CACHE_KEY);
  if (cachedData) {
    return res
      .status(200)
      .json(new ApiResponse(200, "user details", JSON.parse(cachedData)));
  }

  const userDetails = await prismaClient.users.findFirst({
    where: {
      user_id: req.user.user_id,
    },
    select: {
      name: true,
      email: true,
      profile_url: true,
      // addresses: true,
    },
  });
  if (!userDetails) {
    throw new ApiError(500, "User Not found");
  }

  redisClient.setex(CACHE_KEY, CACHE_EXPIRATION, JSON.stringify(userDetails));
  res.status(200).json(new ApiResponse(200, "User Details", userDetails));
}

export async function handleUpdateUser(req, res) {
  const validate = validateUpdateUserProfile(req.body);
  if (!validate.success) {
    throw new ApiError(400, "Invalid type of input", validate.error);
  }
  const CACHE_KEY = "user:user_details:" + req.user.user_id;

  //fetching previous user profile
  let previous = null;
  previous = await prismaClient.users.findFirst({
    where: {
      user_id: req.user.user_id,
    },
    select: {
      profile_url: true,
    },
  });

  if (req.file) {
    try {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "user_profiles", //  organize uploads into folders
      });

      req.body["profileUrl"] = result.secure_url;
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
      throw new ApiError(500, "Error uploading image", error);
    } finally {
      await fs.unlink(req.file.path);
    }
  }

  const fieldMapping = {
    name: "name",
    profileUrl: "profile_url",
  };

  const updatedFields = Object.keys(req.body).reduce((acc, key) => {
    if (fieldMapping[key]) {
      acc[fieldMapping[key]] = req.body[key];
    }
    return acc;
  }, {});

  const updatedUser = await prismaClient.users.update({
    where: {
      user_id: req.user.user_id,
    },
    data: updatedFields,
  });

  //deleting previous user profile
  if (updatedUser && previous.profile_url) {
    const publicId = urlExtractor(previous.profile_url);
    const result = await cloudinary.uploader.destroy(publicId);
    console.log(result);
  }

  await redisClient.del(CACHE_KEY);
  res
    .status(200)
    .json(new ApiResponse(200, "User updated successfully", updatedUser));
}

//*********************** handling user review ***********************

export async function handlePushReview(req, res, next) {
  const slugId = req.params.id;
  const CACHE_KEY_1 = "product:review:" + slugId;
  const CACHE_KEY_2 = "product:single_product:" + slugId;

  if (!slugId) {
    throw new ApiError(400, "product id is missing");
  }
  const reviewBody = req.body;
  const validate = validateReviewBody(req.body);
  if (!validate.success) {
    throw new ApiError(400, "Invalid type of input", validate.error);
  }
  try {
    const product = await prismaClient.products.findFirst({
      where: {
        slug: slugId,
      },
      select: {
        product_id: true,
        order: true,
        seller: {
          select: {
            user_id: true,
          },
        },
      },
    });
    if (!product) {
      throw new ApiError(400, "Product not found");
    }

    let purchaseed = false;
    product.order.map((order) => {
      if (
        order.user_id === req.user.user_id &&
        order.delivery_status === true
      ) {
        purchaseed = true;
      }
    });
    if (!purchaseed) {
      throw new ApiError(400, "Purchase the product in order to  review");
    }
    if (req.user.user_id === product.seller.user_id) {
      throw new ApiError(400, "You cant review your own product");
    }
    const newReview = await prismaClient.reviews.create({
      data: {
        review: reviewBody.review,
        star: reviewBody.star,
        product_id: product.product_id,
        user_id: req.user.user_id,
      },
    });

    await redisClient.del(CACHE_KEY_1);
    await redisClient.del(CACHE_KEY_2);
    res.status(201).json(new ApiResponse(201, "review created", newReview));
  } catch (err) {
    console.error(err);
    if (err.code === "P2002") {
      throw new ApiError(400, "Maxmimum limit of review reached", err);
    }
    next(err);
  }
}

export async function handleDeleteReview(req, res, next) {
  const slug = req.params.id;
  const CACHE_KEY_1 = "product:review:" + slug;
  const CACHE_KEY_2 = "product:single_product:" + slug;

  if (!slug) {
    throw new ApiError(400, "provide valid slug id");
  }
  try {
    const product = await prismaClient.products.findFirst({
      where: {
        slug: slug,
      },
    });
    if (!product) {
      throw new ApiError(400, "Invalid slug");
    }
    const review = await prismaClient.reviews.delete({
      where: {
        user_id_product_id: {
          user_id: req.user.user_id,
          product_id: product.product_id,
        },
      },
    });

    await redisClient.del(CACHE_KEY_1);
    await redisClient.del(CACHE_KEY_2);
    res.status(200).json(new ApiResponse(200, "Deleted successfully", review));
  } catch (err) {
    if (err.code === "P2025" && err.meta?.cause.includes("not exist")) {
      throw new ApiError(400, "unauthorized review modification", err);
    }
    next(err);
  }
}

//***********************hanlding user address************************

export async function handldeAddUserAddress(req, res) {
  const userAddress = req.body;
  const validate = validateUserAddress(userAddress);
  const CACHE_KEY = "user:user_address:" + req.user.user_id;
  if (!validate.success) {
    throw new ApiError(400, "Invalid Input", validate.error);
  }
  const newAddress = await prismaClient.userAddresses.create({
    data: {
      street: userAddress.street,
      village: userAddress.village,
      taluk: userAddress.taluk,
      district: userAddress.district,
      state: userAddress.state,
      contact_number: userAddress.contactNumber,
      pin_code: userAddress.pinCode,
      user_id: req.user.user_id,
    },
  });
  await redisClient.del(CACHE_KEY);
  res.status(201).json(new ApiResponse(201, "address created", newAddress));
}

export async function handleDeleteUserAddress(req, res, next) {
  const addressId = parseInt(req.params.addressId);
  const CACHE_KEY = "user:user_address:" + req.user.user_id;

  if (!addressId) {
    throw new ApiError(400, "Provide valid address id");
  }
  try {
    const deletedAddress = await prismaClient.userAddresses.delete({
      where: {
        user_address_id: addressId,
      },
    });
    await redisClient.del(CACHE_KEY);
    res
      .status(200)
      .json(new ApiResponse(200, "Deleted address", deletedAddress));
  } catch (err) {
    if (err.code === "P2025" && err.meta?.cause.includes("not exist")) {
      throw new ApiError(400, "No address exist", err);
    }
    next(err);
  }
}

export async function handleGetUserAddress(req, res) {
  const CACHE_KEY = "user:user_address:" + req.user.user_id;
  const CACHE_EXIPIRATION = 60;
  const cachedData = await redisClient.get(CACHE_KEY);
  if (cachedData) {
    return res
      .status(200)
      .json(new ApiResponse(200, "user addressess", JSON.parse(cachedData)));
  }
  const userAddress = await prismaClient.userAddresses.findMany({
    where: {
      user_id: req.user.user_id,
    },
  });
  redisClient.setex(CACHE_KEY, CACHE_EXIPIRATION, JSON.stringify(userAddress));
  res.status(200).json(new ApiResponse(200, "user addreses", userAddress));
}

//*********************handling buy and order now feature **************

export async function handlePurchaseProduct(req, res, next) {
  const CACHE_KEY = "user:ordered_items:" + req.user.user_id;
  const userAddress = req.body.userAddress;

  if (!userAddress) throw new ApiError(400, "Provide valid user address");
  const productList = req.body.productList;

  if (productList.length === 0) {
    throw new ApiError(400, "Cart is empty");
  }

  productList.forEach((item) => {
    const validate = validatePurchaseBody(item);
    if (!validate.success) {
      throw new ApiError(400, "invalid type of product body", validate.error);
    }
  });

  //TODO just check if the out of stock :raise error if needed put constraint

  let total = 0;
  try {
    await prismaClient.$transaction(async (tx) => {
      await Promise.all(
        productList.map(async (item) => {
          total += item.quantity * item.price;

          return tx.orders.create({
            data: {
              product_id: item.product_id,
              user_id: req.user.user_id,
              quantity: item.quantity,
              total: item.quantity * item.price,
              user_address_id: userAddress,
            },
          });
        })
      );
      await Promise.all(
        productList.map(async (item) => {
          return tx.products.update({
            where: {
              product_id: item.product_id,
            },
            data: {
              stock: {
                decrement: item.quantity,
              },
            },
          });
        })
      );
    });

    //deleting necessary cache
    productList.forEach(async (item) => {
      const CACHE_KEY_2 = "seller:seller_ordered_list:" + item.seller_id + ":*";
      const key = await redisClient.keys(CACHE_KEY_2);
      if (key.length > 0) await redisClient.del(key);
    });
    await redisClient.del(CACHE_KEY);

    res.status(200).json(new ApiResponse(200, "Items purchased", { total }));
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2025") {
        console.error("Transaction error: Record not found");
        throw new ApiError(400, "Record not found during transaction", err);
      } else {
        throw new ApiError(500, "Transaction failed", err);
      }
    }
    next(err);
  }
}

//********************cart items*********************************/
export async function handleAddToCart(req, res) {
  const productBody = req.body;
  const validate = validateAddToCart(productBody);
  if (!validate.success) {
    throw new ApiError(400, "Invalid input", validate.error);
  }

  const CACHE_KEY = "user:cart_items:" + req.user.user_id;

  const cart = await prismaClient.carts.upsert({
    where: {
      user_id: req.user.user_id,
    },
    update: {},
    create: {
      user_id: req.user.user_id,
    },
  });
  const product = await prismaClient.products.findFirst({
    where: {
      slug: productBody.slug,
    },
    include: {
      seller: {
        select: {
          user: {
            select: {
              user_id: true,
            },
          },
        },
      },
    },
  });
  if (!product) {
    throw new ApiError(400, "Bad Request No product exist");
  }
  if (product.seller.user.user_id === req.user.user_id) {
    throw new ApiError(400, "You cant add your own product to the cart");
  }
  const newCartItem = await prismaClient.cartItems.upsert({
    where: {
      product_id_cart_id: {
        cart_id: cart.cart_id,
        product_id: product.product_id,
      },
    },
    update: {
      quantity: {
        increment: productBody.quantity,
      },
    },
    create: {
      cart_id: cart.cart_id,
      product_id: product.product_id,
      quantity: productBody.quantity,
    },
  });

  await redisClient.del(CACHE_KEY);
  res
    .status(201)
    .json(new ApiResponse(201, "New item added to cart", newCartItem));
}

export async function handleDeleteFromCart(req, res, next) {
  const cartItemId = parseInt(req.params.itemId);
  const CACHE_KEY = "user:cart_items:" + req.user.user_id;

  try {
    await prismaClient.cartItems.delete({
      where: {
        cart_item_id: cartItemId,
      },
    });

    await redisClient.del(CACHE_KEY);
    res.status(200).json(new ApiResponse(200, "Deleted successfully"));
  } catch (err) {
    console.error(err);
    if (err.code === "P2025" && err.meta?.cause.includes("not exist")) {
      throw new ApiError(400, "No cart item exist", err);
    }
    next(err);
  }
}

export async function handleGetCartItems(req, res) {
  const userId = req.user.user_id;
  const CACHE_KEY = "user:cart_items:" + req.user.user_id;
  const CACHE_EXIPIRATION = 60;
  const cachedData = await redisClient.get(CACHE_KEY);
  if (cachedData) {
    return res
      .status(200)
      .json(new ApiResponse(200, "cart items", JSON.parse(cachedData)));
  }
  const cartItems = await prismaClient.carts.findFirst({
    where: {
      user_id: userId,
    },
    select: {
      items: {
        select: {
          quantity: true,
          product: {
            select: {
              product_id: true,
              name: true,
              seller_id: true,
              slug: true,
              product_images: true,
              price: true,
              category: true,
              description: true,
            },
          },
        },
      },
    },
  });

  redisClient.setex(
    CACHE_KEY,
    CACHE_EXIPIRATION,
    JSON.stringify(cartItems.items)
  );
  res.status(200).json(new ApiResponse(200, "cart items", cartItems.items));
}

//********************managing ordered items ***********************

export async function handleGetOrders(req, res) {
  const CACHE_KEY = "user:ordered_items:" + req.user.user_id;
  const CACHE_EXIPIRATION = 60;
  const cachedData = await redisClient.get(CACHE_KEY);
  if (cachedData) {
    return res
      .status(200)
      .json(new ApiResponse(200, "Ordered items", JSON.parse(cachedData)));
  }

  const ordersList = await prismaClient.orders.findMany({
    where: {
      user_id: req.user.user_id,
    },
    select: {
      order_id: true,
      product: {
        select: {
          slug: true,
          name: true,
          product_images: {
            select: {
              image_url: true,
            },
          },
        },
      },
      user_address_id: true,
      quantity: true,
      total: true,
      delivery_status: true,
      created_at: true,
      // product: true,
    },
  });
  redisClient.setex(CACHE_KEY, CACHE_EXIPIRATION, JSON.stringify(ordersList));
  res.status(200).json(new ApiResponse(200, "Ordered items", ordersList));
}

export async function handleDeleteOrder(req, res) {
  const orderId = parseInt(req.params.orderId);

  if (!orderId) {
    throw new ApiError(400, "Provide order id");
  }

  const order = await prismaClient.orders.findFirst({
    where: {
      order_id: orderId,
    },
    select: {
      quantity: true,
      product_id: true,
      product: {
        select: {
          seller_id: true,
        },
      },
    },
  });
  if (!order) {
    throw new ApiError(400, "provide valid order id");
  }
  await prismaClient.products.update({
    where: {
      product_id: order.product_id,
    },
    data: {
      stock: {
        increment: order.quantity,
      },
    },
  });
  const deltedOrder = await prismaClient.orders.delete({
    where: {
      order_id: orderId,
    },
  });

  //deleting redis cache for ordered items of seller
  const CACHE_KEY_1 = "user:ordered_items:" + req.user.user_id;
  const CACHE_KEY_2 =
    "seller:seller_ordered_list:" + order.product.seller_id + ":*";
  const key = await redisClient.keys(CACHE_KEY_2);
  if (key.length > 0) await redisClient.del(key);
  await redisClient.del(CACHE_KEY_1);

  res
    .status(200)
    .json(new ApiResponse(200, "Deleted Successfully", deltedOrder));
}

export async function checkUser(req, res) {
  const CACHE_KEY = "user:check_user_auth_with_seller:" + req.user.user_id;
  const CACHE_EXIPIRATION = 60;
  const cachedData = await redisClient.get(CACHE_KEY);
  if (cachedData) {
    return res
      .status(200)
      .json(new ApiResponse(200, "User found", JSON.parse(cachedData)));
  }
  const user = await prismaClient.users.findFirst({
    where: {
      user_id: req.user.user_id,
    },
    select: {
      name: true,
      email: true,
      isSeller: true,
      sellers: {
        select: {
          seller_name: true,
        },
      },
    },
  });
  if (!user) {
    throw new ApiError(400, "User not found", null);
  }
  redisClient.setex(CACHE_KEY, CACHE_EXIPIRATION, JSON.stringify(user));
  res.status(200).json(new ApiResponse(200, "User found", user));
}

//previous version api code
// export async function handleBuyNow(req, res) {
//   const buyNowBody = req.body;
//   const CACHE_KEY = "user:ordered_items:" + req.user.user_id;

//   const validate = validatePurchaseBody(buyNowBody);
//   if (!validate.success) {
//     throw new ApiError(400, "Invalid input", validate.error);
//   }
//   try {
//     const product = await prismaClient.products.findFirst({
//       where: {
//         slug: buyNowBody.slug,
//       },
//       select: {
//         product_id: true,
//         price: true,
//         stock: true,
//         seller_id: true,
//         seller: {
//           select: {
//             seller_email: true,
//             user: {
//               select: {
//                 user_id: true,
//               },
//             },
//           },
//         },
//       },
//     });

//     if (product.seller.user.user_id === req.user.user_id) {
//       throw new ApiError(400, "You cant buy your own product");
//     }
//     if (!product) {
//       throw new ApiError(400, "Product not found");
//     }
//     if (product.stock < buyNowBody.quantity) {
//       throw new ApiError(400, "Not enough stock");
//     }
//     const order = await prismaClient.orders.create({
//       data: {
//         user_id: req.user.user_id,
//         product_id: product.product_id,
//         quantity: buyNowBody.quantity,
//         total: product.price * buyNowBody.quantity,
//         user_address_id: buyNowBody.userAddress,
//       },
//     });
//     await prismaClient.products.update({
//       where: {
//         product_id: product.product_id,
//       },
//       data: {
//         stock: product.stock - buyNowBody.quantity,
//       },
//     });
//     //seller ordered list is deleted from cache
//     const CACHE_KEY_2 =
//       "seller:seller_ordered_list:" + product.seller_id + ":*";
//     const key = await redisClient.keys(CACHE_KEY_2);
//     if (key.length > 0) await redisClient.del(key);

//     await redisClient.del(CACHE_KEY);
//     res.status(201).json(new ApiResponse(201, "Order created", order));
//   } catch (err) {
//     console.error(err);
//     if (err instanceof ApiError) {
//       throw new ApiError(err.statuscode, err.message, err.stack);
//     }

//     console.error(err);
//     throw new ApiError(500, "Error occured while creating order", err.stack);
//   }
// }

// export async function handleOrderNow(req, res) {
//   const CACHE_KEY = "user:ordered_items:" + req.user.user_id;
//   const userAddress = req.body.userAddress;
//   if (!userAddress) {
//     throw new ApiError(400, "Provide valid user address");
//   }
//   try {
//     const productList = await prismaClient.cartItems.findMany({
//       where: {
//         cart: {
//           user_id: req.user.user_id,
//         },
//       },
//       include: {
//         product: true,
//       },
//     });

//     if (productList.length === 0) {
//       throw new ApiError(400, "Cart is empty");
//     }
//     let total = 0;
//     const orders = await Promise.all(
//       productList.map(async (item) => {
//         total += item.quantity * item.product.price;
//         //deleting cached ordered items
//         const CACHE_KEY_2 =
//           "seller:seller_ordered_list:" + item.product.seller_id + ":*";
//         const key = await redisClient.keys(CACHE_KEY_2);
//         if (key.length > 0) await redisClient.del(key);

//         return prismaClient.orders.create({
//           data: {
//             product_id: item.product_id,
//             user_id: req.user.user_id,
//             quantity: item.quantity,
//             total: item.quantity * item.product.price,
//             user_address_id: userAddress,
//           },
//         });
//       })
//     );
//     //TODO just check if the out of stock :raise error if needed
//     await Promise.all(
//       productList.map(async (item) => {
//         return prismaClient.products.update({
//           where: {
//             product_id: item.product_id,
//           },
//           data: {
//             stock: item.product.stock - item.quantity,
//           },
//         });
//       })
//     );

//     if (!orders) {
//       throw new ApiError(500, "Internal Server Error, Transaction failed");
//     }
//     await prismaClient.cartItems.deleteMany({
//       where: {
//         cart: {
//           user_id: req.user.user_id,
//         },
//       },
//     });
//     const resData = {
//       totalMoney: total,
//     };

//     //deleting redis cache
//     await redisClient.del(CACHE_KEY);

//     res
//       .status(200)
//       .json(new ApiResponse(200, "Items purchased,cart go emptied", resData));
//     console.log("order now route:", orders);
//   } catch (err) {
//     console.error(err);
//     if (err instanceof ApiError) {
//       throw new ApiError(err.statuscode, err.message, err.stack);
//     }
//     throw new ApiError(500, "Failed to make transaction,purchase failed", err);
//   }
// }
