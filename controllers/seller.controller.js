import Seller from "../models/seller.model.js";
import User from "../models/user.model.js";

export const newSeller = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(401).send({
        success: false,
        message: "User not found",
      });
    }

    req.body.user = req.user.id;
    req.body.name = user.name;
    req.body.email = user.email;
    req.body.mobile = user.mobile;

    const seller = await Seller.create(req.body);

    res.status(201).send({
      success: true,
      seller,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};
