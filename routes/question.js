const express = require("express");
const router = express.Router();
const controller = require("../controllers/question.js");
const authController = require("../controllers/auth.js");


router.use(controller.trace);

router.use(authController.authenticateToken);

router.get("/random", controller.getRandom);
router.get("/id/:id", controller.getById);
router.get("/random/topic/:topic", controller.getRandomByTopic);
router.get("/topics", controller.getTopicList);

// router.post("/add", controller.addNew);

module.exports = router;