const express = require('express');
const router = express.Router();
const stripe = require("stripe")("sk_test_51HItWYKO7o30XvjPJHZXn4gHD9JWV6XoTc3gFsuQa6ypbPLY5wvfGXFQH89yxZiAtGuDL4lGIpdmDlBn35cJHG1f00uyA6jw9V");

app.post('/create-payment-intent', async (req, res) => {
  const { items } = req.body;
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),

    currency: 'usd',
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});
module.exports = router;
