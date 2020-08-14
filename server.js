const express = require('express')
const connectDB = require('./config/db')
const app = express()
app.use(express.json({extended: false}))
app.use('/user', require('./routes/user'))

connectDB()
const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`You're running on port ${PORT}`))