const fs = require('fs');
const path = require('path');

// Ensure the data directory exists
const dbDir = path.join(__dirname, '../data');
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const dbPath = path.join(dbDir, 'database.json');

const defaultData = {
  users: [
    {
      id: 1,
      name: 'John Doe',
      email: 'user@example.com',
      password: 'user123',
      role: 'user'
    },
    {
      id: 2,
      name: 'Admin Jane',
      email: 'admin@example.com',
      password: 'admin123',
      role: 'admin'
    }
  ],
  cars: [
    {
      id: 1,
      name: 'Toyota Corolla',
      description: 'A reliable and fuel-efficient compact sedan, perfect for daily commuting and city driving.',
      pricePerDay: 45.0,
      images: ['/images/toyota_corolla.png'],
      available: true
    },
    {
      id: 2,
      name: 'Tesla Model 3',
      description: 'Sleek, fully electric premium sedan with autopilot features, impressive acceleration, and long range.',
      pricePerDay: 95.0,
      images: ['/images/tesla_model_3.png'],
      available: true
    },
    {
      id: 3,
      name: 'Ford Mustang GT',
      description: 'Iconic American muscle car with a powerful V8 engine, sport suspension, and thrilling driving dynamics.',
      pricePerDay: 120.0,
      images: ['/images/ford_mustang.png'],
      available: true
    }
  ],
  rentals: []
};

// Helper function to read from the JSON database
function readDatabase() {
  try {
    if (!fs.existsSync(dbPath)) {
      writeDatabase(defaultData);
      return defaultData;
    }
    const data = fs.readFileSync(dbPath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading JSON database, falling back to defaults:', err);
    return defaultData;
  }
}

// Helper function to write to the JSON database
function writeDatabase(data) {
  try {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error('Error writing to JSON database:', err);
  }
}

// Initialize database with seed data if it doesn't exist
readDatabase();

module.exports = {
  read: readDatabase,
  write: writeDatabase
};
