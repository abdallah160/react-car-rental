const express = require('express');
const router = express.Router();
const db = require('../database/database');

// Helper to format car response (parse JSON images, convert available to boolean)
function formatCar(row) {
  if (!row) return null;
  return {
    ...row,
    images: row.images ? JSON.parse(row.images) : [],
    available: row.available === 1
  };
}

// GET /api/cars - Get all cars
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM cars';
  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    const formattedCars = rows.map(formatCar);
    res.json(formattedCars);
  });
});

// GET /api/cars/:id - Get a single car
router.get('/:id', (req, res) => {
  const sql = 'SELECT * FROM cars WHERE id = ?';
  db.get(sql, [req.params.id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: 'Car not found' });
    }
    res.json(formatCar(row));
  });
});

// POST /api/cars - Create a new car
router.post('/', (req, res) => {
  const { name, description, pricePerDay, images, available } = req.body;

  if (!name || !description || pricePerDay === undefined) {
    return res.status(400).json({ error: 'Name, description, and pricePerDay are required' });
  }

  const sql = `
    INSERT INTO cars (name, description, pricePerDay, images, available)
    VALUES (?, ?, ?, ?, ?)
  `;
  
  const imagesStr = JSON.stringify(images || []);
  const availableVal = available === false ? 0 : 1;

  // Use a standard function (not an arrow function) to access `this.lastID`
  db.run(sql, [name, description, pricePerDay, imagesStr, availableVal], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    const insertId = this.lastID;
    
    // Retrieve and return the newly created car
    db.get('SELECT * FROM cars WHERE id = ?', [insertId], (err, row) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json(formatCar(row));
    });
  });
});

// PUT /api/cars/:id - Update an existing car
router.put('/:id', (req, res) => {
  const { name, description, pricePerDay, images, available } = req.body;
  const carId = req.params.id;

  if (!name || !description || pricePerDay === undefined) {
    return res.status(400).json({ error: 'Name, description, and pricePerDay are required' });
  }

  const sql = `
    UPDATE cars 
    SET name = ?, description = ?, pricePerDay = ?, images = ?, available = ?
    WHERE id = ?
  `;

  const imagesStr = JSON.stringify(images || []);
  const availableVal = available === false ? 0 : 1;

  // Use standard function to access `this.changes`
  db.run(sql, [name, description, pricePerDay, imagesStr, availableVal, carId], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Car not found' });
    }

    // Retrieve and return the updated car
    db.get('SELECT * FROM cars WHERE id = ?', [carId], (err, row) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(formatCar(row));
    });
  });
});

// DELETE /api/cars/:id - Delete a car
router.delete('/:id', (req, res) => {
  const carId = req.params.id;
  const sql = 'DELETE FROM cars WHERE id = ?';

  db.run(sql, [carId], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Car not found' });
    }
    res.json({ message: 'Car deleted successfully', id: carId });
  });
});

module.exports = router;
