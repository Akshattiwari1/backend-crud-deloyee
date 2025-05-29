const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all users
router.get('/', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json(results);
  });
});

// Create a new user
router.post('/', (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  db.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email], (err, result) => {
    if (err) return res.status(500).json({ error: 'Insert failed' });
    res.status(201).json({ message: 'User created', id: result.insertId });
  });
});

// Update a user
router.put('/:id', (req, res) => {
  const { name, email } = req.body;
  const { id } = req.params;

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  db.query('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Update failed' });
    res.json({ message: 'User updated' });
  });
});

// Delete a user
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM users WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Delete failed' });
    res.json({ message: 'User deleted' });
  });
});

module.exports = router;
