const { Router } = require("express")
const { UserModel } = require("../db")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { z } = require("zod")
const userRouter = Router()
const dotenv = require("dotenv")
dotenv.config()



userRouter.post("/signup", async function (req, res) {
    const user = z.object({
        email: z.email(),
        password: z.string().min(6).max(50),
        firstName: z.string().min(5).max(50),
        lastName: z.string().min(5).max(50)

    })

    const isUser = user.safeParse(req.body)

    if (!isUser.success) {
        return res.status(404).json({
            message: "Invalid Inputs",
            error: isUser.error.errors
        })
    }

    const { email, password, firstName, lastName } = req.body;

    const hashedPassword = await bcrypt.hash(password, 5)

    await UserModel.create({
        email,
        password: hashedPassword,
        firstName,
        lastName,
    })
    res.json({
        mesage: "You are signed up"
    })

})

userRouter.post("/signin", async function (req, res) {
    const { email, password } = req.body;

    const requiredUser = await UserModel.findOne({
        email: email,
    })

    if (!requiredUser) {
        return res.status(403).json({
            message: "User doesn't exist"
        })
    }

    const passwordMatch = await bcrypt.compare(password, requiredUser.password)


    if (passwordMatch) {
        const token = jwt.sign({
            id: requiredUser._id.toString()
        }, process.env.JWT_USER_SECRET)

        res.json({
            token: token
        })
    } else {
        res.status(404).json({
            message: "Wrong Credentials",
        })
    }


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
