const User = require("../models/user");
const bcrypt = require("bcrypt");
const {saltRounds} = require("../configuration.js").crypt;


async function createUser(req, res, next) {
  const login = req.body.username;
  const password = req.body.password;
  const hashPassword = await bcrypt.hash(password, saltRounds);
  const user = new User({username: login, password: hashPassword});

  try {
    await user.save();
  } catch (e) {
    return next(e);
  }

  req.user = user._doc;
  next();
}

async function findUser(req, res, next) {
  let user = await User.findOne({"username": req.body.username})
  if (!user) {
    return res.status(401).send("User does not exist!");
  }

  req.user = user._doc;
  next();
}

async function checkPassword(req, res, next) {
  const password = req.body.password;
  const passwordHash = req.user.password;
  const match = await bcrypt.compare(password, passwordHash);

  if (!match) return res.status(401).send("Password incorrect!");
  next();
}

function storeSession(req, res, next) {
  if (!req.session.user) {
    req.session.user = {id: req.user._id, username: req.user.username};
  }
  req.loginBy = "username/password";
  res.sendStatus(200);
}

function deleteSession(req, res, next) {
  if (req.session.user) {
    // delete req.session.user;
    req.session.destroy((err) => {
      if (err) return next(err);
      res.clearCookie("connect.sid");
      res.sendStatus(200);
    })
  }

}

function checkSession(req, res, next) {
  if (!req.session.user) {
    next();
  } else {
    req.loginBy = "username/password";
    next("route");
  }
}

function getUsernameBySession(req, res, next) {
  if (!req.session.user) {
    req.sendStatus(401);
  } else {
    res.json({"username": req.session.user.username});
  }
}

module.exports = {checkPassword, findUser, createUser, storeSession, deleteSession, checkSession, getUsernameBySession}