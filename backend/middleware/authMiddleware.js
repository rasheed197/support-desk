const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // 1. Get token from header
    token = req.headers.authorization.split(" ")[1];

    // 2. Verify token (Throws error automatically if invalid/expired)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. Get user from token, excluding the password
    req.user = await User.findById(decoded.id).select("-password");

    return next();
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

module.exports = protect;
