const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json()); // Middleware to parse JSON

const TODO_FILE = "todos.json";

// Helper function to read todos from file
const readTodos = () => {
    if (!fs.existsSync(TODO_FILE)) return [];
    const data = fs.readFileSync(TODO_FILE);
    return JSON.parse(data);
};

// Helper function to write todos to file
const writeTodos = (todos) => {
    fs.writeFileSync(TODO_FILE, JSON.stringify(todos, null, 2));
};

// POST - Add a new todo
app.post('/', (req, res) => {
    const todos = readTodos();
    const { title } = req.body;
    const id = todos.length ? todos[todos.length - 1].id + 1 : 1;

    const newTodo = { id, title };
    todos.push(newTodo);
    writeTodos(todos);

    res.status(201).json(newTodo);
});

// DELETE - Remove a todo
app.delete('/', (req, res) => {
    let todos = readTodos();
    const { id } = req.body;

    const filteredTodos = todos.filter(todo => todo.id !== id);

    if (todos.length === filteredTodos.length) {
        return res.status(404).json({ message: "TODO not found" });
    }

    writeTodos(filteredTodos);
    res.json({ message: "TODO deleted successfully" });
});

// GET - Retrieve all todos
app.get('/', (req, res) => {
    res.json({ todos: readTodos() });
});

// PUT - Update a todo
app.put('/', (req, res) => {
    let todos = readTodos();
    const { id, title } = req.body;

    const index = todos.findIndex(todo => todo.id === id);
    if (index === -1) return res.status(404).json({ message: "TODO not found" });

    todos[index].title = title;
    writeTodos(todos);

    res.json(todos[index]);
});

// Start the server
app.listen(3000, () => console.log("Server running on port 3000"));
