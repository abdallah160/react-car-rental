const express = require('express');
const router = express.Router();
const db = require('../database/database');

// GET /api/rentals/user/:userId - Retrieve all rentals for a specific user
router.get('/user/:userId', (req, res) => {
  const userId = Number(req.params.userId);
  const dbData = db.read();
  
  // Filter rentals by userId
  const userRentals = dbData.rentals.filter(r => r.userId === userId);
  
  // Join with car info to simulate SQL JOIN
  const result = userRentals.map(r => {
    const car = dbData.cars.find(c => c.id === r.carId);
    return {
      id: r.id,
      userId: r.userId,
      carId: r.carId,
      startDate: r.startDate,
      endDate: r.endDate,
      totalPrice: r.totalPrice,
      carName: car ? car.name : 'Unknown Car',
      carDescription: car ? car.description : ''
    };
  });
  
  res.json(result);
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

  const dbData = db.read();
  const car = dbData.cars.find(c => c.id === Number(carId));
  
  if (!car) {
    return res.status(404).json({ error: 'Car not found' });
  }

  const totalPrice = diffDays * car.pricePerDay;
  const nextId = dbData.rentals.reduce((max, r) => r.id > max ? r.id : max, 0) + 1;

  const newRental = {
    id: nextId,
    userId: Number(userId),
    carId: Number(carId),
    startDate,
    endDate,
    totalPrice
  };

  dbData.rentals.push(newRental);
  db.write(dbData);

  res.status(201).json(newRental);
});

module.exports = router;
