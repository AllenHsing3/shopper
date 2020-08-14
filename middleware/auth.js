const jwt = require('jsonwebtoken')
const config = require('config')

const auth = async(req, res, next) => {
    const token = req.header('x-auth-token')
    try {
        const decoded = await jwt.verify(token, config.get("jwtSecret"))
        req.user = decoded.user
        next()
    } catch (err) {
        console.error(err.message)
        res.status(401).send('No token')
    }
}

module.exports = auth