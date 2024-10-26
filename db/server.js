const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Sequelize, Model, DataTypes } = require('sequelize');

const app = express();
const port = 3005;

// Create Sequelize instance
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
});

// Define User model
class User extends Model {}
User.init({
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING
}, { sequelize, modelName: 'user' });

// Define Todo model
class Todo extends Model {}
Todo.init({
  message: DataTypes.STRING,
  priority: DataTypes.STRING, // Add priority field
  userId: DataTypes.INTEGER    // Add userId field
}, { sequelize, modelName: 'todo' });

// Sync models with database

// Sync models with database
sequelize.sync({ alter: true }).then(() => console.log('Database synced'));


// Middleware for parsing request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Enable CORS
app.use(cors());

// CRUD routes for User model
app.get('/users', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

app.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

app.post('/users', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create user' });
  }
});

app.put('/users/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      await user.update(req.body);
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to update user' });
  }
});

app.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      await user.destroy();
      res.json({ message: 'User deleted' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

// Simple Login route without hashing
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    res.json({ message: 'Login successful', user });
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
});

// CRUD routes for Todo model
app.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.findAll();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
});


// Retrieve todos for a specific user
app.get('/todos/user/:userId', async (req, res) => {
  const userId = req.params.userId; // Get userId from request parameters
  try {
    const todos = await Todo.findAll({
      where: { userId } // Find todos that belong to the user
    });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch todos for the user' });
  }
});

// Delete a specific todo for a specific user
app.delete('/todos/user/:userId/:todoId', async (req, res) => {
  const { userId, todoId } = req.params;

  try {
      const todo = await Todo.findOne({ where: { id: todoId, userId } });
      if (todo) {
          await todo.destroy();
          res.json({ message: 'Todo deleted successfully' });
      } else {
          res.status(404).json({ message: 'Todo not found for this user' });
      }
  } catch (err) {
      res.status(500).json({ error: 'Failed to delete todo' });
  }
});


app.get('/todos/:id', async (req, res) => {
  try {
    const todo = await Todo.findByPk(req.params.id);
    if (todo) {
      res.json(todo);
    } else {
      res.status(404).json({ message: 'Todo not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch todo' });
  }
});

// POST route to create a new todo with userId
app.post('/todos', async (req, res) => {
  const { message, priority, userId } = req.body;
  
  console.log('Incoming todo data:', req.body); // Log incoming data
  
  try {
    const todo = await Todo.create({ message, priority, userId });
    res.status(201).json(todo);
  } catch (err) {
    console.error('Error creating todo:', err); // Log the error for debugging
    res.status(500).json({ error: 'Failed to create todo' });
  }
});


app.put('/todos/:id', async (req, res) => {
  try {
    const todo = await Todo.findByPk(req.params.id);
    if (todo) {
      await todo.update(req.body);
      res.json(todo);
    } else {
      res.status(404).json({ message: 'Todo not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to update todo' });
  }
});


// Update a specific todo for a specific user
app.put('/todos/user/:userId/:todoId', async (req, res) => {
  const { userId, todoId } = req.params;
  const { message, priority } = req.body;

  try {
      const todo = await Todo.findOne({ where: { id: todoId, userId } });
      if (todo) {
          await todo.update({ message, priority });
          res.json(todo);
      } else {
          res.status(404).json({ message: 'Todo not found for this user' });
      }
  } catch (err) {
      res.status(500).json({ error: 'Failed to update todo' });
  }
});


app.delete('/todos/:id', async (req, res) => {
  try {
    const todo = await Todo.findByPk(req.params.id);
    if (todo) {
      await todo.destroy();
      res.json({ message: 'Todo deleted' });
    } else {
      res.status(404).json({ message: 'Todo not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete todo' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
