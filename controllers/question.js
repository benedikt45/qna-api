const Question = require("../models/question.js")
const randomNumber = require("../utils/randomNumber.js");

function getRandom(req, res) {
  findRandom(req, res, {});
}

function getRandomByTopic(req, res) {
  const topic = req.params.topic;
  findRandom(req, res, {topic});
}

function getById(req, res) {
  const id = req.params.id;

  Question.countDocuments({}, function (err, count) {
    try {
      const intId = parseInt(id);
      if (intId > count) {
        res.json({"Error": `Max id now is ${count}`});
      } else if (intId === 0) {
        res.json({"Error": `ID must be over 0`});
      } else {
        findAndSendQuestion(req, res, {}, id - 1);
      }
    } catch (e) {
      res.json({"Error": "ID must be number"});
    }
  })
}

function findRandom(req, res, topic) {
  Question.countDocuments(topic, function (err, count) {
    const random = randomNumber(0, count - 1)
    findAndSendQuestion(req, res, topic, random);
  });
}

function findAndSendQuestion(req, res, topic, id) {
  Question.findOne(topic).skip(id).exec(
      function (err, doc) {
        if (!doc) {
          res.json({"Error": "Topic not exist"})
        } else {
          res.json({
            "question": doc.question,
            "answer": doc.answer,
            "topic": doc.topic
          });
        }
      });
}

function getTopicList(req, res) {
  Question.distinct('topic', (err, topics) => {
    if (err) console.log(err);

    res.json({"Topics": JSON.stringify(topics)})
  })
}

function trace(req, res, next) {
  console.log(`Question request ${new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')}`);
  next();
}

module.exports = {getById, getRandom, trace, getRandomByTopic, getTopicList};