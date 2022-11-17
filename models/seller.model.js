import mongoose from "mongoose";
import validator from "validator";

const SellerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Enter required fields"],
      minlength: [5, "Name is too short"],
      maxlength: [32, "Name is too long"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      validate: [validator.isEmail, "Enter valid email"],
      unique: [true, "Email already taken"],
    },
    mobile: {
      type: String,
      required: [true, "Mobile number is required"],
      validate: {
        validator: function (v) {
          if (v.length !== 10) {
            return false;
          }

          if (!validator.isMobilePhone(String(v), "en-IN")) {
            return false;
          }

          return true;
        },
        message: (props) => "Invalid number",
      },
      unique: [true, "Number already taken"],
    },
    details: {
      description: {
        type: String,
        required: [true, "Description is required"],
        minlength: [5, "Description is too short"],
        maxlength: [120, "Description is too long"],
        trim: true,
      },
      about: {
        type: String,
        required: [true, "About Seller is required"],
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    role: {
      type: String,
      default: "seller",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Seller", SellerSchema);
