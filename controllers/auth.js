const jwt = require("jsonwebtoken");
const Auth = require("../models/auth.js");
const config = require("../configuration.js")


function trace(req, res, next) {
  console.log(`Token request ${new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')}`);
  next();
}

function getToken(req, res) {
  const token = Auth({username: req.body.username});
  res.json(token);
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, config.TOKEN_SECRET, (err, user) => {
    console.log(err);
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  })
}

module.exports = {getToken, authenticateToken, trace};