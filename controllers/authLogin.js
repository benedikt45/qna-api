const User = require("../models/authLogin.js")
const errors = require("./errors.js");
const bcrypt = require("bcrypt");
const {saltRounds} = require("../configuration.js");

function checkUserParams(req, res, next) {
  if (!req.body.username || !req.body.password) {
    return res.status(400).send("Username and password required params!");
  }
  next();
}

function isRegistered(req, res, next) {
  User.find({"username": req.body.username}).exec((err, result) => {
    errors.checkError(err, req, res, next);
    if (result.length === 0) return res.status(401).send("User not exist!");

    req.user = result["0"]._doc;
    next();
  });
}

async function checkPassword(req, res, next) {
  const password = req.body.password;
  const passwordHash = req.user.password;
  const match = await bcrypt.compare(password, passwordHash);

  if (!match) return res.status(401).send("Password incorrect!");

  res.sendStatus(200);
}

async function saveUser(req, res, next) {
  const username = req.body.username;
  const password = req.body.password;
  const hashPassword = await bcrypt.hash(password, saltRounds)
  const user = new User({username, password: hashPassword});

  user.save((err) => {
    errors.checkError(err, req, res, next);

    res.status(201).send('Successful');
  })
}

module.exports = {isRegistered, checkPassword, checkUserParams, saveUser}