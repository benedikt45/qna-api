const express = require("express");
const router = express.Router();
const controller = require("../controllers/authLogin.js");
const errors = require("../controllers/errors.js");
const trace = require("../utils/trace.js");

router.use((req, res, next) => trace('Authentication user', req, res, next));

router.post("/login", errors.checkBody, controller.checkUserParams, controller.isRegistered, controller.checkPassword);
router.post("/register", errors.checkBody, controller.checkUserParams, controller.saveUser);

module.exports = router;