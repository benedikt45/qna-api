const express = require("express");
const router = express.Router();
const controller = require("../controllers/question.js")


router.use(controller.trace);
router.get("/random", controller.getRandom);
router.get("/:id", controller.getById);

module.exports = router;