const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const loginController = async (req, res, next) => {
    try {
      const { email, password } = req.body;
  
      // Check if required fields are provided
      if (!email || !password) {
        return res.status(400).json({ error: "Missing required fields" });
      }
      
  
      // Find the user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
  
      // Compare the provided password with the hashed password stored in the database
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
  
      // Password is correct, generate a JWT token
      const token = jwt.sign({ userId: user._id }, process.env.JWT_TOKEN_SECRET_KEY , {
        expiresIn: "1d",
      });
  
      res.json({ token });
    } catch (error) {
      next(error);
    }
  };
  

module.exports = loginController;
