const fs = require('fs');
const path = require('path');

// Ensure the data directory exists
const dbDir = path.join(__dirname, '../data');
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const dbPath = path.join(dbDir, 'database.json');

const defaultData = {
  users: [],
  cars: [],
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
