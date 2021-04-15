const Question = require("../models/question.js")
const randomNumber = require("../utils/randomNumber.js");
const isNumeric = require("../utils/isNumeric.js");


async function getTopicList(req, res, next) {
  try {
    const topics = await Question.distinct('topic').exec();
    res.json(topics);
  } catch (err) {
    next(err);
  }
}

async function getRandom(req, res, next) {
  let parameters = req.body;
  let topic = {};
  if (!parameters) {
    topic = {"topic": parameters.topic};
  }

  try {
    const count = await Question.countDocuments(topic).exec();
    const id = randomNumber(0, count - 1);

    const question = await Question.findOne(topic).skip(id).exec();
    res.json({
      "question": question.question,
      "answer": question.answer,
      "topic": question.topic,
    });
  } catch (err) {
    next(err);
  }
}

async function getAll(req, res, next) {
  try {
    const questions = await Question.find().exec();
    res.json(questions);
  } catch (err) {
    next(err);
  }
}

async function addNew(req, res, next) {
  const question = req.body.question;
  const answer = req.body.answer;
  const topic = req.body.topic;
  const qna = new Question({question, answer, topic});

  try {
    await qna.save();
    res.sendStatus(201);
  } catch (err) {
    next(err);
  }
}

async function del(req, res, next) {
  const id = req.body.id;

  try {
    await Question.findOneAndDelete({_id: id}).exec();
    res.sendStatus(202);
  } catch (err) {
    next(err);
  }
}

module.exports = {getRandom, getTopicList, addNew, getAll, del};

// Старые функции
// function getRandom(req, res) {
//   findRandom(req, res);
// }
//
// function getRandomByTopic(req, res) {
//   const topic = req.params.topic;
//   findRandom(req, res, {topic});
// }
//
// function getById(req, res) {
//   const id = req.params.id;
//
//   Question.countDocuments({}, function (err, count) {
//     if (!isNumeric(id)) return res.status(500).send("ID must be numeric!");
//     let numericId = parseInt(id);
//     if (numericId > count) return res.status(500).send(`Max id now is ${count}!`);
//     if (numericId === 0) return res.status(500).send("ID must be over 0!");
//
//     findAndSendQuestion(req, res, numericId - 1);
//   })
// }
//
// function findRandom(req, res, topic = {}) {
//   Question.countDocuments(topic, function (err, count) {
//     const random = randomNumber(0, count - 1);
//     findAndSendQuestion(req, res, random.topic);
//   });
// }
//
// function findAndSendQuestion(req, res, id, topic = {}) {
//   Question.findOne(topic).skip(id).exec(
//       function (err, doc) {
//         errors.checkError(err, req, res, next);
//         if (!doc) return res.status(500).send("Topic not exist!");
//
//         res.json({
//           "question": doc.question,
//           "answer": doc.answer,
//           "topic": doc.topic
//         });
//       });
// }
//
// function getRange(req, res, next) {
//   const start = req.query["start"],
//       end = req.query["end"];
//
//   if (!end || !start) {
//     return res.sendStatus(400);
//   }
//
//   Question.find().sort({_id: 1}).skip(100).exec((err, result) => {
//     errors.checkError(err, req, res, next);
//   })
// }