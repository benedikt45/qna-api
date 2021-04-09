const express = require("express");
const router = express.Router();
const controller = require("../controllers/authToken.js");
const errors = require("../controllers/errors.js");
const trace = require("../utils/trace.js");

router.use((req, res, next) => trace('Authentication token', req, res, next));

router.post("/token", errors.checkBody, controller.checkUsername, controller.getToken);

module.exports = router;