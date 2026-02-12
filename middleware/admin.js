require('dotenv').config()

const jwt = require("jsonwebtoken")

function adminMiddleware(req, res, next) {

    const token = req.headers.token;
    const decoded = jwt.verify(token, JWT_ADMIN_SECRET)

    if (decoded) {
        req.userId = decoded.id
        next()
    } else {
        res.status(403).json({
            message: "You are not an admin user"
        })
    }

}

module.exports = {
    adminMiddleware,
}



