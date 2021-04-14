const express = require("express");
const router = express.Router();
const routerQuestion = require("./question");
const routerUser = require("./user");
const controllerUser = require("../controllers/user");
const controllerToken = require("../controllers/token");
const {checkBodyFields} = require("../utils/checkBodyFields");


app.post("/token", (req, res, next) => {
  checkBodyFields(["username"], req, res, next)
}, controllerToken.createToken);
app.use("/user", routerUser);
app.all("*", controllerUser.checkSession, controllerToken.checkToken);
router.use("/question", routerQuestion);

module.exports = router;