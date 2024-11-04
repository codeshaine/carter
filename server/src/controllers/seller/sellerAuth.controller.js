import prismaClient from "../../clients/prismaClient.js";
import redisCleint from "../../clients/redisCleint.js";
import {
  ApiError,
  ApiResponse,
  validateSellerBody,
} from "../../services/index.js";

export async function handleSellerSignup(req, res) {
  const user = req.user;
  //TODO remove
  if (user.isSeller) {
    throw new ApiError(409, "Already a seller");
  }

  //TODO write the validation using zod
  const sellerData = req.body;
  const validate = validateSellerBody(sellerData);
  if (!validate.success) {
    throw new ApiError(400, "invalid seller data", validate.error);
  }

  try {
    await prismaClient.$transaction(async (tx) => {
      const seller = await tx.sellers.create({
        data: {
          seller_name: sellerData.seller_name,
          seller_address: sellerData.seller_address,
          seller_contact_number: sellerData.seller_contact_number,
          seller_email: sellerData.seller_email || user.email,
          user_id: user.user_id,
        },
      });

      if (!seller) {
        throw new ApiError(500, "seller not created");
      }
      await tx.users.update({
        where: {
          user_id: user.user_id,
        },
        data: {
          isSeller: true,
        },
      });
      //deleting the user auth cache
      const CACHE_KEY = "user:check_user_auth_with_seller:" + req.user.user_id;
      redisCleint.del(CACHE_KEY);

      return res
        .status(201)
        .json(new ApiResponse(201, "seller created", seller));
    });
  } catch (err) {
    console.log("Prisma errro in seller auth", err);
    throw new ApiError(500, err.message || "seller not created", err.stack);
  }
}
