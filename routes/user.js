const express = require("express");
const router = express.Router();
const controllerUser = require("../controllers/user");
const {checkBodyFields} = require("../utils/checkBodyFields");


router.post("/registration", (req, res, next) => {
  checkBodyFields(["username", "password"], req, res, next)
}, controllerUser.createUser, controllerUser.storeSession);

router.post("/login", (req, res, next) => {
  checkBodyFields(["username", "password"], req, res, next)
}, controllerUser.findUser, controllerUser.checkPassword, controllerUser.storeSession);

router.post("/logout", controllerUser.deleteSession);


module.exports = router;