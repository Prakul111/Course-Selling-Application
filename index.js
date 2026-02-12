require('dotenv').config()

const express = require("express")
const app = express()

const { rateLimit } = require("express-rate-limit")


const { userRouter } = require("./routes/user")
const { courseRouter } = require("./routes/courses")
const { adminRouter } = require("./routes/admin")
const mongoose = require("mongoose")

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 3,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    ipv6Subnet: 56,
})

app.use(limiter)
app.use(express.json())

app.use("/api/v1/user", userRouter)
app.use("/api/v1/course", courseRouter)
app.use("/api/v1/admin", adminRouter)


async function main() {
    await mongoose.connect(process.env.MONGO_DB)
    app.listen(3000)
    console.log("listening on port 3000");

}


main()