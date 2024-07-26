const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://sunnysable2003:Sunit123@todos.tm7zxyr.mongodb.net/?retryWrites=true&w=majority&appName=todos', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to db'))
.catch((error) => console.error('Error connecting to MongoDB:', error));

const Todo = require('./models/Todo');

app.get('/todos', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch todos' });
    }
});

app.post('/todos/new', async (req, res) => {
    try {
        const todo = new Todo({
            text: req.body.text
        });
        await todo.save();
        res.json(todo);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create todo' });
    }
});

app.delete('/todos/delete/:id', async (req, res) => {
    try {
        const result = await Todo.findByIdAndDelete(req.params.id);
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete todo' });
    }
});

app.get('/todos/complete/:id', async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        todo.complete = !todo.complete;
        await todo.save();
        res.json(todo);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update todo' });
    }
});

app.listen(3001, () => {
    console.log('Server started on port 3001');
});
