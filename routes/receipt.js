const express = require('express');
const Cart = require('../models/Cart');
const Receipt = require('../models/Receipt');
const router = express.Router();
const auth = require('../middleware/auth');

// Create Receipt
router.post('/create-receipt', async (req, res) => {
  const { userId, cartTotal, cartItems } = req.body;
  const newCart = cartItems.map(elm => ({ receiptItemName: elm.cartItemName, ...elm}));

  let newReceipt = new Receipt({
    userId: userId,
    receiptTotal: cartTotal,
    receiptItems: newCart,
  });
  newReceipt.save();
  res.send(newReceipt);
});

// GET all receipts
router.get('/:userId', async (req, res) => {
  try {
    const receipts = await Receipt.find({ userId: req.params.userId });
    res.send(receipts);
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
