const Token = require("../models/token");
const jwt = require("jsonwebtoken");
const config = require("../configuration");

async function createToken(req, res, next) {
  let username = req.body.username;
  jwt.sign({username}, config.token.TOKEN_SECRET, {expiresIn: '1y'}, async (err, token) => {
    if (err) {
      return next(err);
    }
    let issuedAt = new Date().toISOString();
    let tokenModel = new Token({username, token, issuedAt});
    try {
      await tokenModel.save();
    } catch (e) {
      return next(e);
    }

    res.status(201).send(tokenModel.token);
  });
}

async function checkToken(req, res, next) {
  const authHeader = req.headers['authorization'];

  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(config.token.TOKEN_SECRET, token, (err, data) => {
    if (err) {
      return next(new Error(err.message));
    }

    req.loginBy = "token";
    req.user.username = data;
    next("route");
  });
}

module.exports = {checkToken, createToken};