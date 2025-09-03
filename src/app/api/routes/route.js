import { NextResponse } from 'next/server';
import Flight from '@/models/Flight';
import connectDB from '@/lib/db';

export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const departure = searchParams.get('departure');
    const arrival = searchParams.get('arrival');

    const query = {};
    if (departure) query.departure = new RegExp(departure, 'i');
    if (arrival) query.arrival = new RegExp(arrival, 'i');

    const flights = await Flight.find(query);
    return NextResponse.json(flights);
  } catch (error) {
    console.error('Error fetching flights:', error);
    return NextResponse.json([], { status: 500 });
  }
}