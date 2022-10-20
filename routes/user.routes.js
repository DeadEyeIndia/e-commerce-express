import express from "express";

import {
  signUpUser,
  signInUser,
  signOutUser,
  getUser,
} from "../controllers/user.controller.js";
import { isAuthenticatedUser } from "../middleware/authenticate.js";

const router = express.Router();

router.route("/signup").post(signUpUser);

router.route("/signin").post(signInUser);

router.route("/profile").get(isAuthenticatedUser, getUser);

router.route("/signout").get(isAuthenticatedUser, signOutUser);

export default router;
