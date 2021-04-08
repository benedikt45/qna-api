const express = require("express");
const router = express.Router();
const controller = require("../controllers/question.js");
const errors = require("../controllers/errors.js");
const trace = require("../utils/trace.js");


router.use((req, res, next) => trace('Question', req, res, next));

router.get("/random", controller.getRandom);
router.get("/id/:id", controller.getById);
router.get("/random/topic/:topic", controller.getRandomByTopic);
router.get("/topics", controller.getTopicList);
router.get("/range", controller.getRange);
router.get("/all", controller.getAll);
router.post("/add", errors.checkBody, controller.addNew);

module.exports = router;