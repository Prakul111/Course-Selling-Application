const { Router } = require("express")

const userRouter = Router()


userRouter.post("/signup", function (req, res) {
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password
    const firstName = req.body.firstName
    const lastName = req.body.lastName



    res.json({
        mesage: "You are signed up"
    })

})

userRouter.post("/signin", function (req, res) {
    res.json({
        message: "You are signed in"
    })

})

userRouter.get("/purchase", function (req, res) {
    res.json({
        message: "You are signed in"
    })

})

function auth(req, res, next) {


}


module.exports = {
    userRouter
}

