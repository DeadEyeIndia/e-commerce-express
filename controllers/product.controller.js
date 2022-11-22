import Product from "../models/product.model.js";

// Sellers Product controllers
export const newSellerProduct = async (req, res, next) => {
  try {
    req.body.seller = req.seller.id;
    req.body.category = req.seller.category;

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

export const findSellerProductforSeller = async (req, res, next) => {
  try {
    const sellerProducts = await Product.find({ seller: req.seller.id });

    res.status(200).send({
      success: true,
      sellerProducts,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

export const findSellerSingleProductforSeller = async (req, res, next) => {
  try {
    const sellerProduct = await Product.findById(req.params.id);

    res.status(200).send({
      success: true,
      sellerProduct,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

export const editSellerProductforSeller = async (req, res, next) => {
  try {
    const sellerProduct = await Product.findOneAndUpdate(
      {
        _id: req.params.id,
        seller: req.seller.id,
      },
      req.body,
      { new: true, runValidators: true, useFindAndModify: false }
    );

    if (!sellerProduct) {
      return res.status(404).send({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).send({
      success: true,
      sellerProduct,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

export const editSellerProductVariantsforSeller = async (req, res, next) => {
  try {
    const sellerProduct = await Product.findOneAndUpdate(
      {
        _id: req.params.id,
        seller: req.seller.id,
      },
      { $set: { variations: req.body.variations } },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );

    if (!sellerProduct) {
      res.status(404).send({
        success: false,
        sellerProduct: "Your Product not found",
      });
    }

    res.status(201).send({
      success: true,
      sellerProduct,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

export const deleteSellerProductforSeller = async (req, res, next) => {
  try {
    const sellerProduct = await Product.findOne({
      _id: req.params.id,
      seller: req.seller.id,
    });

    if (!sellerProduct) {
      return res.status(404).send({
        success: false,
        message: "Product not found",
      });
    }

    await sellerProduct.remove();

    res.status(200).send({
      success: true,
      message: "Product Deleted successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

// Find Products for User
export const allProducts = async (req, res, next) => {
  try {
    const products = await Product.find();

    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

// User review of Seller Product
export const createReviewOnProductforUser = async (req, res, next) => {
  try {
    const { rating, comment } = req.body;

    const review = {
      user: req.user.id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };

    const product = await Product.findById(req.params.id);

    const isReviewed = product.reviews.find(
      (rev) => rev.user.toString() === req.user._id.toString()
    );

    // console.log(isReviewed);

    if (isReviewed) {
      product.reviews.forEach((rev) => {
        if (rev.user.toString() === req.user._id.toString())
          (rev.rating = rating), (rev.comment = comment);
      });
    } else {
      product.reviews.push(review);
      product.totalReviews = product.reviews.length;
    }

    let avg = 0;

    product.reviews.forEach((rev) => {
      avg = avg + rev.rating;
    });

    product.avgRating = avg / product.reviews.length;

    await product.save({ validateBeforeSave: false });

    res.status(201).send({
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

// Get All Reviews of Product
export const getAllReviewsOfProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.query.id);

    if (!product) {
      return res.status(404).send({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).send({
      success: true,
      reviews: product.reviews,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};
