const jwt = require("jsonwebtoken");


function generateAccessToken(username) {
  if (process.env.TOKEN_SECRET === '') return '';
  return jwt.sign(username, process.env.TOKEN_SECRET, {expiresIn: '1y'});
}

module.exports = generateAccessToken