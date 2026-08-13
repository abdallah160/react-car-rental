const express = require('express');
const router = express.Router();
const db = require('../database/database');

// POST /api/login - Simple login endpoint for frontend training
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const dbData = db.read();
  const user = dbData.users.find(u => u.email === email);

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

module.exports = router;
