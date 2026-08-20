const express = require("express");
const router = express.Router();
const db = require("../database/database");

// Helper to format car response (parse JSON images, convert available to boolean)
function formatCar(car) {
  if (!car) return null;
  return {
    ...car,
    images: Array.isArray(car.images)
      ? car.images
      : typeof car.images === "string"
        ? JSON.parse(car.images)
        : [],
    available: car.available === true || car.available === 1,
  };
}

// GET /api/cars - Get all cars
router.get("/", (req, res) => {
  const dbData = db.read();
  const formattedCars = dbData.cars.map(formatCar);
  res.json(formattedCars);
});

// GET /api/cars/:id - Get a single car
router.get("/:id", (req, res) => {
  const dbData = db.read();
  const car = dbData.cars.find((c) => c.id === Number(req.params.id));
  if (!car) {
    return res.status(404).json({ error: "Car not found" });
  }
  res.json(formatCar(car));
});

// POST /api/cars - Create a new car
router.post("/", (req, res) => {
  const { name, description, pricePerDay, images, available } = req.body;

  if (!name || !description || pricePerDay === undefined) {
    return res
      .status(400)
      .json({ error: "Name, description, and pricePerDay are required" });
  }

  const dbData = db.read();
  const nextId =
    dbData.cars.reduce((max, car) => (car.id > max ? car.id : max), 0) + 1;

  const newCar = {
    id: nextId,
    name,
    description,
    pricePerDay: Number(pricePerDay),
    images: Array.isArray(images) ? images : [],
    available: available !== false,
  };

  dbData.cars.push(newCar);
  db.write(dbData);

  res.status(201).json(formatCar(newCar));
});

// PUT /api/cars/:id - Update an existing car
router.put("/:id", (req, res) => {
  const { name, description, pricePerDay, images, available } = req.body;
  const carId = Number(req.params.id);

  if (!name || !description || pricePerDay === undefined) {
    return res
      .status(400)
      .json({ error: "Name, description, and pricePerDay are required" });
  }

  const dbData = db.read();
  const carIndex = dbData.cars.findIndex((c) => c.id === carId);
  if (carIndex === -1) {
    return res.status(404).json({ error: "Car not found" });
  }

  dbData.cars[carIndex] = {
    id: carId,
    name,
    description,
    pricePerDay: Number(pricePerDay),
    images: Array.isArray(images) ? images : [],
    available: available !== false,
  };

  db.write(dbData);
  res.json(formatCar(dbData.cars[carIndex]));
});

// DELETE /api/cars/:id - Delete a car
router.delete("/:id", (req, res) => {
  const carId = Number(req.params.id);
  const dbData = db.read();

  const carIndex = dbData.cars.findIndex((c) => c.id === carId);
  if (carIndex === -1) {
    return res.status(404).json({ error: "Car not found" });
  }

  dbData.cars.splice(carIndex, 1);
  db.write(dbData);

  res.json({ message: "Car deleted successfully", id: carId });
});

module.exports = router;
