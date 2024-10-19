import express from "express";
import { handler } from "../services/index.js";
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
  handleDeleteFromCart,
  handleDeleteOrder,
  handleDeleteReview,
  handleDeleteUserAddress,
  handleGetCartItems,
  handleGetOrders,
  handleGetUserAddress,
  handleGetUserInfo,
  handlePurchaseProduct,
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
// userRouter.post("/product/buy-now", isAuthenticated, handler(handleBuyNow));

// userRouter.post(
//   "/product/cart/order-now",
//   isAuthenticated,
//   handler(handleOrderNow)
// );
userRouter.post(
  "/product/purchase-now",
  isAuthenticated,
  handler(handlePurchaseProduct)
);
userRouter.delete(
  "/product/order/cancel/:orderId",
  isAuthenticated,
  handler(handleDeleteOrder)
);

userRouter.get(
  "/product/ordered-items",
  isAuthenticated,
  handler(handleGetOrders)
);

//*************handling cart ******************************
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
    failureRedirect: process.env.CLIENT_URL + "/",
  })
);

userRouter.get("/check-auth", isAuthenticated, handler(checkUser));
export { userRouter };
