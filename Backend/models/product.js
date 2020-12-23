const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
  item: { type: String, required: true },
  type: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  
});


module.exports = mongoose.model('Product', productSchema);
