const bcrypt = require("bcrypt");
const express = require("express");
const { UserModel, TodoModel } = require("./db");
const jwt =  require("jsonwebtoken");
const mongoose = require("mongoose");
const JWT_SECRET = "supersecret";

mongoose.connect("mongodb+srv://admin:mYS4WnPJAXPhRr5Z@cluster0.pfkjbno.mongodb.net/todo-app-database");
const app = express();
app.use(express.json());

app.post("/signup", async function(req, res){
    const username = req.body.username;
    const password = req.body.password;
    const name = req.body.name;
    
    let errorThrown = false;
    try {
        const hashedPassword = await bcrypt.hash(password, 5);
        console.log(hashedPassword);
    
        await UserModel.create({
            username: username,
            password: hashedPassword,
            name: name
        });
    } catch(e) {
        res.json({
            message: "user already exists"
        })
        errorThrown = true;
    }
    if  (!errorThrown) {
        res.json({ 
            message: "you are signed up"
        })
    }
});

app.post("/signin", async function(req, res){
    const username = req.body.username;
    const password = req.body.password;

    const response = await UserModel.findOne({
        username: username
    });
    if (!response) {
        res.status(403).json({
            message: "user does not exist in our DB"
        })
        return
    }

    const passwordMatch = await bcrypt.compare(password, response.password);
    
    if (passwordMatch) {
        const token = jwt.sign({
            id: response._id.toString()
        }, JWT_SECRET);
        res.json({
            token: token
        });
    }else {
        res.status(403).json({
            message: "Incorrect Credentials"
        })
    }
});

app.post("/todo", auth, async function(req, res) {
    const userId = req.userId;
    const title = req.body.title;
    const done = req.body.done;

    await TodoModel.create({
        userId,
        title,
        done
    });

    res.json({
        message: "Todo created"
    })
});

app.get("/todos", auth, async function(req, res) {
    const userId = req.userId;

    const todos = await TodoModel.find({
        userId
    });

    res.json({
        todos
    })
});
function auth(req, res, next){
    const token = req.headers.token;
    const decodedData = jwt.verify(token, JWT_SECRET);

    if (decodedData) {
        req.userId = decodedData.id;
        next();
    }else {
        res.status(403).json({
            message: "Incorrect Credentials"
    })
}
}

app.listen(3000);