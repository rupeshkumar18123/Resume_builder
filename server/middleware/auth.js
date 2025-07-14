const jwt = require('jsonwebtoken');
const User = require('../models/User');

async function verifyUser(req, res, next) {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "No token" });
  try {
    const data = jwt.verify(token, process.env.TOKEN_KEY);
    req.userId = data.id; // store user ID for later use
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
}
