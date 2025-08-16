const express = require("express");
const fs = require("fs");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

const cors = require("cors");
app.use(cors());

app.use(express.static("frontend"));

const TODO_FILE = "todos.json";
const USER_FILE = "users.json";
const SECRET = "supersecret"; // in real apps, use env vars

const path = require("path");

// Serve index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});


// Helper: read/write JSON
const readData = (file) => fs.existsSync(file) ? JSON.parse(fs.readFileSync(file)) : [];
const writeData = (file, data) => fs.writeFileSync(file, JSON.stringify(data, null, 2));

/* ===================== AUTH ROUTES ===================== */

// Signup
app.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  let users = readData(USER_FILE);

  if (users.find(u => u.username === username)) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPass = await bcrypt.hash(password, 10);
  users.push({ username, password: hashedPass });
  writeData(USER_FILE, users);

  res.status(201).json({ message: "Signup successful" });
});

// Signin
app.post("/signin", async (req, res) => {
  const { username, password } = req.body;
  let users = readData(USER_FILE);

  const user = users.find(u => u.username === username);
  if (!user) return res.status(404).json({ message: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: "Invalid password" });

  const token = jwt.sign({ username }, SECRET, { expiresIn: "1h" });
  res.json({ token });
});

// Middleware: verify token
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "No token provided" });

  const token = authHeader.split(" ")[1];
  try {
    req.user = jwt.verify(token, SECRET);
    next();
  } catch {
    res.status(403).json({ message: "Invalid token" });
  }
};


// GET todos (for logged-in user)
app.get("/todos", authMiddleware, (req, res) => {
  let todos = readData(TODO_FILE);
  let userTodos = todos.filter(t => t.username === req.user.username);
  res.json(userTodos);
});

// POST new todo
app.post("/todos", authMiddleware, (req, res) => {
  let todos = readData(TODO_FILE);
  const id = todos.length ? todos[todos.length - 1].id + 1 : 1;

  const newTodo = { id, title: req.body.title, username: req.user.username };
  todos.push(newTodo);
  writeData(TODO_FILE, todos);

  res.status(201).json(newTodo);
});

// PUT update todo
app.put("/todos/:id", authMiddleware, (req, res) => {
  let todos = readData(TODO_FILE);
  const todo = todos.find(t => t.id == req.params.id && t.username === req.user.username);

  if (!todo) return res.status(404).json({ message: "Todo not found" });

  todo.title = req.body.title;
  writeData(TODO_FILE, todos);

  res.json(todo);
});

// DELETE todo
app.delete("/todos/:id", authMiddleware, (req, res) => {
  let todos = readData(TODO_FILE);
  const newTodos = todos.filter(t => !(t.id == req.params.id && t.username === req.user.username));

  if (todos.length === newTodos.length) {
    return res.status(404).json({ message: "Todo not found" });
  }

  writeData(TODO_FILE, newTodos);
  res.json({ message: "Todo deleted" });
});
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});