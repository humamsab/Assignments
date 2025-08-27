const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://admin:mYS4WnPJAXPhRr5Z@cluster0.pfkjbno.mongodb.net/course_selling_app")

const Schema = mongoose.Schema;

const adminSchema = new mongoose.Schema ({
    username: String,
    password: String
})

const userSchema = new mongoose.Schema ({
    username: {type: String, unique: true},
    password: String,
    purchasedCourses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'course'
    }]
})

const courseSchema = new mongoose.Schema ({
    title: String,
    description: String,
    price: Number,
    imageUrl: String
}) 

const admin = mongoose.model('admin', adminSchema);
const user = mongoose.model('user', userSchema);
const course = mongoose.model('course', courseSchema);

module.exports = {
    admin,
    user,
    course
}