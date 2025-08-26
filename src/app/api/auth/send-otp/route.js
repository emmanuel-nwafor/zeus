import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

let otpStore = {}; // In-memory store (replace with MongoDB in production)

export async function POST(req) {
  try {
    const { email } = await req.json();
    console.log("Sending OTP to:", email);

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      return NextResponse.json({ message: "Invalid email address" }, { status: 400 });
    }

    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore[email] = otp; // Store OTP temporarily
    console.log("Generated OTP:", otp);

    // Configure Nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP for Zeus Airline Signup",
      text: `Your OTP is ${otp}. It is valid for 10 minutes. Do not share it with anyone.`,
    };

    // Send email
    await transporter.sendMail(mailOptions);
    console.log("OTP email sent to:", email);

    return NextResponse.json({ message: "OTP sent successfully" }, { status: 200 });
  } catch (error) {
    console.error("OTP send error:", error.message, error.stack);
    return NextResponse.json({ message: "Failed to send OTP" }, { status: 500 });
  }
}