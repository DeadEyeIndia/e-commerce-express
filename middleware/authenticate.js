import jwt from "jsonwebtoken";

import User from "../models/user.model.js";
import Seller from "../models/seller.model.js";

export const isAuthenticatedUser = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).send({
        message: "Please login to access this resources",
      });
    }

    const decodeData = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decodeData.id);

    next();
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const isAuthenticatedSeller = async (req, res, next) => {
  try {
    const seller = await Seller.findOne({ user: req.user.id });

    if (!seller) {
      return res.status(401).send({
        message: "You are not a Seller",
      });
    }

    req.seller = seller;

    next();
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
