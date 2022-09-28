var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Pack = new Schema({

  id: {
    type: String
  },
  pack_name: {
    type: String
  },
  socialAccounts: {
    type: JSON
  },
  created_at: {
    type: Date,
  
  },
  updated_at: {
    type: Date,
   
  },
  prix: {
    type: Number
  },
  maxFansNumber: {
    type: Number
  }
});
module.exports = mongoose.model('Pack', Pack);
