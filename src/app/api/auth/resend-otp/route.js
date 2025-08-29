import { NextResponse } from "next/server";
import { getCollection } from "@/lib/db";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { email } = await req.json();
    console.log("Resending OTP to:", email);

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      return NextResponse.json({ message: "Invalid email address" }, { status: 400 });
    }

    const usersCollection = await getCollection("users");
    const user = await usersCollection.findOne({ email });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 400 });
    }

    // Generate a new OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes expiration

    // Update user with new OTP
    await usersCollection.updateOne(
      { email },
      { $set: { otp: { code: otp, expires } } }
    );
    console.log("Generated new OTP:", otp);

    // Configure Nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email options with HTML
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Resend: Verify Your Zeus Airline Account",
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; background-color: #f9f9f9; padding: 20px; border-radius: 8px;">
          <h2 style="color: #2c3e50;">Zeus Airline Account Verification</h2>
          <p style="font-size: 16px;">A new One-Time Password (OTP) has been requested. Use the code below to verify your account:</p>
          <h3 style="color: #e74c3c; font-size: 24px; background-color: #fff; padding: 10px; display: inline-block; border-radius: 4px;">${otp}</h3>
          <p style="font-size: 14px;">This OTP is valid for 10 minutes. If this wasn’t you, please secure your account and contact support.</p>
          <p style="font-size: 12px; color: #7f8c8d;">Zeus Airline Team<br>support@zeusairline.com</p>
        </div>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);
    console.log("Resend OTP email sent to:", email);

    return NextResponse.json({ message: "OTP resent successfully" }, { status: 200 });
  } catch (error) {
    console.error("Resend OTP error:", error.message, error.stack);
    return NextResponse.json({ message: "Failed to resend OTP" }, { status: 500 });
  }
}