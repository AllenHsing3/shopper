const mongoose = require('mongoose')
const config = require('config')

const connectDB = async() => {
    const db = config.get("mongoURI")
    try {
        await mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
        console.log("DB Connected")
    } catch (err) {
        console.error(err)
        process.exit(1)
    }
}

module.exports = connectDB