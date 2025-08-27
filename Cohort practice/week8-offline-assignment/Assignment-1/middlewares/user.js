const { user } = require("../Db");


function userMiddleware(req, res, next) {
    const username = req.headers.username;
    const password = req.headers.password;
    user.findOne ({
        username: username,
        password: password
    })
    .then(function(value) {
        if (value) {
            next()
        }else {
            res.status(403).json({
                message: "USER doesnt exist"
            })
        }
    })
}
module.exports = userMiddleware;
