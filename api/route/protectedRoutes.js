require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

const SECRET_KEY = process.env.SECRET_KEY;

if (!SECRET_KEY) {
  throw new Error("SECRET_KEY is not defined in environment variables");
}

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(400).json({ message: "Invalid token." });
  }
};

// Protected route for home page
router.get("/home", verifyToken, (req, res) => {
  res.json({ message: "Welcome to the home page!", user: req.user });
});

module.exports = router;
