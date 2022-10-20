import User from "../models/user.model.js";

export const signUpUser = async (req, res, next) => {
  try {
    const { name, email, mobile, password, confirm } = req.body;

    if (password !== confirm) {
      return res.status(406).send({
        message: "Password does not match",
      });
    }

    const user = await User.create({ name, email, mobile, password });

    res.status(201).send({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};
