const { Router } = require("express")

const courseRouter = Router()


courseRouter.post("/purchase", function (req, res) {
    res.json({
        message: "Purchased courses"
    })

})


courseRouter.get("/preview", function (req, res) {
    res.json({
        message: "Couese Preview"
    })

})


module.exports = {
    courseRouter
}