const Question = require("../models/question.js")
const randomNumber = require("../utils/randomNumber.js");

function getRandom(req, res) {
  Question.countDocuments({},function (err, count) {

    const random = randomNumber(0, count - 1)

    Question.findOne().skip(random).exec(
        function (err, doc) {
          res.json({
            "question": doc.question,
            "answer": doc.answer,
            "topic": doc.topic
          });
        });
  });
}

function getRandomByTopic(req, res) {
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
        Question.findOne().skip(id - 1).exec(
            function (err, doc) {
              res.json({
                "question": doc.question,
                "answer": doc.answer,
                "topic": doc.topic
              });
            });
      }
    } catch (e) {
      res.json({"Error": "ID must be number"});
    }
  })
}

function trace(req, res, next) {
  console.log(`Question request ${new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')}`);
  next();
}

module.exports = {getById, getRandom, trace, getRandomByTopic};