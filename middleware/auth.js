const jwt = require("jsonwebtoken");
const User = require("../models/User");

const auth = async (req, res, next) => {
  try {
    const accessToken = req.header("Authorization")?.replace("Bearer ", "");
    if (!accessToken) {
      return res
        .status(401)
        .json({ success: false, message: "No accessToken provided" });
    }

    const decoded = jwt.verify(
      accessToken,
      process.env.JWT_SECRET || "fallback-secret"
    );
    const user = await User.findById(decoded.userId);

    if (!user || !user.isActive) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid accessToken" });
    }

    req.userId = decoded.userId;
    req.user = user;
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    res
      .status(401)
      .json({ success: false, message: "Invalid or expired accessToken" });
  }
};

module.exports = auth;
