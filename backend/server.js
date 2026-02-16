const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 10000;

// Temporary in-memory database
let users = [];
let currentId = 1;

/* GET all users */
app.get('/users', (req, res) => {
  res.json(users);
});

/* CREATE user */
app.post('/users', (req, res) => {
  const newUser = { id: currentId++, ...req.body };
  users.push(newUser);
  res.status(201).json(newUser);
});

/* UPDATE user */
app.put('/users/:id', (req, res) => {
  const id = Number(req.params.id);
  users = users.map(user =>
    user.id === id ? { ...user, ...req.body } : user
  );
  const updatedUser = users.find(user => user.id === id);
  res.json(updatedUser);
});

/* DELETE user */
app.delete('/users/:id', (req, res) => {
  const id = Number(req.params.id);
  users = users.filter(user => user.id !== id);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});