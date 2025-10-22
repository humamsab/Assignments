const express = require("express");
const adminMiddleware = require("../middlewares/admin");
const { admin, course } = require("../Db");
const adminRouter = express.Router();

adminRouter.post("/signup", async function(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    await admin.create({
        username: username,
        password: password
    })
    res.json({
        message: "admin signed up successfully"
    })
})

adminRouter.post("/course", adminMiddleware, async function(req, res) {
    const  {title, description, price, imageUrl } = req.body;

    const newCourse = await course.create({
        title,
        description,
        price,
        imageUrl
    })
    res.json({
        message: "Course created successfully",
        courseId: newCourse._id
    })
})

adminRouter.get("/courses", adminMiddleware, async function(req, res) {
    const response = await course.find({});
    
    res.json({
        courses: response
    })
})

module.exports = {
    adminRouter: adminRouter 
}