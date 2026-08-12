const express = require('express');
const router = express.Router();
const db = require('../database/database');

// GET /api/rentals/user/:userId - Retrieve all rentals for a specific user
router.get('/user/:userId', (req, res) => {
  const userId = req.params.userId;
  
  // Join rentals with cars to provide name/info about the rented car
  const sql = `
    SELECT r.id, r.userId, r.carId, r.startDate, r.endDate, r.totalPrice,
           c.name as carName, c.description as carDescription
    FROM rentals r
    JOIN cars c ON r.carId = c.id
    WHERE r.userId = ?
  `;

  db.all(sql, [userId], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// POST /api/rentals - Create a new rental
router.post('/', (req, res) => {
  const { userId, carId, startDate, endDate } = req.body;

  if (!userId || !carId || !startDate || !endDate) {
    return res.status(400).json({ error: 'userId, carId, startDate, and endDate are required' });
  }

  // Parse and validate dates
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return res.status(400).json({ error: 'Invalid startDate or endDate format. Use YYYY-MM-DD' });
  }

  const diffTime = end.getTime() - start.getTime();
  if (diffTime < 0) {
    return res.status(400).json({ error: 'endDate must be on or after startDate' });
  }

  // Calculate rental duration in days (minimum 1 day)
  const diffDays = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

  // Retrieve the car's pricePerDay
  db.get('SELECT pricePerDay, available FROM cars WHERE id = ?', [carId], (err, car) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!car) {
      return res.status(404).json({ error: 'Car not found' });
    }

    const totalPrice = diffDays * car.pricePerDay;

    // Insert the rental booking
    const sqlInsert = `
      INSERT INTO rentals (userId, carId, startDate, endDate, totalPrice)
      VALUES (?, ?, ?, ?, ?)
    `;

    db.run(sqlInsert, [userId, carId, startDate, endDate, totalPrice], function(err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      const rentalId = this.lastID;

      // Retrieve and return the created rental record
      db.get('SELECT * FROM rentals WHERE id = ?', [rentalId], (err, newRental) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        res.status(201).json(newRental);
      });
    });
  });
});

module.exports = router;
