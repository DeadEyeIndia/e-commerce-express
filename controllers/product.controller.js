import Product from "../models/product.model.js";

export const newSellerProduct = async (req, res, next) => {
  try {
    req.body.seller = req.seller.id;

    const product = await Product.create(req.body);

    res.status(201).send({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};
