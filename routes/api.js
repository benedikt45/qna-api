const express = require("express");
const router = express.Router();
const routerQuestion = require("./question");
const routerUser = require("./user");
const controllerUser = require("../controllers/user");
const controllerToken = require("../controllers/token");
const {checkBodyFields} = require("../utils/checkBodyFields");


router.post("/token", (req, res, next) => {
  checkBodyFields(["username"], req, res, next)
}, controllerToken.createToken);
router.use("/user", routerUser);
router.all("*", controllerUser.checkSession, controllerToken.checkToken);
router.use("/question", routerQuestion);

router.use(function(req, res, next) {
  res.status(404).send("Sorry cant find that!");
});

module.exports = router;