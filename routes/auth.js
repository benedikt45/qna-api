const express = require("express");
const router = express.Router();
const controller = require("../controllers/auth.js");

router.use(controller.trace);

router.post("/getToken", controller.getToken);

module.exports = router;