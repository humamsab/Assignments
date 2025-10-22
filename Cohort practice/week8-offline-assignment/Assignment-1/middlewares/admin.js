const { admin } = require("../Db");

async function adminMiddleware(req, res, next) {
  try {
    const username = req.headers.username;
    const password = req.headers.password;

    const value = await admin.findOne({ username, password });
    if (value) {
      next();
    } else {
      res.status(403).json({ message: "admin doesnt exist" });
    }
  } catch (err) {
    res.status(500).json({ message: "server error", error: err.message });
  }
}

module.exports = adminMiddleware;
