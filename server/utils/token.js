const jwt = require('jsonwebtoken');
function createToken(userId) {
  // Sign a token with the user ID payload and expiration time
  return jwt.sign({ id: userId }, process.env.TOKEN_KEY, { expiresIn: '3d' });
}
module.exports = { createToken };
