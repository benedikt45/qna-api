

exports.checkBodyFields = function (fields, req, res, next) {
  let textError = fields.reduce((text, elem) => {
    return (!req.body[elem] ? text + "," + elem : text + "");
  }, "").slice(1, this.length);
  if (textError !== "") {
    return res.status("400").send(`Required parameters are not filled: ${textError}!`)
  }
  next();
};