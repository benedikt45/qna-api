

function checkBody(req, res, next) {
  if (!req.body || req.body.constructor === Object && Object.keys(req.body).length === 0) {
    return res.sendStatus(400);
  }
  next();
}

module.exports = {checkBody}