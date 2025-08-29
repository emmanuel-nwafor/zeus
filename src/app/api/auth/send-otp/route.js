import { NextResponse } from "next/server";
import { getCollection } from "@/lib/db";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { email } = await req.json();
    console.log("Sending OTP to:", email);

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      return NextResponse.json({ message: "Please provide a valid email address" }, { status: 400 });
    }

    const usersCollection = await getCollection("users");
    const user = await usersCollection.findOne({ email });

    if (!user) {
      return NextResponse.json({ message: "User not found. Please sign up first." }, { status: 400 });
    }

    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes expiration

    // Update user with OTP
    await usersCollection.updateOne(
      { email },
      { $set: { otp: { code: otp, expires } } },
      { upsert: true }
    );
    console.log("Generated OTP:", otp);

    // Configure Nodemailer with timeout and fallback
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      connectionTimeout: 10000, // 10 seconds timeout
      tls: { rejectUnauthorized: false }, // Temporary for testing (remove in production)
    });

    // Email options with HTML
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Verify Your Zeus Airline Account",
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; background-color: #f9f9f9; padding: 20px; border-radius: 8px;">
          <h2 style="color: #2c3e50;">Welcome to Zeus Airline!</h2>
          <p style="font-size: 16px;">Thank you for signing up. Please use the following One-Time Password (OTP) to verify your account:</p>
          <h3 style="color: #e74c3c; font-size: 24px; background-color: #fff; padding: 10px; display: inline-block; border-radius: 4px;">${otp}</h3>
          <p style="font-size: 14px;">This OTP is valid for 10 minutes. If you didn’t request this, please ignore this email or contact support.</p>
          <p style="font-size: 12px; color: #7f8c8d;">Zeus Airline Team<br>support@zeusairline.com</p>
        </div>
      `,
    };

    // Send email with timeout
    await transporter.sendMail(mailOptions);
    console.log("OTP email sent to:", email);

    return NextResponse.json({ message: "OTP sent successfully" }, { status: 200 });
  } catch (error) {
    console.error("OTP send error:", error.message, error.stack);
    let errorMessage = "Failed to send OTP. Please try again later.";
    if (error.code === "ETIMEDOUT") {
      errorMessage = "Connection to email server timed out. Check your network or contact support.";
    } else if (error.responseCode === 535) {
      errorMessage = "Invalid email credentials. Please check your .env file and try again.";
    }
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}