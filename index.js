const express = require("express")
const app = express()


app.post("/user/signup", function (req, res) {
    res.json({
        message: "You are signed up"
    })

})

app.post("/user/signup", function (req, res) {
    res.json({
        message: "You are signed in"
    })

})

app.post("/courses", function (req, res) {
    res.json({
        message: "You have courses"
    })

})


app.post("/admin", function (req, res) {
    res.json({
        message: "You are signed up"
    })

})

app.listen(3000)