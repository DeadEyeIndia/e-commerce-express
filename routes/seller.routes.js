import express from "express";

import {
  newSeller,
  sellerDetails,
  sellerEditDetails,
  sellerProfileDelete,
} from "../controllers/seller.controller.js";
import {
  isAuthenticatedUser,
  isAuthenticatedSeller,
} from "../middleware/authenticate.js";
import { authorizedUser, authorizedSeller } from "../middleware/authorize.js";

const router = express.Router();

router
  .route("/seller/new")
  .post(isAuthenticatedUser, authorizedUser("user"), newSeller);

router
  .route("/seller/me/profile")
  .get(
    isAuthenticatedUser,
    authorizedUser("user"),
    isAuthenticatedSeller,
    authorizedSeller("seller"),
    sellerDetails
  );

router
  .route("/seller/edit")
  .put(
    isAuthenticatedUser,
    authorizedUser("user"),
    isAuthenticatedSeller,
    authorizedSeller("seller"),
    sellerEditDetails
  );

router
  .route("/seller/remove")
  .delete(
    isAuthenticatedUser,
    authorizedUser("user"),
    isAuthenticatedSeller,
    authorizedSeller("seller"),
    sellerProfileDelete
  );

export default router;
