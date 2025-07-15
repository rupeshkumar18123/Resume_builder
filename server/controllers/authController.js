const User = require('../models/User');
const { createToken } = require('../utils/token');
const bcrypt = require('bcryptjs');


async function signup(req, res) {
  const { email, username, password } = req.body;
  // Check for existing user
  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ message: "User exists" });

  // Create and save new user
  const user = await User.create({ email, username, password });
  
  // Create JWT
  const token = createToken(user._id);
  // Send token as a cookie
  res.cookie("token", token, { httpOnly: true, secure: false });
  return res.status(201).json({ message: "Signup successful", success: true });
}


async function login(req, res) {
  const { email, password } = req.body;
  // Find user
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "Invalid email or password" });
  // Check password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });
  
  // Generate token
  const token = createToken(user._id);
  res.cookie("token", token, { httpOnly: true, secure: false });
  return res.status(200).json({ message: "Login successful", success: true });
}

// ... existing code ...

// Add exports at the bottom
module.exports = { signup, login };