const mongoose = require("mongoose");


const Schema = mongoose.Schema;

const tokenSchema = new Schema({
  username: String,
  token: String,
  issuedAt: Date,
});

module.exports = mongoose.model("Token", tokenSchema);