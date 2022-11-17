import express from "express";

import {
  signUpUser,
  signInUser,
  signOutUser,
  getUser,
  editUserProfile,
  editUserPassword,
  getCookies,
} from "../controllers/user.controller.js";
import { isAuthenticatedUser } from "../middleware/authenticate.js";
import { authorizedUser } from "../middleware/authorize.js";

const router = express.Router();

router.route("/cookies").get(getCookies);

router.route("/signup").post(signUpUser);

router.route("/signin").post(signInUser);

router
  .route("/profile")
  .get(isAuthenticatedUser, authorizedUser("user"), getUser);

router.route("/profile/edit").put(isAuthenticatedUser, editUserProfile);

router.route("/password/edit").put(isAuthenticatedUser, editUserPassword);

router.route("/signout").get(isAuthenticatedUser, signOutUser);

export default router;
