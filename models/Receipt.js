const mongoose = require('mongoose')

const ReceiptSchema = new mongoose.Schema({
    userId: String,
    receiptTotal: Number,
    orderDate: {
        type: Date,
        default: Date.now
    },
    receiptItems: [{ 
        receiptItemName: String,
        receiptItemId: String,
        itemPrice: String,
        itemDescriptionLong: String,
        itemDescriptionShort: String,
        receiptItemCategory: String
    }]
})

module.exports = Receipt = mongoose.model('receipt', ReceiptSchema)