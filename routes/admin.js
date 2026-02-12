require('dotenv').config()

const { Router } = require("express")
const { AdminModel, CourseModel } = require("../db")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { z } = require("zod")
const { adminMiddleware } = require("../middleware/admin")


const adminRouter = Router()

adminRouter.post("/signup", async function (req, res) {
    const admin = z.object({
        email: z.email(),
        password: z.string().min(5).max(50),
        firstName: z.string().min(5).max(50),
        lastName: z.string().min(5).max(50)

    })

    const isAdmin = admin.safeParse(req.body)

    if (!isAdmin.success) {
        return res.status(404).json({
            message: "Invalid Inputs",
            error: isAdmin.error.errors
        })
    }

    const { email, password, firstName, lastName } = req.body;

    const hashedPassword = await bcrypt.hash(password, 5)

    await AdminModel.create({
        email,
        password: hashedPassword,
        firstName,
        lastName,
    })
    res.json({
        mesage: "You are signed up"
    })

})


adminRouter.post("/signin", async function (req, res) {
    const { email, password } = req.body;

    const requiredAdmin = await AdminModel.findOne({
        email: email,
    })

    if (!requiredAdmin) {
        return res.status(403).json({
            message: "User doesn't exist"
        })
    }

    const passwordMatch = await bcrypt.compare(password, requiredAdmin.password)


    if (passwordMatch) {
        const token = jwt.sign({
            id: requiredAdmin._id.toString()
        }, process.env.JWT_ADMIN_SECRET)

        res.json({
            token: token
        })
    } else {
        res.status(404).json({
            message: "Wrong Credentials",
        })
    }


})

adminRouter.post("/course", adminMiddleware, async function (req, res) {

    const adminId = req.userId
    const { title, description, imageUrl, price } = req.body

    const course = await CourseModel.create({
        title,
        description,
        imageUrl,
        price,
        creatorId: adminId
    })

    res.json({
        message: "Course created",
        courseId: course._id

    })

})

adminRouter.put("/course", adminMiddleware, async function (req, res) {
    const adminId = req.userId
    const { title, description, imageUrl, price, courseId } = req.body

    const course = await CourseModel.updateOne({
        _id: courseId,
        creatorId: adminId
    }, {
        title,
        description,
        imageUrl,
        price,
    })

    res.json({
        message: "Course Updated",
        courseId: course._id

    })


})



adminRouter.get("/course/bulk", adminMiddleware, async function (req, res) {

    const adminId = req.userId

    const courses = await CourseModel.find({
        creatorId: adminId
    })

    res.json({
        message: "Admin all course",
        courses
    })

})


module.exports = {
    adminRouter
}