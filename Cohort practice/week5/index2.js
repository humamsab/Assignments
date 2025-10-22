const express = require("express");

const app = express();
// logs the method, url, timestamp

function loggerMiddleware(req, res, next) {
    console.log("method is " + req.method);
    console.log("host is " + req.hostname);
    console.log("route is " +req.url);
    console.log(new Date());
    next();
}
app.use(loggerMiddleware);

app.get("/sum", function(req, res) {
    const a = parseInt(req.params.a);
    const b = parseInt(req.params.b);

    res.json({
        ans: a + b
    })
});

app.get("/multiply", function(req, res) {
    const a = req.query.a;
    const b = req.query.b;
    res.json({
        ans: a * b
    })
});

app.get("/divide", function(req, res) {
    const a = req.query.a;
    const b = req.query.b;
    res.json({
        ans: a / b
    })

});

app.get("/subtract", function(req, res) {
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);
    res.json({
        ans: a - b
    })
});

app.listen(3000);