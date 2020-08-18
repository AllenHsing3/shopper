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
        quantityInCart: Number
    }]
})

module.exports = Cart = mongoose.model('cart', CartSchema)