import User from "../models/user.model.js";
import sendToken from "../utils/jwtToken.js";

export const getCookies = async (req, res) => {
  await res.send(req.cookies);
};

export const signUpUser = async (req, res, next) => {
  try {
    const { name, email, mobile, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(406).send({
        message: "Passwords does not match",
      });
    }

    const user = await User.create({ name, email, mobile, password });

    sendToken(user, 201, res);
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

export const signInUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).send({
        message: "Please enter email and password",
      });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).send({
        message: "Invalid email or password",
      });
    }

    const compare = await user.comparePassword(password);

    if (!compare) {
      return res.status(401).send({
        message: "Invalid email or password",
      });
    }

    sendToken(user, 200, res);
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).send({
        message: "User not found",
      });
    }

    res.status(200).send({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

export const editUserProfile = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.user.id);

    if (!user) {
      return res.status(404).send({
        message: "User not found",
      });
    }

    user.name = req.body.name;
    user.email = req.body.email;
    user.mobile = req.body.mobile;

    await user.save({ validateModifiedOnly: true });

    res.status(201).send({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

export const editUserPassword = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("+password");

    if (!user) {
      return res.status(404).send({
        message: "User not found",
      });
    }

    const isPassword = await user.comparePassword(req.body.oldPassword);

    if (!isPassword) {
      return res.status(401).send({
        message: "Current password is incorrect",
      });
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
      return res.status(406).send({
        message: "Passwords must match",
      });
    }

    if (req.body.oldPassword === req.body.newPassword) {
      return res.status(406).send({
        message: "New Password should be different from current password",
      });
    }

    user.password = req.body.newPassword;

    await user.save({ validateModifiedOnly: true });

    sendToken(user, 201, res);
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

export const signOutUser = async (req, res, next) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });

    res.status(200).send({
      message: "Sign Out",
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};
