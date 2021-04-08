const express = require("express");
const router = express.Router();
const controller = require("../controllers/auth.js");
const errors = require("../controllers/errors.js")

router.use(controller.trace);

router.post("/getToken", errors.checkBody, controller.checkUsername, controller.getToken);

module.exports = router;