require("dotenv").config()

const { Router } = require("express")
const { UserModel, PurchaseModel, CourseModel } = require("../db")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { z } = require("zod")
const { userMiddleware } = require("../middleware/user")
const userRouter = Router()




userRouter.post("/signup", async function (req, res) {
    const user = z.object({
        email: z.email(),
        password: z.string().max(50),
        firstName: z.string().max(50),
        lastName: z.string().max(50)

    })

    const isUser = user.safeParse(req.body)

    if (!isUser.success) {
        return res.status(404).json({
            message: "Invalid Inputs",
            error: isUser.error.errors
        })
    }

    const { email, password, firstName, lastName } = req.body;


    const userAlredyExit = await UserModel.findOne({
        firstName,
        lastName
    })

    if (userAlredyExit) {
        return res.status(400).json({
            message: "User exist with firstname and lastname"
        })
    }



    try {
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

    } catch (e) {
        res.status(400).json({
            message: "User already exists"
        })
    }



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

userRouter.get("/purchases", userMiddleware, async function (req, res) {

    const userId = req.userId

    const purchases = await PurchaseModel.find({
        userId
    })

    const courseData = await CourseModel.find({
        _id: purchases.map(x => x.courseId)
    })


    res.json({
        purchases,
        courseData
    })

})




module.exports = {
    userRouter
}
