const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  name: String,
  // quantityInStock: Number,
  description: String,
  images: [
    {
      imageURL: String,
    },
  ],
  price: Number,
  category: String
});

module.exports = Item = mongoose.model('item', ItemSchema)