const jwt = require('jsonwebtoken');

async function verifyUser(req, res, next) {
  //self defied token
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Unauthorized" });
  
  try {
    const data = jwt.verify(token, process.env.TOKEN_KEY);
    req.userId = data.id;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
}

module.exports = verifyUser; // Add export