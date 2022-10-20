import express from "express";

import { signUpUser } from "../controllers/user.controller.js";

const router = express.Router();

router.route("/new").post(signUpUser);

export default router;
