import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is requried"],
      minlength: [5, "Name is too short"],
      maxlength: [64, "Name is too long"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      validate: [validator.isEmail, "Enter valid email"],
      unique: [true, "User already exists"],
    },
    mobile: {
      type: String,
      required: [true, "Mobile Number is required"],
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
      unique: [true, "Mobile number already taken"],
    },

    password: {
      type: String,
      requried: [true, "Password is required"],
      validate: [validator.isStrongPassword, "Enter strong password"],
      select: false,
    },
    address: [
      {
        fullName: {
          type: String,
          minlength: [5, "Name is too short"],
          maxlength: [64, "Name is too long"],
          trim: true,
        },
        email: {
          type: String,
          required: [true, "Email is required"],
          lowercase: true,
          validate: [validator.isEmail, "Enter valid email"],
        },
        mobileNo: {
          type: String,
          required: [true, "Mobile Number is required"],
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
        },
        postalCode: {
          type: String,
          required: [true, "Postal Code is required"],
          minlength: [5, "Not valid postal code"],
          maxlength: [6, "Not valid postal code"],
        },
        area: {
          type: String,
          required: [true, "Area/ Street name is required"],
          minlength: 3,
        },
        landmark: {
          type: String,
          minlength: 3,
        },
        townCity: {
          type: String,
          required: [true, "City is required"],
        },
        state: {
          type: String,
          required: [true, "State is required"],
        },
      },
    ],
    orders: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
          required: true,
        },
        status: {
          type: String,
          default: "pending",
          enum: ["pending", "accept", "decline", "onway", "delivered"],
        },
        dates: {
          orderedDate: {
            type: Date,
            default: Date.now(),
          },
          orderDelivered: {
            type: Date,
          },
        },
        cancelled: {
          type: Boolean,
          default: false,
        },
      },
    ],
    cart: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
          required: true,
        },
      },
    ],
    role: {
      type: String,
      default: "user",
    },

    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 12);
});

UserSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

UserSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export default mongoose.model("User", UserSchema);
