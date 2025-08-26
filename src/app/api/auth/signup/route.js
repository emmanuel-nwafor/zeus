import { getCollection } from "@/lib/db.js";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    console.log("Received signup request");
    const { username, email, password } = await req.json();
    console.log("Request body:", { username, email, password });

    // Server-side validation
    if (!username || !email || !password) {
      console.log("Validation failed: Missing fields");
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      console.log("Validation failed: Invalid email format");
      return NextResponse.json({ message: "Invalid email format" }, { status: 400 });
    }

    console.log("Connecting to MongoDB...");
    const usersCollection = await getCollection("users");
    if (!usersCollection) {
      console.error("Failed to get users collection");
      return NextResponse.json({ message: "Database connection failed" }, { status: 500 });
    }

    console.log("Checking for existing user...");
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      console.log("User already exists:", email);
      return NextResponse.json({ message: "Email already exists" }, { status: 400 });
    }

    console.log("Hashing password...");
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    console.log("Inserting new user...");
    await usersCollection.insertOne({
      username,
      email,
      password: hashedPassword,
      createdAt: new Date(),
    });

    console.log("User created successfully:", email);
    return NextResponse.json({ message: "User created successfully" }, { status: 201 });
  } catch (error) {
    console.error("Signup error:", error.message, error.stack);
    return NextResponse.json({ message: "Internal server error", error: error.message }, { status: 500 });
  }
}