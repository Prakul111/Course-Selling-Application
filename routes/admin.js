const { Router } = require("express")
const { AdminModal } = require("../db")

const adminRouter = Router()

adminRouter.post("/signup", function (req, res) {
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password
    const firstName = req.body.firstName
    const lastName = req.body.lastName

    AdminModal.create({
        name: name,
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName
    })


    res.json({
        message: "Admin signed up"
    })


})


adminRouter.post("/signin", function (req, res) {
    res.json({
        message: "Admin signed in"
    })


})

adminRouter.post("/course", function (req, res) {
    res.json({
        message: "Admin create"
    })

})

adminRouter.put("/course", function (req, res) {
    res.json({
        message: "Admin create"
    })

})



adminRouter.get("/course/bulk", function (req, res) {
    res.json({
        message: "Admin get bulk course"
    })

})


module.exports = {
    adminRouter
}