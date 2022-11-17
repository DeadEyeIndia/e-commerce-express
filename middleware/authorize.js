export const authorizedUser = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).send({
        message: `${req.user.role} is not allowed to access this resource`,
      });
    }

    next();
  };
};
