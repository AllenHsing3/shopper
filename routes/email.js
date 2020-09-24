const express = require('express');
const router = express.Router();
const config = require('config');
const nodeMailer = require('nodemailer');

router.post('/receipt', function (req, res) {
  let { _id, name, cartItems, email, cartTotal } = req.body;
  let transporter = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'shopperAllenHsing@gmail.com',
      pass: 'pizzahut123!',
    },
  });
  let htmlCartItems = '';
  for (i = 0; i < cartItems.length; i++) {
    htmlCartItems +=
      `<p>${cartItems[i].cartItemName}: $${cartItems[i].itemPrice}</p><p>${cartItems[i].itemDescriptionLong}</p>`;
  }
  let mailOptions = {
    to: email,
    subject: `Shopper Order Confirmation Number: ${_id}`,
    html: `<h3>Thank you for your order, ${name}! Here is your receipt for your recent order.</h3>` + htmlCartItems + `<h3>Total: $${cartTotal}</h3>`,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
  });
  // res.writeHead(301, { Location: 'index.html' });
  res.end();
});

module.exports = router;
