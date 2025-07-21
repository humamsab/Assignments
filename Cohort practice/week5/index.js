const express = require("express");

const app = express();

let requestCount = 0;

function requestIncreaser() {
    requestCount = requestCount + 1;
    console.log("total number of requests = " + requestCount);
}

app.get("/sum/:a/:b", function(req, res) {
    requestIncreaser();
    const a = parseInt(req.params.a);
    const b = parseInt(req.params.b);

    res.json({
        ans: a + b
    })
});


app.get("/multiply/:a/:b", function(req, res) {
    requestIncreaser();
    const a = req.params.a;
    const b = req.params.b;
    res.json({
        ans: a * b
    })
});


app.get("/divide/:a/:b", function(req, res) {
    requestIncreaser();
    const a = req.params.a;
    const b = req.params.b;
    res.json({
        ans: a / b
    })
});


app.get("/substract/:a/:b", function(req, res) {
    requestIncreaser();
    const a = parseInt(req.params.a);
    const b = parseInt(req.params.b);

    res.json({
        ans: a - b
    })
});
app.listen(3000);