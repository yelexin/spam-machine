var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var proxySchema = new Schema({
  protocol: String,
  socket: String
});
var Proxy = mongoose.model('Proxy', proxySchema);
module.exports = Proxy