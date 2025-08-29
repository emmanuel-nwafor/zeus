import { NextResponse } from "next/server";
import mongoose from "mongoose";

const uri = process.env.MONGO_URI;
if (!uri) throw new Error("MONGO_URI is not defined");

mongoose.connect(uri);

const bookingSchema = new mongoose.Schema({
  flightId: String,
  name: String,
  email: String,
  seat: String,
  createdAt: { type: Date, default: Date.now },
});

const Booking = mongoose.models.Booking || mongoose.model("Booking", bookingSchema);

export async function POST(request) {
  try {
    const body = await request.json();
    const booking = new Booking(body);
    await booking.save();
    return NextResponse.json({ message: "Booking successful" }, { status: 201 });
  } catch (error) {
    console.error("Error saving booking:", error);
    return NextResponse.json({ message: "Failed to save booking" }, { status: 500 });
  }
}