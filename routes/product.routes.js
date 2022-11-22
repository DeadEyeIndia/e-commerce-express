import express from "express";

import {
  isAuthenticatedUser,
  isAuthenticatedSeller,
} from "../middleware/authenticate.js";
import { authorizedUser, authorizedSeller } from "../middleware/authorize.js";
import {
  findSellerProductforSeller,
  findSellerSingleProductforSeller,
  newSellerProduct,
  editSellerProductforSeller,
  editSellerProductVariantsforSeller,
  deleteSellerProductforSeller,
  allProducts,
  createReviewOnProductforUser,
  getAllReviewsOfProduct,
} from "../controllers/product.controller.js";

const router = express.Router();

// Seller Product CREATE, FIND, UPDATE AND DELETE ROUTERS
router
  .route("/new/seller/product")
  .post(
    isAuthenticatedUser,
    authorizedUser("user"),
    isAuthenticatedSeller,
    authorizedSeller("seller"),
    newSellerProduct
  );

router
  .route("/seller/products")
  .get(
    isAuthenticatedUser,
    authorizedUser("user"),
    isAuthenticatedSeller,
    authorizedSeller("seller"),
    findSellerProductforSeller
  );

router
  .route("/seller/product/:id")
  .get(
    isAuthenticatedUser,
    authorizedUser("user"),
    isAuthenticatedSeller,
    authorizedSeller("seller"),
    findSellerSingleProductforSeller
  );

router
  .route("/seller/product/edit/:id")
  .put(
    isAuthenticatedUser,
    authorizedUser("user"),
    isAuthenticatedSeller,
    authorizedSeller("seller"),
    editSellerProductforSeller
  );

router
  .route("/seller/product/variations/edit/:id")
  .patch(
    isAuthenticatedUser,
    authorizedUser("user"),
    isAuthenticatedSeller,
    authorizedSeller("seller"),
    editSellerProductVariantsforSeller
  );

router
  .route("/seller/product/delete/:id")
  .patch(
    isAuthenticatedUser,
    authorizedUser("user"),
    isAuthenticatedSeller,
    authorizedSeller("seller"),
    deleteSellerProductforSeller
  );

// Find Products
router.route("/products").get(allProducts);

// User Review on Seller Product Route
router
  .route("/product/review/:id")
  .put(
    isAuthenticatedUser,
    authorizedUser("user"),
    createReviewOnProductforUser
  );

// Get All Reviews of Product for unauthorized User also
router.route("/product/reviews").get(getAllReviewsOfProduct);

export default router;
