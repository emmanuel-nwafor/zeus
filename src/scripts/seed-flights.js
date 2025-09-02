const mongoose = require('mongoose');
const Flight = require('../models/Flight');
const connectDB = require('../lib/db');

async function seedFlights() {
  try {
    await connectDB();
    console.log('Connected to MongoDB');

    await Flight.deleteMany({});
    console.log('Cleared existing flights');

    const flights = [
      {
        flightNumber: 'ZA123',
        departure: 'Lagos',
        arrival: 'London',
        price: 500,
        departureTime: new Date('2025-09-03T10:00:00Z'),
        arrivalTime: new Date('2025-09-03T16:00:00Z'),
      },
      {
        flightNumber: 'ZA456',
        departure: 'New York',
        arrival: 'Paris',
        price: 600,
        departureTime: new Date('2025-09-04T08:00:00Z'),
        arrivalTime: new Date('2025-09-04T15:00:00Z'),
      },
      {
        flightNumber: 'ZA789',
        departure: 'Dubai',
        arrival: 'Tokyo',
        price: 800,
        departureTime: new Date('2025-09-05T12:00:00Z'),
        arrivalTime: new Date('2025-09-05T22:00:00Z'),
      },
    ];

    await Flight.insertMany(flights);
    console.log('Inserted flights:', flights);

    mongoose.connection.close();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error seeding flights:', error);
    mongoose.connection.close();
  }
}

seedFlights();