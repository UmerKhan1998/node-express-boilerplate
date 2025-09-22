const express = require("express");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const auth = require("../middleware/auth");
const { generateTokens } = require("../utils/token");

const router = express.Router();

// Register user
router.post(
  "/register",
  [
    body("name").trim().isLength({ min: 2 }),
    body("email").isEmail(),
    body("password").isLength({ min: 6 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(400).json({ success: false, errors: errors.array() });

      const { name, email, password } = req.body;
      const existingUser = await User.findOne({ email });
      if (existingUser)
        return res.status(400).json({
          success: false,
          message: "User already exists with this email",
        });

      const user = new User({ name, email, password });
      await user.save();

      const { accessToken, refreshToken } = generateTokens(user._id);

      res.status(201).json({
        success: true,
        message: "User registered successfully",
        accessToken,
        refreshToken,
        user,
      });
    } catch (error) {
      console.error("Registration error:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  }
);

// Login user
router.post(
  "/login",
  [body("email").isEmail(), body("password").exists()],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(400).json({ success: false, errors: errors.array() });

      const { email, password } = req.body;
      const user = await User.findOne({ email }).select("+password");
      if (!user || !(await user.comparePassword(password))) {
        return res
          .status(401)
          .json({ success: false, message: "Invalid credentials" });
      }

      const { accessToken, refreshToken } = generateTokens(user._id);

      res.json({
        success: true,
        message: "Login successful",
        accessToken,
        refreshToken,
        user,
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  }
);

// Refresh token route
router.post("/refresh", async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken)
      return res
        .status(401)
        .json({ success: false, message: "No refreshToken provided" });

    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET || "fallback-refresh-secret"
    );
    const user = await User.findById(decoded.userId);

    if (!user || !user.isActive)
      return res
        .status(401)
        .json({ success: false, message: "Invalid refreshToken" });

    const { accessToken, refreshToken: newRefreshToken } = generateTokens(
      user._id
    );

    res.json({ success: true, accessToken, refreshToken: newRefreshToken });
  } catch (error) {
    console.error("Refresh token error:", error);
    res
      .status(401)
      .json({ success: false, message: "Invalid or expired refreshToken" });
  }
});

// Get current user
router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.json({ success: true, user });
  } catch (error) {
    console.error("Get user error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
