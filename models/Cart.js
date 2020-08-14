const mongoose = require('mongoose')

const CartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    cartTotal: Number,
    cartItems: [{ 
        cartItem: {
            itemId: mongoose.Schema.Types.ObjectId,
            ref: 'item'
        },
        quantityInCart: Number
    }]
})

module.exports = Cart = mongoose.model('cart', CartSchema)