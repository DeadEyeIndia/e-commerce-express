import jwt from "jsonwebtoken";

import User from "../models/user.model.js";

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
