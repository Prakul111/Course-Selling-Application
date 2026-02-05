const { Router } = require("express")

const userRouter = Router()


userRouter.post("/signup", function (req, res) {
    res.json({
        message: "You are signed up"
    })

})

userRouter.post("/signup", function (req, res) {
    res.json({
        message: "You are signed in"
    })

})

userRouter.get("/purchase", function (req, res) {
    res.json({
        message: "You are signed in"
    })

})


module.exports = {
    userRouter
}

