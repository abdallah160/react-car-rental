const express = require('express');
const cors = require('cors');
const path = require('path');

// Import database (this will connect, initialize tables, and seed if empty)
const db = require('./database/database');

const carsRouter = require('./routes/cars');
const usersRouter = require('./routes/users');
const rentalsRouter = require('./routes/rentals');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for React frontend on http://localhost:5173
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

// Middleware to parse incoming JSON bodies
app.use(express.json());

// Serve static files (e.g. car mock images under /images/...)
app.use(express.static(path.join(__dirname, 'public')));

// Register API routes
app.use('/api/cars', carsRouter);
app.use('/api', usersRouter);
app.use('/api/rentals', rentalsRouter);

// Welcome/Healthcheck endpoint
app.get('/api', (req, res) => {
  res.json({ message: 'Car Rental Backend API is running successfully.' });
});

// Run server
app.listen(PORT, () => {
  console.log(`Car Rental Backend is listening on port ${PORT}`);
  console.log(`Static assets served from /public`);
  console.log(`Healthcheck URL: http://localhost:${PORT}/api`);
});
