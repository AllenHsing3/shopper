const express = require('express');
const Item = require('../models/Item');
const User = require('../models/User');
const Cart = require('../models/Cart');
const router = express.Router();
const auth = require('../middleware/auth');

// Add item to cart:
router.post('/addItem', async (req, res) => {
  const { itemId, quantity, userId } = req.body;
  try {
    let cart = await Cart.findOne({ userId });
    let item = await Item.findById(itemId);
    if (!item) {
      return res.status(400).send('Item not found');
    }
    const trimmedDescription = item.longDescription.substring(0, 150) + '...';
    // if (!cart) {
    //   cart = new Cart({
    //     userId,
    //     cartTotal: item.price * quantity,
    //   });
    //   cart.cartItems.push({
    //     cartItemName: item.name,
    //     cartItemId: itemId,
    //     cartItemCategory: item.category,
    //     quantityInCart: quantity,
    //     itemPrice: item.price,
    //     itemDescriptionShort: trimmedDescription,
    //     itemDescriptionLong: item.description,
    //   });
    //   cart.cartTotal = parseFloat(cart.cartTotal).toFixed(2);

    //   await cart.save();
    //   return res.status(201).send(cart);
    // } else {
      cart.cartItems.push({
        cartItemName: item.name,
        cartItemId: itemId,
        cartItemCategory: item.category,
        quantityInCart: quantity,
        itemPrice: item.price,
        itemDescriptionShort: trimmedDescription,
        itemDescriptionLong: item.description,
      });
      cart.cartTotal += item.price * quantity;
      cart.cartTotal = parseFloat(cart.cartTotal).toFixed(2);
      await cart.save();
      res.send(cart);
    
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Create Cart
router.post('/createNewCart', async (req, res) => {
  const userId = req.body.userId;
  try {
    const cart = new Cart({
      userId,
      cartTotal: 0,
    });
    // cart.cartItems.push({
    //   cartItemName: item.name,
    //   cartItemId: itemId,
    //   cartItemCategory: item.category,
    //   quantityInCart: quantity,
    //   itemPrice: item.price,
    //   itemDescriptionLong: trimmedDescription,
    //   itemDescriptionShort: item.description
    // });
    await cart.save();
  } catch (err) {
    console.error(err.message);
  }
});

// LOAD CART
router.get('/', auth, async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) {
      cart = new Cart({
        userId: req.user.Id,
      });
      await cart.save();
    }

    res.send(cart);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Delete cart item
router.delete('/:cartItemId', auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id });

    const removeIndex = cart.cartItems
      .map((e) => e.cartItemId)
      .indexOf(req.params.cartItemId);
    cart.cartTotal -= cart.cartItems[removeIndex].itemPrice;
    cart.cartTotal = parseFloat(cart.cartTotal).toFixed(2);

    cart.cartItems.splice(removeIndex, 1);

    await cart.save();
    res.send(cart);
  } catch (err) {
    console.error(err.message);
  }
});

// Delete all items in cart
router.delete('/delete-cart-items/:userId', async(req, res) => {
  try {
    let cart = await Cart.findOne({ userId: req.params.userId });
    cart.cartItems = []
    cart.cartTotal = 0
    await cart.save()
    res.send(cart)
  } catch (err) {
    console.error(err.message)
  }
})

module.exports = router;
