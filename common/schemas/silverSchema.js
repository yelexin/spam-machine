var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var silverSchema = new Schema({
  email: String,
  password: String
});
var Silver = mongoose.model('Silver', silverSchema);
module.exports = Silver