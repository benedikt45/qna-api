const express = require("express");
const questionRouter = require("./routes/question.js");
const mongoose = require("mongoose");
const configuration = require("./configuration.js");
const authTokenRouter = require("./routes/authToken.js");
const authTokenController = require("./controllers/authToken.js");
const authUserRouter = require("./routes/authLogin.js");
const bodyParser = require('body-parser');
const trace = require("./utils/trace.js");
const cors = require("cors");


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(cors());

app.use((req, res, next) => trace('Unknown', req, res, next));

//app.use("/authToken", authTokenRouter);
app.use(authTokenController.authenticateToken);

app.use("/auth", authUserRouter);

app.use("/question", questionRouter);

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send(err.message);
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
