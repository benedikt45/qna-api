const Token = require("../models/token");
const jwt = require("jsonwebtoken");
const config = require("../configuration");

async function createToken(req, res, next) {
  let username = req.body.username;
  jwt.sign({username}, process.env.TOKEN_SECRET, {expiresIn: '1d'}, async (err, token) => {
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

  jwt.verify(token, process.env.TOKEN_SECRET, (err, data) => {
    if (err) {
      return res.status(400).send(err.message);
    }

    req.loginBy = "token";
    if (!req.user) {
      req.user = {};
    }
    req.user.username = data;
    next("route");
  });
}

module.exports = {checkToken, createToken};