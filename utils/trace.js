

module.exports = function (nameAPI, req, res, next) {
  console.log(`${nameAPI} request ${new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')}`);
  next();
}