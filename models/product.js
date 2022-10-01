var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const validator = require('validator');

var ProductSchema = new Schema({


  name: {
        type: String,
 },
  categorie: {
        type: String,
    },
    description: {
        type: String,
    },
  prix: {
        type: Number,
        required: true
    },

});




module.exports = mongoose.model('Product', ProductSchema);