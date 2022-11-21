import express from "express";

import {
  isAuthenticatedUser,
  isAuthenticatedSeller,
} from "../middleware/authenticate.js";
import { authorizedUser, authorizedSeller } from "../middleware/authorize.js";
import { newSellerProduct } from "../controllers/product.controller.js";

const router = express.Router();

router
  .route("/new/seller/product")
  .post(
    isAuthenticatedUser,
    authorizedUser("user"),
    isAuthenticatedSeller,
    authorizedSeller("seller"),
    newSellerProduct
  );

export default router;
