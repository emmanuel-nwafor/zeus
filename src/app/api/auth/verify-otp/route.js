import { NextResponse } from "next/server";
import { getCollection } from "@/lib/db";

export async function POST(req) {
  try {
    const { email, otp } = await req.json();
    console.log("Verifying OTP for:", email, "OTP:", otp);

    if (!email || !otp) {
      return NextResponse.json({ message: "Email and OTP are required" }, { status: 400 });
    }

    const usersCollection = await getCollection("users");
    const user = await usersCollection.findOne({ email, "otp.code": otp, "otp.expires": { $gt: new Date() } });

    if (!user) {
      return NextResponse.json({ message: "Invalid or expired OTP" }, { status: 400 });
    }

    // OTP verified, clear it
    await usersCollection.updateOne(
      { email },
      { $unset: { otp: "" } }
    );
    console.log("OTP verified for:", email);

    return NextResponse.json({ message: "OTP verified successfully" }, { status: 200 });
  } catch (error) {
    console.error("OTP verification error:", error.message, error.stack);
    return NextResponse.json({ message: "Failed to verify OTP" }, { status: 500 });
  }
}