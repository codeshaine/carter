import prismaClient from "../clients/prismaClient.js";
import { ApiResponse } from "../services/index.js";

export async function isSeller(req, res, next) {
  //TODO remove this
  if (!req.user?.isSeller) {
    return res.status(403).json(new ApiResponse(403, "unauthorized seller"));
  }

  const seller = await prismaClient.sellers.findFirst({
    where: {
      user_id: req.user.user_id,
    },
  });

  if (!seller) {
    return res.status(403).json(new ApiResponse(403, "unauthorized seller"));
  }
  req.seller = seller;
  next();
}
