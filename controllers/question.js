const Question = require("../models/question.js")
const randomNumber = require("../utils/randomNumber.js");

function getRandom(req, res) {
  Question.findOne({}, (err, doc) => {
    if (err) return console.log(err);

    res.json({"question": doc.question});
  });
}

function getById(req, res) {
  const id = req.params.id;

  if (typeof id == "number") {
    res.json({[id]: "id"});
  } else {
    res.json({"Error": "ID must be number"});
  }
}

function getByTopic(req, res) {
  const topic = req.params.topic;

  Question.find({"topic": topic}, (err, docs) => {

    if (err) return console.log(err);

    if (!docs) {
      res.json({"Error": "Topic not exist"});
    } else {
      let doc = docs[randomNumber(0, docs.length)]
      res.json({
        "question": doc.question,
        "answer": doc.answer,
        "topic": doc.topic
      });
    }
  });
}

function trace(req, res, next) {
  console.log(`Question request ${new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')}`);
  next();
}

module.exports = {getById, getRandom, trace, getByTopic};