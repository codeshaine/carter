import { json } from "express";
import prismaClient from "../../clients/prismaClient.js";
import redisClient from "../../clients/redisCleint.js";
import {
  ApiError,
  ApiResponse,
  makeSlug,
  validateProductBody,
  validateUpdateProductBody,
  validateUpdateSellerBody,
} from "../../services/index.js";
import cloudinary from "../../services/cloudinary/config.js";
import fs from "fs/promises";

export async function handleGetSellerDetails(req, res) {
  const CACHE_KEY = "seller_details" + req.seller.seller_id;
  const CACHE_EXPIRATION = 5;
  const cachedData = await redisClient.get(CACHE_KEY);
  if (cachedData) {
    return res
      .status(200)
      .json(new ApiResponse(200, "seller details", JSON.parse(cachedData)));
  }

  try {
    const sellerDetails = await prismaClient.sellers.findFirst({
      where: {
        seller_id: req.seller.seller_id,
      },
      select: {
        seller_name: true,
        seller_logo_url: true,
        seller_address: true,
        seller_contact_number: true,
        seller_url: true,
        seller_email: true,
        seller_bio: true,
        seller_description: true,
      },
    });
    if (!sellerDetails) {
      throw new ApiError(400, "No Seller Exist");
    }
    redisClient.setex(
      CACHE_KEY,
      CACHE_EXPIRATION,
      JSON.stringify(sellerDetails)
    );
    res.status(200).json(new ApiResponse(200, "success", sellerDetails));
  } catch (err) {
    console.error(err);
    if (err instanceof ApiError) {
      throw new ApiError(err.statuscode, err.message, err);
    }
    throw new ApiError(500, "Server Error while fetching details", err);
  }
}

export async function handleUpdateSellerProfile(req, res) {
  const sellerBody = req.body;
  const validate = validateUpdateSellerBody(sellerBody);
  if (!validate.success) {
    throw new ApiError(400, "Invalid type of input", validate.error);
  }
  //removig the file from the seller body
  delete sellerBody["image"];

  //TODO Optimize
  if (req.file) {
    try {
      //TODO have to debug the issue
      // if (sellerBody.seller_logo_url) {
      //   const res = await cloudinary.uploader.destroy(
      //     sellerBody.seller_logo_url
      //   );
      //   console.log(res);
      // }
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "seller_profiles", //  organize uploads into folders
      });

      req.body["seller_logo_url"] = result.secure_url;
      await fs.unlink(req.file.path);
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
      //if failed to update then deleting the image
      try {
        await fs.unlink(req.file.path);
      } catch (unlinkError) {
        console.error("Error deleting file:", unlinkError);
      }
      throw new ApiError(500, "Error uploading image", error);
    }
  }

  // const fieldMapping = {
  //   name: "seller_name",
  //   logoUrl: "seller_logo_url",
  //   sellerAddress: "seller_address",
  //   sellerUrl: "seller_url",
  //   contactNumber: "seller_contact_number",
  //   sellerEmail: "seller_email",
  //   bio: "seller_bio",
  //   description: "seller_description",
  // };
  // const updateFileds = Object.keys(sellerBody).reduce((acc, key) => {
  //   if (fieldMapping[key]) {
  //     acc[fieldMapping[key]] = sellerBody[key];
  //   }
  //   return acc;
  // }, {});

  try {
    const updatedSeller = await prismaClient.sellers.update({
      where: {
        seller_id: req.seller.seller_id,
      },
      data: sellerBody,
    });
    res
      .status(200)
      .json(
        new ApiResponse(200, "seller updated successrfully", updatedSeller)
      );
  } catch (err) {
    console.error(err);
    if (err.code === "P2025" && err.meta?.cause?.includes("not found")) {
      throw new ApiError(400, "The seller does not exist", err);
    }
    throw new ApiError(
      500,
      "Error occured during updating the user",
      err.stack
    );
  }
}

export async function handleUploadNewProduct(req, res) {
  req.body.price = Number(req.body.price);
  req.body.stock = Number(req.body.stock);
  const productData = req.body;
  const validate = validateProductBody(productData);
  if (!validate.success) {
    throw new ApiError(400, "Invalid product details", validate.error);
  }

  const slugName = makeSlug(productData.name);
  try {
    const newProduct = await prismaClient.products.create({
      data: {
        name: productData.name,
        sub_name: productData.subName,
        slug: slugName,
        price: productData.price,
        description: productData.description,
        category: productData.category,
        stock: productData.stock,
        seller_id: req.seller.seller_id,
      },
    });
    let uploadedImage = null;
    if (req.file) {
      let result = await cloudinary.uploader.upload(req.file.path, {
        folder: "products",
      });
      uploadedImage = result.secure_url;
    }

    if (uploadedImage) {
      const newLink = await prismaClient.productImages.create({
        data: {
          image_url: uploadedImage,
          product_id: newProduct.product_id,
        },
      });

      newProduct["images"] = newLink;
    }

    return res
      .status(201)
      .json(new ApiResponse(201, "Product createrd", newProduct));
  } catch (err) {
    console.error("Error occured during creating new product :", err);

    if (err.code === "P2002" && err.meta.target.includes("slug")) {
      throw new ApiError(
        400,
        "Please provide unique product name,The name already taken",
        err.stack
      );
    }
    throw new ApiError(
      400,
      "Error occured while creating new product",
      err.stack
    );
  } finally {
    try {
      if (req.file) {
        await fs.unlink(req.file.path);
      }
    } catch (unlinkError) {
      console.error("Error deleting file inside the error:", unlinkError);
      throw new ApiError(500, "Error occured while deleting image");
    }
  }
}

//later
export async function handleUpdateProduct(req, res) {
  const productId = req.params.id;
  if (!productId) {
    throw new ApiError(400, "Provide the valid product id");
  }
  const productBody = req.body;
  const validate = validateUpdateProductBody(productBody);
  if (!validate.success) {
    throw new ApiError(400, "Invalid type of input", validate.error);
  }

  const fieldMapping = {
    name: "name",
    subName: "sub_name",
    price: "price",
    description: "description",
    category: "category",
  };
  const updateFileds = Object.keys(productBody).reduce((acc, key) => {
    if (fieldMapping[key]) {
      acc[fieldMapping[key]] = productBody[key];
    }
    return acc;
  }, {});
  if (updateFileds["name"]) {
    updateFileds["slug"] = makeSlug(updateFileds.name);
  }
  try {
    const updatedProduct = await prismaClient.products.update({
      where: {
        slug: productId,
      },
      data: updateFileds,
    });
    res
      .status(200)
      .json(
        new ApiResponse(200, "Product upodated successrfully", updatedProduct)
      );
  } catch (err) {
    console.error(err);
    if (err.code === "P2025" && err.meta?.cause?.includes("not found")) {
      throw new ApiError(400, "The product does not exist", err);
    }
    throw new ApiError(
      500,
      "Error occured during updating the product",
      err.stack
    );
  }
}

export async function handleDeleteProduct(req, res) {
  const slugId = req.params.id;
  if (!slugId) {
    throw new ApiError("Provide valid product Id");
  }

  try {
    const product = await prismaClient.products.findFirst({
      where: {
        slug: slugId,
      },
      select: {
        product_id: true,
      },
    });
    if (!product) {
      throw new ApiError(400, "Product not found");
    }
    await prismaClient.productImages.deleteMany({
      where: {
        product_id: product.product_id,
      },
    });
    await prismaClient.reviews.deleteMany({
      where: {
        product_id: product.product_id,
      },
    });
    const data = await prismaClient.products.delete({
      where: {
        slug: slugId,
      },
    });
    res
      .status(200)
      .json(new ApiResponse(200, "product deleted successfully", data));
  } catch (err) {
    console.error(err);
    if (err.code == "P2025") {
      throw new ApiError(400, "product does not exist", err.stack);
    }
    if (err instanceof ApiError) {
      throw new ApiError(err.statuscode, err.message, err.stack);
    }
    throw new ApiError(500, "Error ocured while delteing product", err.stack);
  }
}

export async function handleGetAllSellerProducts(req, res) {
  const sellerId = parseInt(req.seller.seller_id);
  //just incase
  if (!sellerId) {
    throw new ApiError(403, "invalid seller id");
  }
  //TODO reduce the cache time
  const CACHE_KEY = "all_seller_product";
  const CACHE_EXPIRATION = 5;
  const cachedProductData = await redisClient.get(CACHE_KEY);
  if (cachedProductData) {
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          "all the product details",
          JSON.parse(cachedProductData)
        )
      );
  }
  try {
    const productData = await prismaClient.products.findMany({
      where: {
        seller_id: sellerId,
      },
      select: {
        product_id: true,
        name: true,
        slug: true,
        sub_name: true,
        price: true,
        product_images: {
          select: {
            image_url: true,
          },
        },
      },
    });
    if (productData.length === 0) {
      throw new ApiError(400, "No product found for the seller");
    }

    redisClient.setex(CACHE_KEY, CACHE_EXPIRATION, JSON.stringify(productData));
    return res
      .status(200)
      .json(new ApiResponse(200, "Product details of seller", productData));
  } catch (err) {
    console.error(err);
    if (err instanceof ApiError) {
      throw new ApiError(err.statuscode, err.message, err);
    }
    throw new ApiError(
      500,
      "Error occured while retrieving the product details",
      err.stack
    );
  }
}

export async function handleOrderedSellerItems(req, res) {
  const CACHE_KEY = "seller_ordered_list_" + req.seller.seller_id;
  const CACHE_EXPIRATION = 60;
  const cachedData = await redisClient.get(CACHE_KEY);
  if (cachedData) {
    return res
      .status(200)
      .json(
        new ApiResponse(200, "Got the ordered products", JSON.parse(cachedData))
      );
  }

  try {
    const orderedItems = await prismaClient.orders.findMany({
      where: {
        product: {
          seller_id: req.seller.seller_id,
        },
      },
      include: {
        product: {
          select: {
            name: true,
            slug: true,
            sub_name: true,
            price: true,
            product_images: true,
          },
        },
        user: {
          select: {
            name: true,
            email: true,
            profile_url: true,
          },
        },
        address: true,
      },
    });

    redisClient.setex(
      CACHE_KEY,
      CACHE_EXPIRATION,
      JSON.stringify(orderedItems)
    );

    res
      .status(200)
      .json(new ApiResponse(200, "Got the ordered products", orderedItems));
  } catch (err) {
    console.error(err);
    if (err instanceof ApiError) {
      throw new ApiError(err.statuscode, err.message, err);
    }
    throw new ApiError(
      500,
      "Error occrured while retrieving the seller ordered products",
      err
    );
  }
}

export async function handleDeliveryDone(req, res) {
  const orderId = parseInt(req.params.orderId);
  if (!orderId) {
    throw new ApiError(400, "Invalid order id");
  }
  try {
    const orderedItem = await prismaClient.orders.update({
      where: {
        order_id: orderId,
      },
      data: {
        delivery_status: true,
      },
    });
    res
      .status(200)
      .json(new ApiResponse(200, "Done with delivery", orderedItem));
  } catch (err) {
    console.error(err);
    if ((err.code = "P2025" && err.meta.cause.includes("not found"))) {
      throw new ApiError(400, "Order not exist", err);
    }
    throw new ApiError(500, "Error occured during transaction", err);
  }
}
