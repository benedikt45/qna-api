

function checkBody(req, res, next) {
  if (!req.body || req.body.constructor === Object && Object.keys(req.body).length === 0) {
    return res.status(400).send('Request params required!');
  }
  next();
}

function checkError(err, req, res, next) {
  if (err) {
    next(err);
  }
}

module.exports = {checkBody, checkError}