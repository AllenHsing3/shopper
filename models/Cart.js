const mongoose = require('mongoose')

const CartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    cartTotal: Number,
    cartItems: [{ 
        cartItemName: String,
        cartItemId: String,
        quantityInCart: Number,
        itemPrice: String,
        itemDescriptionLong: String,
        itemDescriptionShort: String,
        cartItemCategory: String
    }]
})

module.exports = Cart = mongoose.model('cart', CartSchema)