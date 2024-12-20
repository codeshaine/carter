import prismaClient from "../../clients/prismaClient.js";
import redisClient from "../../clients/redisCleint.js";
import { ApiError, ApiResponse } from "../../services/index.js";

export async function handleGetNewProducts(req, res) {
  const limit = parseInt(req.query?.limit) || 10;
  const CACHE_KEY = "product:get_top_ten:" + limit;
  const CACHE_EXPIRATION = 60;
  const cachedProductData = await redisClient.get(CACHE_KEY);
  if (cachedProductData) {
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          "Top 10 new products",
          JSON.parse(cachedProductData)
        )
      );
  }
  const productData = await prismaClient.products.findMany({
    take: limit,
    orderBy: {
      created_at: "desc",
    },
  });
  redisClient.setex(CACHE_KEY, CACHE_EXPIRATION, JSON.stringify(productData));
  return res
    .status(200)
    .json(new ApiResponse(200, "Top 10 new products", productData));
}

export async function handleGetProductsWithFilter(req, res) {
  let productname = req.params.name;
  const lower_bound = parseFloat(req.query.lb) || 0;
  const upper_bound = parseFloat(req.query.ub) || Number.MAX_SAFE_INTEGER;
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 8;
  const category = req.query.cat;

  const CACHE_KEY =
    "product:product_with_filter:" +
    productname +
    ":lb_" +
    lower_bound +
    "_ub_" +
    upper_bound +
    "_limit_" +
    limit +
    "_cat_" +
    category +
    ":" +
    page;
  const CACHE_EXPIRATION = 60;

  let totalNumberOfProduct = 0;
  const cachedData = await redisClient.get(CACHE_KEY);
  if (cachedData) {
    return res
      .status(200)
      .json(new ApiResponse(200, "Got Products", JSON.parse(cachedData)));
  }
  if (productname == "all") {
    productname = "";
  }
  const whereCondition = {
    AND: [
      {
        price: {
          gte: lower_bound,
          lte: upper_bound,
        },
      },
      {
        OR: [
          {
            name: {
              contains: productname,
              mode: "insensitive",
            },
          },
          {
            sub_name: {
              contains: productname,
              mode: "insensitive",
            },
          },
        ],
      },
    ],
  };

  if (category) {
    whereCondition.AND.push({
      category: category,
    });
  }

  const temp = await prismaClient.products.count({
    where: whereCondition,
  });
  totalNumberOfProduct = temp;

  const prodctsList = await prismaClient.products.findMany({
    where: whereCondition,
    take: limit,
    skip: (page - 1) * limit, //! for pagination
    select: {
      product_id: true,
      name: true,
      price: true,
      category: true,
      review: {
        select: {
          star: true,
        },
      },
      slug: true,
      sub_name: true,
      product_images: true,
    },
  });

  redisClient.setex(
    CACHE_KEY,
    CACHE_EXPIRATION,
    JSON.stringify({
      pl: prodctsList,
      tp: totalNumberOfProduct,
    })
  );
  res.status(200).json(
    new ApiResponse(200, "Got Products", {
      pl: prodctsList,
      tp: totalNumberOfProduct,
    })
  );
}

export async function handleGetOneProduct(req, res) {
  const slugId = req.params.slugId;
  const CACHE_KEY = "product:single_product:" + slugId;
  const CACHE_EXPIRATION = 60;
  if (!slugId) {
    throw new ApiError(400, "provide valid id");
  }
  const cachedData = await redisClient.get(CACHE_KEY);
  if (cachedData) {
    return res
      .status(200)
      .json(
        new ApiResponse(200, "Proudct information", JSON.parse(cachedData))
      );
  }
  const product = await prismaClient.products.findFirst({
    where: {
      slug: slugId,
    },

    include: {
      product_images: {
        select: {
          image_id: true,
          image_url: true,
        },
      },
      review: {
        select: {
          review_id: true,
          review: true,
          star: true,
          user: {
            select: {
              name: true,
              email: true,
              profile_url: true,
            },
          },
        },
      },
      seller: {
        select: {
          seller_name: true,
          seller_logo_url: true,
          seller_address: true,
          seller_contact_number: true,
          seller_email: true,
          seller_bio: true,
        },
      },
    },
  });
  if (!product) {
    throw new ApiError(400, "No Product Found");
  }
  await redisClient.setex(CACHE_KEY, CACHE_EXPIRATION, JSON.stringify(product));
  return res
    .status(200)
    .json(new ApiResponse(200, "Proudct information", product));
}

export async function handleGetProductReviews(req, res) {
  const slug = req.params.id;
  const CACHE_KEY = "product:review:" + slugId;
  const CACHE_EXIPIRATION = 60;
  const cachedData = await redisClient.get(CACHE_KEY);
  if (cachedData) {
    return res
      .status(200)
      .json(new ApiResponse(200, "Product revies are", JSON.parse(cachedData)));
  }
  const reviews = await prismaClient.reviews.findMany({
    where: {
      product: {
        product_id: slug,
      },
    },
    select: {
      review: true,
      star: true,
      user: {
        select: {
          name: true,
          email: true,
          created_at: true,
        },
      },
    },
  });
  if (!reviews) {
    throw new ApiError(400, "No reviews availble");
  }
  redisClient.setex(CACHE_KEY, CACHE_EXIPIRATION, JSON.stringify(reviews));
  res.status(200).json(new ApiResponse(200, "Product reviews are", reviews));
}

export async function handleGetSellerDetails(req, res) {
  const slug = req.params.slugId;
  const CACHE_KEY = "product:seller_details:" + slug;
  const CACHE_EXIPIRATION = 60;
  if (!slug) {
    throw new ApiError(400, "Prvodide the product id");
  }
  const cachedData = await redisClient.get(CACHE_KEY);
  if (cachedData) {
    return res
      .status(200)
      .json(new ApiResponse(200, "seller detials", JSON.parse(cachedData)));
  }
  const sellerDetails = await prismaClient.products.findFirst({
    where: {
      slug,
    },
    select: {
      seller: true,
    },
  });
  if (!sellerDetails) {
    throw new ApiError(400, " product is invalid");
  }
  redisClient.setex(
    CACHE_KEY,
    CACHE_EXIPIRATION,
    JSON.stringify(sellerDetails)
  );
  res.status(200).json(new ApiResponse(200, "seller detials", sellerDetails));
}
