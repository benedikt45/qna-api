const express = require("express");
const router = express.Router();
const controllerQuestion = require("../controllers/question.js");
const {checkBodyFields} = require("../utils/checkBodyFields");


router.post("/topics", controllerQuestion.getTopicList);

router.post("/random", controllerQuestion.getRandom);

router.get("/all", controllerQuestion.getAll);

router.post("/new", (req, res, next) => {
  checkBodyFields(["question", "answer", "topic"], req, res, next)
}, controllerQuestion.addNew);


module.exports = router;