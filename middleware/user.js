
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config()

function userMiddleware(req, res, next) {

    const token = req.headers.token;
    const decoded = jwt.verify(token, JWT_USER_SECRET)

    if (decoded) {
        req.userId = decoded.id
        next()
    } else {
        res.status(403).json({
            message: "You are not a user"
        })
    }


}

module.exports = {
    userMiddleware: userMiddleware
}