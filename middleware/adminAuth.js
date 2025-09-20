const auth = require("./auth")

const adminAuth = async (req, res, next) => {
  auth(req, res, () => {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admin privileges required.",
      })
    }
    next()
  })
}

module.exports = adminAuth
