const mongoose = require('mongoose');
const Destination = require('../models/Destination');
const connectDB = require('../lib/db');

async function seedDestinations() {
  try {
    await connectDB();
    console.log('Connected to MongoDB');

    await Destination.deleteMany({});
    console.log('Cleared existing destinations');

    const destinations = [
      {
        name: 'Lagos',
        image: 'https://i.pinimg.com/1200x/56/33/09/56330989fdacd69191e5b3b0dcdf56d8.jpg',
        description: 'Vibrant coastal city in Nigeria with bustling markets and beaches.',
      },
      {
        name: 'London',
        image: 'https://cdn.pixabay.com/photo/2013/06/02/08/49/new-york-115626_640.jpg',
        description: 'Historic capital of the UK with iconic landmarks like Big Ben.',
      },
      {
        name: 'Paris',
        image: 'https://i.pinimg.com/1200x/73/4f/63/734f63794802234f24e5ffcbdda1a0b0.jpg',
        description: 'Romantic city in France, famous for the Eiffel Tower and art.',
      },
      {
        name: 'Tokyo',
        image: 'https://i.pinimg.com/1200x/9c/d9/58/9cd958c7a75f80ff8c9772d3523f5ed2.jpg',
        description: 'Dynamic metropolis in Japan blending tradition and modernity.',
      },
      {
        name: 'Dubai',
        image: 'https://i.pinimg.com/736x/9b/a2/e8/9ba2e8790a7b9f85625908e882a62970.jpg',
        description: 'Luxurious city in the UAE with stunning skyscrapers and deserts.',
      },
      {
        name: 'World',
        image: 'https://i.pinimg.com/1200x/9c/d9/58/9cd958c7a75f80ff8c9772d3523f5ed2.jpg',
        description: 'Explore destinations around the globe with Zeus Airline.',
      },
    ];

    await Destination.insertMany(destinations);
    console.log('Inserted destinations:', destinations);

    mongoose.connection.close();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error seeding destinations:', error);
    mongoose.connection.close();
  }
}

seedDestinations();