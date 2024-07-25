import prismaClient from "../clients/prismaClient.js";
import { ApiResponse } from "../services/index.js";

export async function isAuthenticated(req, res, next) {
  if (!req.session.user) {
    return res.status(401).json(new ApiResponse(401, "unauthorized"));
  }

  try {
    const userData = await prismaClient.users.findFirst({
      where: {
        user_id: req.session.user,
      },
    });
    delete userData["password"];
    req.user = userData;

    return next();
  } catch (err) {
    console.error(
      "Error occured while retrieving the user details in middleware:",
      err
    );
    return res.status(401).json(new ApiResponse(401, "unauthorized"));
  }
}
