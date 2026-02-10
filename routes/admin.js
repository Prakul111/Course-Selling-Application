const { Router } = require("express")
const { AdminModal } = require("../db")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { z } = require("zod")
const dotenv = require("dotenv")
dotenv.config()


const adminRouter = Router()

adminRouter.post("/signup", async function (req, res) {
    const admin = z.object({
        email: z.email(),
        password: z.string().min(6).max(50),
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

    await AdminModal.create({
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

    const requiredAdmin = await AdminModal.findOne({
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