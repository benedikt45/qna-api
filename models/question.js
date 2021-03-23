const mongoose = require("mongoose");


const Schema = mongoose.Schema;

const questionSchema = new Schema({
  question: String,
  answer: String,
  topic: String
});

exports.Question = mongoose.model("Question", questionSchema);
exports.mongodbConnection = async (url) => await mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true });