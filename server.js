const express = require('express')
const connectDB = require('./config/db')
const app = express()
const path = require('path')
app.use(express.json({extended: false}))
app.use('/user', require('./routes/user'))
app.use('/item', require('./routes/items'))
app.use('/cart', require('./routes/cart'))
app.use('/payment', require('./routes/payment'))

if(process.env.NODE_ENV === 'production') {
    //Set static folder:
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

connectDB()
const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`You're running on port ${PORT}`))