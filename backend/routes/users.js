const express = require('express');
const router = express.Router();
const db = require('../database/database');

// POST /api/login - Simple login endpoint for frontend training
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const sql = 'SELECT * FROM users WHERE email = ?';
  db.get(sql, [email], (err, user) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    // Check if user exists and password matches
    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Return simple user profile (no JWT or complex auth required)
    res.json({
      id: user.id,
      name: user.name,
      role: user.role
    });
  });
});

module.exports = router;
