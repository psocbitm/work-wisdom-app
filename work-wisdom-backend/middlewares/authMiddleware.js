const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authenticateToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET_KEY);
    const userId = decoded.userId;
    // Check if the user exists in the database
    const user = await User.findById(userId).populate("posts", "title content");
    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    // Attach the user object to the request
    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({ error: "Invalid token" });
  }
};

module.exports = authenticateToken;
