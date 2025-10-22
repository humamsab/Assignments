const express = require("express");
const { user, course } = require("../Db");
const userMiddleware = require("../middlewares/user");
const userRouter = express.Router();

userRouter.post("/signup", function(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    
    user.create({
        username,
        password
    })
    res.json({
        message: "user signed up successfully"
    })
})

userRouter.get("/course", async function(req, res) {
    const response = await course.find({});
    
    res.json({
        courses: response
    })
})

userRouter.post("/course/:courseId", userMiddleware, async function(req, res) {
    const courseId = req.params.courseId;
    const username = req.headers.username;

    await user.updateOne(
        { username },
        { $push: { purchasedCourses: courseId } }  
    );

    res.json({
        message: "Course purchased successfully"
    });
});

userRouter.get("/purchasedCourse", userMiddleware, async function(req, res) {
    const currentUser = await user.findOne({
        username: req.headers.username
    });

    const purchasedCourses = await course.find({
        _id: {
            "$in": currentUser.purchasedCourses
        }
    });
    res.json({
        courses: purchasedCourses
    })
})

module.exports = {
    userRouter: userRouter 
}