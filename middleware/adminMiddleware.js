const adminMiddleware = (req, res, next) => {
  console.log("adminMiddleware triggered");
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an admin");
  }
};

module.exports = { adminMiddleware };
