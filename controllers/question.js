const model = require("../models/question.js")

async function connectMongodb(url) {
  await model.mongodbConnection(url)
}

function getRandom(req, res) {
  model.Question.findOne({}, (err, doc) => {
    if(err) return console.log(err);

    res.json({"question": doc.question});
  })
}

function getById(req, res) {
  const id = req.params.id;
  res.json({[id]: "id"});
}

function trace(req, res, next) {
  console.log(`Question request ${new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')}`)
  next()
}

module.exports = {getById, getRandom, trace, connectMongodb};