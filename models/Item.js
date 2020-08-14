const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  name: String,
  quantityInStock: Number,
  description: String,
  images: [
    {
      imageURL: String,
    },
  ],
  price: Number,
});

module.exports = Item = mongoose.model('item', ItemSchema)