const Question = require("../models/question.js")
const randomNumber = require("../utils/randomNumber.js");
const isNumeric = require("../utils/isNumeric.js");
const errors = require("./errors.js");

function getRandom(req, res) {
  findRandom(req, res);
}

function getRandomByTopic(req, res) {
  const topic = req.params.topic;
  findRandom(req, res, {topic});
}

function getById(req, res) {
  const id = req.params.id;

  Question.countDocuments({}, function (err, count) {
    if (!isNumeric(id)) return res.status(500).send("ID must be numeric!");
    let numericId = parseInt(id);
    if (numericId > count) return res.status(500).send(`Max id now is ${count}!`);
    if (numericId === 0) return res.status(500).send("ID must be over 0!");

    findAndSendQuestion(req, res, numericId - 1);
  })
}

function findRandom(req, res, topic = {}) {
  Question.countDocuments(topic, function (err, count) {
    const random = randomNumber(0, count - 1);
    findAndSendQuestion(req, res, random.topic);
  });
}

function findAndSendQuestion(req, res, id, topic = {}) {
  Question.findOne(topic).skip(id).exec(
      function (err, doc) {
        errors.checkError(err, req, res, next);
        if (!doc) return res.status(500).send("Topic not exist!");

        res.json({
          "question": doc.question,
          "answer": doc.answer,
          "topic": doc.topic
        });
      });
}

function getTopicList(req, res, next) {
  Question.distinct('topic', (err, topics) => {
    errors.checkError(err, req, res, next);

    res.json({"Topics": topics})
  });
}

function getRange(req, res, next) {
  const start = req.query["start"],
      end = req.query["end"];

  if (!end || !start) {
    return res.sendStatus(400);
  }

  Question.find().sort({_id: 1}).skip(100).exec((err, result) => {
    errors.checkError(err, req, res, next);
  })
}

function getAll(req, res, next) {
  Question.find().exec(
      function (err, questions) {
        errors.checkError(err, req, res, next);

        res.json(questions);
      })
}

function addNew(req, res, next) {
  const question = req.body.question;
  const answer = req.body.answer;
  const topic = req.body.topic;
  const qna = new Question({question, answer, topic});

  qna.save((err) => {
    errors.checkError(err, req, res, next);

    res.status(201).send('Question was created!');
  })
}

module.exports = {getById, getRandom, getRandomByTopic, getTopicList, addNew, getRange, getAll};