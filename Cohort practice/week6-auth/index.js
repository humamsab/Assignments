const express = require('express');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'randomabc';
const app = express();
app.use(express.json());
const users = [];

function logger(req, res, next) {
    console.log(req.method + "request came");
    next();
}
app.get("/", function(req, res){
    res.sendFile(__dirname + "/public/index.html");
})
app.post("/signup", logger, function(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    users.push({
        username: username,
        password: password
    })

    res.json({
        message: "you are signed up"
    })
    console.log(users);
})



app.post("/signin", logger, function(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        const token = jwt.sign({
            username: username
        }, JWT_SECRET);
        
        //user.token = token;
        res.send({
            token
        })
        console.log(users);
    } else {
        res.status(403).send({
            message: "Invalid username or password"
        })
    }
    console.log(users);
});

function auth(req, res, next) {
    const token = req.headers.token;
    const decodeData = jwt.verify(token, JWT_SECRET);

    if(decodeData.username) {
        req.username = decodeData.username;
        next()
    }else {
        res.json({
            message: "you are not logged in"
    })
}
}

app.get("/me", logger, auth, function(req, res){ 
    const currentUser = req.username;
    let foundUser = null;

    for (let i = 0; i < users.length; i++) {
        if (users[i].username === currentUser) {
            foundUser = users[i];
        }
    }

    if (!foundUser) {
        return res.status(404).json({ message: "User not found" });
    }

    res.json({
        username: foundUser.username
        // don’t send password in real apps
    })
})


app.listen(3000);
