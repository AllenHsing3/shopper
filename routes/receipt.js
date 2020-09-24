const express = require('express');
const Cart = require('../models/Cart')
const Receipt = require('../models/Receipt')
const router = express.Router();
const auth = require('../middleware/auth')

// Create Receipt 
router.post('/create-receipt', async(req, res) => {
    const {userId, cartTotal, cartItems} = req.body
    let newReceipt = new Receipt({
        userId: userId,
        receiptTotal: cartTotal,
        receiptItems: cartItems
    })
    newReceipt.save()
    res.send(newReceipt)
})

module.exports = router