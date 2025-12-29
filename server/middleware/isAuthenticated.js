const jwt = require("jsonwebtoken");

const isAuthenticated = (req, res, next) => {
  try {
    // Read token from Authorization header: "Bearer <token>"
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.log("Auth failed: Missing or invalid header");
      return res.status(401).json({
        success: false,
        message: "User not authenticated or invalid header format",
      });
    }

    const token = authHeader?.split(" ")[1]; // optional chaining prevents undefined error

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.id = decoded.userId;
    next();
  } catch (error) {
    console.error("Auth error:", error);
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

module.exports = isAuthenticated;
