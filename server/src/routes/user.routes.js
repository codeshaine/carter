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
  checkUser,
  handldeAddUserAddress,
  handleAddToCart,
  handleBuyNow,
  handleDeleteFromCart,
  handleDeleteOrder,
  handleDeleteReview,
  handleDeleteUserAddress,
  handleGetCartItems,
  handleGetOrders,
  handleGetUserAddress,
  handleGetUserInfo,
  handleOrderNow,
  handlePushReview,
  handleUpdateUser,
} from "../controllers/user/user.controller.js";
import { upload } from "../services/multer/storage.js";
const userRouter = express.Router();

userRouter.get("/", isAuthenticated, handler(handleGetUserInfo));
userRouter.post("/signup", handler(signUp));
userRouter.post("/signin", handler(signIn));
userRouter.post("/logout", handler(signOut));

//**********manage profile********************
userRouter.post(
  "/profile/update",
  isAuthenticated,
  upload.single("image"),
  handler(handleUpdateUser)
);

//**********handling review********************
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

//************handling product pruchase ****************
userRouter.post("/product/buy-now", isAuthenticated, handler(handleBuyNow));

userRouter.post(
  "/product/add-to-cart",
  isAuthenticated,
  handler(handleAddToCart)
);
userRouter.get(
  "/product/my-cart",
  isAuthenticated,
  handler(handleGetCartItems)
);

userRouter.delete(
  "/product/my-cart/:itemId",
  isAuthenticated,
  handler(handleDeleteFromCart)
);

userRouter.post(
  "/product/cart/order-now",
  isAuthenticated,
  handler(handleOrderNow)
);

userRouter.get(
  "/product/ordered-items",
  isAuthenticated,
  handler(handleGetOrders)
);

//!what is this route
// userRouter.get(
//   "/product/ordered-items",
//   isAuthenticated,
//   handler(handleGetOrderedDetails)
// );

userRouter.delete(
  "/product/order/cancel/:orderId",
  isAuthenticated,
  handler(handleDeleteOrder)
);

//*************managing user addresses ***************
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

//*********************google sign in *******************
userRouter.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: process.env.CLIENT_URL + "/", //TODO have to make the route or chagne it
  })
);

// TODO use this route for to know if the login successful or not
//TODO reomve this
userRouter.get("/check-auth", isAuthenticated, handler(checkUser));
export { userRouter };
