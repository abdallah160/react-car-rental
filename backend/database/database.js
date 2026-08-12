const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

// Ensure the data directory exists
const dbDir = path.join(__dirname, '../data');
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const dbPath = path.join(dbDir, 'database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
    initializeDatabase();
  }
});

function initializeDatabase() {
  db.serialize(() => {
    // Enable foreign keys
    db.run('PRAGMA foreign_keys = ON');

    // Create users table
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT NOT NULL
      )
    `);

    // Create cars table
    db.run(`
      CREATE TABLE IF NOT EXISTS cars (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT NOT NULL,
        pricePerDay REAL NOT NULL,
        images TEXT NOT NULL, -- JSON serialized string of array
        available INTEGER DEFAULT 1
      )
    `);

    // Create rentals table
    db.run(`
      CREATE TABLE IF NOT EXISTS rentals (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId INTEGER NOT NULL,
        carId INTEGER NOT NULL,
        startDate TEXT NOT NULL,
        endDate TEXT NOT NULL,
        totalPrice REAL NOT NULL,
        FOREIGN KEY(userId) REFERENCES users(id),
        FOREIGN KEY(carId) REFERENCES cars(id)
      )
    `, () => {
      // Seed data if the database is newly created or empty
      seedData();
    });
  });
}

function seedData() {
  // Check if users are empty
  db.get('SELECT COUNT(*) as count FROM users', [], (err, row) => {
    if (err) {
      console.error('Error checking users count:', err.message);
      return;
    }
    if (row.count === 0) {
      console.log('Seeding users...');
      const stmt = db.prepare('INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)');
      stmt.run('John Doe', 'user@example.com', 'user123', 'user');
      stmt.run('Admin Jane', 'admin@example.com', 'admin123', 'admin');
      stmt.finalize((err) => {
        if (err) console.error('Error seeding users:', err.message);
        else console.log('Users seeded successfully.');
      });
    }
  });

  // Check if cars are empty
  db.get('SELECT COUNT(*) as count FROM cars', [], (err, row) => {
    if (err) {
      console.error('Error checking cars count:', err.message);
      return;
    }
    if (row.count === 0) {
      console.log('Seeding cars...');
      const stmt = db.prepare('INSERT INTO cars (name, description, pricePerDay, images, available) VALUES (?, ?, ?, ?, ?)');
      stmt.run(
        'Toyota Corolla',
        'A reliable and fuel-efficient compact sedan, perfect for daily commuting and city driving.',
        45.0,
        JSON.stringify(['/images/toyota_corolla.png']),
        1
      );
      stmt.run(
        'Tesla Model 3',
        'Sleek, fully electric premium sedan with autopilot features, impressive acceleration, and long range.',
        95.0,
        JSON.stringify(['/images/tesla_model_3.png']),
        1
      );
      stmt.run(
        'Ford Mustang GT',
        'Iconic American muscle car with a powerful V8 engine, sport suspension, and thrilling driving dynamics.',
        120.0,
        JSON.stringify(['/images/ford_mustang.png']),
        1
      );
      stmt.finalize((err) => {
        if (err) console.error('Error seeding cars:', err.message);
        else console.log('Cars seeded successfully.');
      });
    }
  });
}

module.exports = db;
