const mongoose = require("mongoose")

const Schema = mongoose.Schema
const ObjectId = mongoose.Schema.Types.ObjectId

const adminSchema = new Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    firstName: String,
    lastName: String,
})

const courseSchema = new Schema({
    title: String,
    description: String,
    price: Number,
    imageUrl: String,
    creatorId: ObjectId
})

const userSchema = new Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    firstName: String,
    lastName: String,
})

const purchaseSchema = new Schema({
    userId: ObjectId,
    courseId: ObjectId
})

const AdminModel = mongoose.model("admin", adminSchema)
const CourseModel = mongoose.model("course", courseSchema)
const UserModel = mongoose.model("user", userSchema)
const PurchaseModel = mongoose.model("purchase", purchaseSchema)


module.exports = {
    AdminModel,
    CourseModel,
    UserModel,
    PurchaseModel
}