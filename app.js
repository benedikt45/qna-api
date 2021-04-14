const express = require("express");
const mongoose = require("mongoose");
const configuration = require("./configuration.js");
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const routerAPI = require("./routes/api");


const app = express();
const sess = {
  secret: configuration.token.session_secret,
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({
    mongoUrl: configuration.mongodb.connectionString,
  }),
  cookie: {
    // maxAge: configuration.cookie.maxAge,
  }
};

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', true);
  sess.cookie.secure = true;
}
app.use(session(sess));

app.use("/api", routerAPI);

app.use((err, req, res, next) => {
  console.log(err);
  if (process.env.NODE_ENV !== "production") {
    res.status(500).send(err.message);
  } else {
    res.sendStatus(500);
  }
});

const port = process.env.SERVER_PORT || 3001;

app.listen(port, async () => {
  await mongoose.connect(configuration.mongodb.connectionString, {useUnifiedTopology: true, useNewUrlParser: true});
  console.log('Server start');
});

process.on("SIGING", async () => {
  await mongoose.disconnect();
  console.log('Server stop');
  process.exit();
});
