const jwt = require("jsonwebtoken")
require("dotenv").config()

const authentic = (req, res, next) => {
    let token = req.headers.authorization;
    if (token) {
        const decoded = jwt.verify(token, process.env.secretKey)
        if (decoded) {
            const userID = decoded.userID
            req.body.userID = userID
            next()
        } else {
            res.send("Wrong Information")
        }
    } else {
        res.send("Wrong Data")
    }
}

module.exports = { authentic }