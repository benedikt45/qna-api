const express = require("express");
const questionRouter = require("./routes/question.js");
const mongoose = require("mongoose");
const configuration = require("./configuration.js");
const authRouter = require("./routes/auth.js");
const authController = require("./controllers/auth.js");
const bodyParser = require('body-parser');
const trace = require("./utils/trace.js");
const cors = require("cors");


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(cors());

app.use((req, res, next) => trace('Unknown', req, res, next))

app.use("/auth", authRouter);
app.use(authController.authenticateToken);

app.use("/question", questionRouter);

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send(err);
})

app.listen(3001, async () => {
  await mongoose.connect(configuration.qnaStringConnection, { useUnifiedTopology: true, useNewUrlParser: true });
  console.log('Server start');
});

process.on("SIGING", async () => {
  await mongoose.disconnect();
  console.log('Server stop');
  process.exit();
});
