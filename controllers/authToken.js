const jwt = require("jsonwebtoken");
const AuthToken = require("../models/authToken.js");


function checkUsername(req, res, next) {
  if (!req.body.username) {
    return res.status(400).send("Username required param!");
  }
  next();
}

function getToken(req, res, next) {
  const token = AuthToken({username: req.body.username});
  res.json(token);
}

function authenticateToken(req, res, next) {
  if (!process.env.TOKEN_SECRET || process.env.TOKEN_SECRET === "") return next();

  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.TOKEN_SECRET,
      (err, user) => {
        if (err) return res.sendStatus(403);

        req.username = user.username;
        next();
      })
}

module.exports = {getToken, authenticateToken, checkUsername};