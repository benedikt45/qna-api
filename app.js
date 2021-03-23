const express = require("express");
const app = express();
const error = require("./controllers/404.js")
const questionRouter = require("./routes/question.js");
const questionController = require("./controllers/question.js")
const configuration = require("./configuration.js")


app.use("/question", questionRouter);
app.use(error);

app.listen(3000, async () => {
  await questionController.connectMongodb(configuration.mongodbQNAUrl)
  console.log('Start server');
});

process.on("SIGING", async () => {
  await mongoose.disconnect();
  process.exit();
});