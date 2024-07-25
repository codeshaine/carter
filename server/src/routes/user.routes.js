import express from "express";
import { ApiResponse, handler } from "../services/index.js";
import {
  signIn,
  signUp,
  signOut,
} from "../controllers/user/authenticate.controller.js";
import passport from "passport";
import { isAuthenticated } from "../middlewares/auth.js";
import {
  handldeAddUserAddress,
  handleAddToCart,
  handleBuyNow,
  handleDeleteOrder,
  handleDeleteReview,
  handleDeleteUserAddress,
  handleGetOrders,
  handleGetUserAddress,
  handleOrderNow,
  handlePushReview,
  handleUpdateUser,
} from "../controllers/user/user.controller.js";
import { upload } from "../services/multer/storage.js";
const userRouter = express.Router();

userRouter.post("upload", (req, res) => {});

userRouter.post("/signup", handler(signUp));
userRouter.post("/signin", handler(signIn));
userRouter.get("/logout", handler(signOut));
userRouter.post(
  "/profile/update",
  isAuthenticated,
  upload.single("image"),
  handler(handleUpdateUser)
);
userRouter.post(
  "/product/review/:id",
  isAuthenticated,
  handler(handlePushReview)
);
userRouter.delete(
  "/product/review/:id",
  isAuthenticated,
  handler(handleDeleteReview)
);
userRouter.post("/product/buy-now", isAuthenticated, handler(handleBuyNow));
userRouter.post(
  "/product/add-to-cart",
  isAuthenticated,
  handler(handleAddToCart)
);
userRouter.post("/product/order-now", isAuthenticated, handler(handleOrderNow));
userRouter.get(
  "/product/ordered-items",
  isAuthenticated,
  handler(handleGetOrders)
);

userRouter.delete(
  "/product/order/cancel/:orderId",
  isAuthenticated,
  handler(handleDeleteOrder)
);

userRouter.post(
  "/address/new",
  isAuthenticated,
  handler(handldeAddUserAddress)
);
userRouter.delete(
  "/address/:addressId",
  isAuthenticated,
  handler(handleDeleteUserAddress)
);
userRouter.get("/address", isAuthenticated, handler(handleGetUserAddress));
//google auth
userRouter.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

userRouter.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: process.env.CLIENT_URL + "/", //TODO have to make the route or chagne it
  })
);

// TODO use this route for to know if the login successful or not
//TODO reomve this
userRouter.get("/check", isAuthenticated, (req, res) => {
  console.log("for testing :", req.session.user);
  res.status(200).json(new ApiResponse(200, "ook", req.session.user));
});
export { userRouter };
