
module.exports = function (req, res, next) {
  const message404 = {"Error": "API path does't exist"};
  res.status(404).json(message404)
}