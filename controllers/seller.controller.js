import Seller from "../models/seller.model.js";
import User from "../models/user.model.js";

export const newSeller = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const seller = await Seller.findOne({ user: req.user.id });

    if (!user) {
      return res.status(401).send({
        success: false,
        message: "User not found",
      });
    } else if (seller) {
      return res.status(401).send({
        success: false,
        message: "You already have a seller account",
      });
    }

    req.body.user = req.user.id;

    const newSeller = await Seller.create(req.body);

    res.status(201).send({
      success: true,
      newSeller,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

export const sellerDetails = async (req, res, next) => {
  try {
    const seller = await Seller.findById(req.seller.id);

    res.status(200).send({
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

export const sellerEditDetails = async (req, res, next) => {
  try {
    const seller = await Seller.findOneAndUpdate(
      { user: req.user.id },
      req.body,
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );

    res.status(201).send({ success: true, seller });

    console.log(req.user.id);
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

export const sellerProfileDelete = async (req, res, next) => {
  try {
    const seller = await Seller.findOne({ user: req.user.id });

    if (!seller) {
      res.status(404).send({
        success: false,
        message: "Seller not found",
      });
    }

    await seller.remove();

    res.status(200).send({
      success: true,
      message: "Seller deleted successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};
