const express = require('express')
const router = express.Router()
const config = require('config')
const nodeMailer = require('nodemailer')

router.post('/receipt', function (req, res) {
    let {orderNumber, name, orderItems} = req.body
    let transporter = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            // should be replaced with real sender's account
            user: 'shopperAllenHsing@gmail.com',
            pass: 'pizzahut123!'
        }
    });
    let mailOptions = {
        // should be replaced with real recipient's account
        to: 'allen.hsing@gmail.com',
        // subject: req.body.subject,
        // body: req.body.message
        subject: `Shopper Order Confirmation Number: ${orderNumber}`,
        html: '<h1>Thank you for your order! Please see your receipt at</h1>'
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

module.exports = router