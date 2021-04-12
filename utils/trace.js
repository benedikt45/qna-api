

module.exports = function (path, req, res, next) {
  console.log(`${path} request ${new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')}`);
  next();
}