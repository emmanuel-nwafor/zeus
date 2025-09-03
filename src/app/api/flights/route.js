import { NextResponse } from 'next/server';
import { getCollection } from '../../../lib/db';

export async function POST() {
  try {
    console.log('Received destinations seed request');

    console.log('Connecting to MongoDB...');
    const destinationsCollection = await getCollection('destinations');
    if (!destinationsCollection) {
      console.error('Failed to get destinations collection');
      return NextResponse.json({ message: 'Database connection failed' }, { status: 500 });
    }

    console.log('Deleting existing destinations...');
    const deleteResult = await destinationsCollection.deleteMany({});
    console.log(`Deleted ${deleteResult.deletedCount} destinations`);

    const destinations = [
      { name: 'Lagos', image: '/destination-lagos.png', bookings: 245 },
      { name: 'London', image: '/destination-london.png', bookings: 189 },
      { name: 'Paris', image: '/destination-paris.png', bookings: 162 },
    ];

    console.log('Inserting destinations...');
    const insertResult = await destinationsCollection.insertMany(destinations);
    console.log(`Inserted ${insertResult.insertedCount} destinations`);

    return NextResponse.json({ message: 'Destinations seeded successfully', insertedCount: insertResult.insertedCount }, { status: 201 });
  } catch (error) {
    console.error('Destination seed error:', error.message, error.stack);
    return NextResponse.json({ message: 'Internal server error', error: error.message }, { status: 500 });
  }
}