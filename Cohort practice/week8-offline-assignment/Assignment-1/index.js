const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

const { adminRouter } = require("./routes/admin");
const { userRouter } = require("./routes/user");

app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/user", userRouter);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});