import { NextResponse } from "next/server";
import mongoose from "mongoose";

const uri = process.env.MONGO_URI;
if (!uri) throw new Error("MONGO_URI is not defined");

mongoose.connect(uri);

const flightSchema = new mongoose.Schema({
  from: String,
  to: String,
  departure: String,
  arrival: String,
  price: Number,
});

const Flight = mongoose.models.Flight || mongoose.model("Flight", flightSchema);

export async function GET() {
  try {
    const flights = await Flight.find();
    return NextResponse.json(flights);
  } catch (error) {
    console.error("Error fetching flights:", error);
    return NextResponse.json({ message: "Failed to fetch flights" }, { status: 500 });
  }
}