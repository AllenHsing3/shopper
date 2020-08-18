const express = require('express');
const Item = require('../models/Item');
const User = require('../models/User');
const Cart = require('../models/Cart');
const router = express.Router();

// Add item to cart:
router.post('/addItem', async (req, res) => {
  const { itemId, quantity, userId } = req.body;
  try {
    let cart = await Cart.findOne({userId});
    let item = await Item.findById(itemId);
    if (!item) {
      return res.status(400).send('Item not found');
    }
    if (!cart) {
      cart = new Cart({
        userId,
        cartTotal: item.price * quantity,
      });
      cart.cartItems.push({
        cartItemName: item.name,
        cartItemId: itemId,
        quantityInCart: quantity,
      });
      await cart.save();
      return res.status(201).send(cart);
    } else {
      cart.cartItems.push({
        cartItemName: item.name,
        cartItemId: itemId,
        quantityInCart: quantity,
      });
      cart.cartTotal += item.price * quantity;
      await cart.save();
      res.send(cart);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
