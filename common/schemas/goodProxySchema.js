var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var goodProxySchema = new Schema({
  protocol: String,
  socket: String,
  stable: Boolean
});
var GoodProxy = mongoose.model('GoodProxy', goodProxySchema);
module.exports = GoodProxy