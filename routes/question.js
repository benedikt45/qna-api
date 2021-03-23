const express = require("express");
const router = express.Router();
const controller = require("../controllers/question.js");


router.use(controller.trace);
router.get("/random", controller.getRandom);
router.get("/id/:id", controller.getById);
router.get("/topic/random/:topic", controller.getRandomByTopic);

module.exports = router;