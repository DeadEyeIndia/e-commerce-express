import mongoose from "mongoose";
import validator from "validator";

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
      maxlength: [64, "Name is too long"],
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["Electronics", "Clothing", "Watches", "Footwear"],
    },
    brand: {
      type: String,
      required: [true, "Brand is required"],
    },
    color: {
      type: String,
      required: true,
    },
    size: [
      {
        details: {
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

export default mongoose.model("Product", ProductSchema);
