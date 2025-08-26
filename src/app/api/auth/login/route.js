import { getCollection } from "@/lib/db.js";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    console.log("Received login request");
    const { email, password } = await req.json();
    console.log("Request body:", { email, password });

    // Server-side validation
    if (!email || !password) {
      console.log("Validation failed: Missing fields");
      return NextResponse.json({ message: "Email and password are required" }, { status: 400 });
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

    console.log("Checking for user...");
    const user = await usersCollection.findOne({ email });
    if (!user) {
      console.log("User not found:", email);
      return NextResponse.json({ message: "Invalid email or password" }, { status: 401 });
    }

    console.log("Verifying password...");
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Password mismatch for:", email);
      return NextResponse.json({ message: "Invalid email or password" }, { status: 401 });
    }

    console.log("Login successful:", email);
    return NextResponse.json({ message: "Login successful", user: { username: user.username, email: user.email } }, { status: 200 });
  } catch (error) {
    console.error("Login error:", error.message, error.stack);
    return NextResponse.json({ message: "Internal server error", error: error.message }, { status: 500 });
  }
}