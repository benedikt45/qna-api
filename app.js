const express = require("express");
const app = express();
const error = require("./controllers/404.js");
const questionRouter = require("./routes/question.js");
const mongoose = require("mongoose");
const configuration = require("./configuration.js");


app.use("/question", questionRouter);
app.use(error);

app.listen(3000, async () => {
  await mongoose.connect(configuration.qnaStringConnection, { useUnifiedTopology: true, useNewUrlParser: true });
  console.log('Server start');
});

process.on("SIGING", async () => {
  await mongoose.disconnect();
  console.log('Server stop');
  process.exit();
});