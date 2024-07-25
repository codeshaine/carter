import express from "express";
import {
  handleGetNewProducts,
  handleGetOneProduct,
  handleGetProductReviews,
  handleGetProductsWithFilter,
  handleGetSellerDetails,
} from "../controllers/product/product.controller.js";
import { handler } from "../services/index.js";
const productRoutes = express.Router();

//! gives top 10 new products
productRoutes.get("/get-top", handler(handleGetNewProducts));
//putting below just in case
productRoutes.get("/:slugId", handler(handleGetOneProduct));
productRoutes.get("/review/:slugId", handler(handleGetProductReviews));
productRoutes.get("/seller/:slugId", handler(handleGetSellerDetails));
productRoutes.get("/f/:name", handler(handleGetProductsWithFilter));
export { productRoutes };
