var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var goldSchema = new Schema({
  email: String,
  password: String
});
var Gold = mongoose.model('Gold', goldSchema);
module.exports = Gold