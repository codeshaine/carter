import express from "express";
import { handler } from "../services/index.js";
import { handleSellerSignup } from "../controllers/seller/sellerAuth.controller.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { isSeller } from "../middlewares/isSeller.js";
import {
  checkSeller,
  handleDeleteProduct,
  handleDeliveryDone,
  handleGetAllSellerProducts,
  handleGetSellerDetails,
  handleOrderedSellerItems,
  handleUpdateProduct,
  handleUpdateSellerProfile,
  handleUploadNewProduct,
} from "../controllers/seller/seller.controller.js";
import { upload } from "../services/multer/storage.js";
const sellerRoutes = express.Router();
// TODO just look into the seller reatled code and cross check everyting works fine
sellerRoutes.get(
  "/",
  isAuthenticated,
  isSeller,
  handler(handleGetSellerDetails)
);
sellerRoutes.post("/signup", isAuthenticated, handler(handleSellerSignup));

/************seller profile******************* */
sellerRoutes.post(
  "/profile/update",
  isAuthenticated,
  isSeller,
  upload.single("image"),
  handler(handleUpdateSellerProfile)
);

/***************seller  products*****************/
sellerRoutes.post(
  "/product/new",
  isAuthenticated,
  isSeller,
  // upload.array("images", 3),
  upload.single("images"),
  handler(handleUploadNewProduct)
);

sellerRoutes.post(
  "/product/update/:id",
  isAuthenticated,
  isSeller,
  handler(handleUpdateProduct)
);

sellerRoutes.delete(
  "/product/delete/:id",
  isAuthenticated,
  isSeller,
  handler(handleDeleteProduct)
);

sellerRoutes.get(
  "/products",
  isAuthenticated,
  isSeller,
  handler(handleGetAllSellerProducts)
);

//TODO pening redis cache deletion for this route
sellerRoutes.get(
  "/products/ordered-list",
  isAuthenticated,
  isSeller,
  handler(handleOrderedSellerItems)
);

sellerRoutes.post(
  "/products/delivery/done/:orderId",
  isAuthenticated,
  isSeller,
  handler(handleDeliveryDone)
);

//checking auth
// sellerRoutes.get(
//   "/check-auth",
//   isAuthenticated,
//   isSeller,
//   handler(checkSeller)
// );

export { sellerRoutes };
//TODO just consider using patch instead of post for updating the details
