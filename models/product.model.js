import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Enter product name"],
      minlength: [5, "Name is too short"],
      maxlength: [32, "Name is too long"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Need product description"],
      minlength: [5, "Name is too short"],
      maxlength: [256, "Name is too long"],
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        "Clothing",
        "Computer & accessories",
        "Electronics",
        "Footwear",
        "Watches",
      ],
    },
    sub_category: [
      {
        type: String,
        required: true,
      },
    ],
    brand: {
      type: String,
      required: [true, "Brand is required"],
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],
    color: {
      type: String,
      required: true,
    },
    variations: [
      {
        price: {
          type: String,
          required: true,
        },
        size: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          default: 1,
          min: 1,
        },
      },
    ],
    features: [
      {
        type: String,
        required: true,
      },
    ],
    totalReviews: {
      type: Number,
      default: 0,
    },
    avgRating: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "users",
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        rating: {
          type: Number,
          required: [true, "Enter rating"],
          min: 1,
          max: 5,
        },
        comment: {
          type: String,
          required: true,
          minlength: [8, "Comment too short"],
          maxlength: [256, "Comment too long"],
        },
      },
    ],
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "sellers",
      required: true,
    },
  },
  { timestamps: true }
);

ProductSchema.path("sub_category").validate(function (sub_category) {
  if (!sub_category) return false;
  else if (sub_category.length === 0) return false;

  return true;
}, "Sub-Category field is required");

ProductSchema.path("variations").validate(function (sizes) {
  if (!sizes) return false;
  else if (sizes.length === 0) return false;

  return true;
}, "Product should have at least one variation");

ProductSchema.path("features").validate(function (features) {
  if (!features) return false;
  else if (features.length === 0) return false;
  else if (features.length < 2) return false;

  return true;
}, "Product should have more than 2 features");

export default mongoose.model("Product", ProductSchema);
