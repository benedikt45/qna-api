const jwt = require("jsonwebtoken");
const Auth = require("../models/auth.js");


function trace(req, res, next) {
  console.log(`Token request ${new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')}`);
  next();
}

function checkUsername(req, res, next) {
  if (!req.body.username) {
    return res.sendStatus(400);
  }
  next();
}

function getToken(req, res, next) {
  const token = Auth({username: req.body.username});
  res.json(token);
}

function authenticateToken(req, res, next) {
  if (process.env.TOKEN_SECRET === '') return next();

  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    // console.log(err);
    if (err) return res.sendStatus(403);

    req.user = user;
    next();
  })
}

module.exports = {getToken, authenticateToken, trace, checkUsername};