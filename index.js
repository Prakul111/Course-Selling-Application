const express = require("express")
const app = express()
// require('dotenv').config()

const dotenv = require("dotenv")
dotenv.config()


const { userRouter } = require("./routes/user")
const { courseRouter } = require("./routes/courses")
const { adminRouter } = require("./routes/admin")
const mongoose = require("mongoose")

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