const sendToken = (user, statusCode, res) => {
  const token = user.getJWTToken();
  const options = {
    expires: new Date(new Date().getTime() + 10 * 60 * 60 * 1000),
    httpOnly: true,
    path: "/",
    sameSite: "strict",
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    token,
  });
};

export default sendToken;
