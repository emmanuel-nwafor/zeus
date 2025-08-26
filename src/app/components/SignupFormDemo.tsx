"use client";

import React, { useState, useEffect } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import Link from "next/link";
import { CheckCircle, XCircle } from "lucide-react";
import { MultiStepLoaderDemo } from "./MultiStepLoaderDemo";

const loadingStates = [
  { text: "Validating your details" },
  { text: "Securing your data" },
  { text: "Connecting to Zeus Airline" },
  { text: "Creating your account" },
  { text: "Welcome to Zeus Airline!" },
];

export function SignupFormDemo() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // For OTP input
  const [otp, setOtp] = useState("");
  const [isOtpVerified, setIsOtpVerified] = useState(false);

  // Password strength validation
  const [showPasswordChecklist, setShowPasswordChecklist] = useState(false);
  const isLengthValid = formData.password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(formData.password);
  const hasLowerCase = /[a-z]/.test(formData.password);
  const hasNumber = /[0-9]/.test(formData.password);
  const hasSpecialChar = /[^A-Za-z0-9]/.test(formData.password);

  useEffect(() => {
    setShowPasswordChecklist(formData.password.length > 0);
  }, [formData.password]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setMessage("");
  };

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtp(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setMessage("");

    // Client-side validation
    if (!formData.username.trim()) {
      setMessage("Username cannot be empty.");
      setIsError(true);
      setIsSubmitting(false);
      return;
    }
    if (!formData.email.trim()) {
      setMessage("Email cannot be empty.");
      setIsError(true);
      setIsSubmitting(false);
      return;
    }
    if (!formData.password.trim()) {
      setMessage("Password cannot be empty.");
      setIsError(true);
      setIsSubmitting(false);
      return;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setMessage("Please enter a valid email address (e.g., user@example.com).");
      setIsError(true);
      setIsSubmitting(false);
      return;
    }

    try {
      console.log("Submitting form:", formData);
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        // Send OTP after successful signup
        const otpResponse = await fetch("/api/auth/send-otp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: formData.email }),
        });

        if (otpResponse.ok) {
          setMessage("OTP sent to your email. Please enter it below.");
          setIsError(false);
          setShowPopup(true); // Show OTP popup
        } else {
          setMessage("Failed to send OTP. Please try again.");
          setIsError(true);
        }
      } else {
        setMessage(result.message || "An error occurred during signup. Please try again.");
        setIsError(true);
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setMessage("Failed to connect to the server. Please check your network and try again.");
      setIsError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!otp) {
      setMessage("Please enter the OTP sent to your email.");
      setIsError(true);
      return;
    }

    try {
      const response = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, otp }),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage("OTP verified! Redirecting...");
        setIsError(false);
        setShowPopup(false);
        // Trigger multi-step loader and redirect
        setTimeout(() => {
          setIsOtpVerified(true);
          setTimeout(() => (window.location.href = "/dashboard"), loadingStates.length * 1000);
        }, 1000); // Brief delay before loader
      } else {
        setMessage(result.message || "Invalid OTP. Please try again.");
        setIsError(true);
      }
    } catch (error) {
      console.error("OTP verification error:", error);
      setMessage("Failed to verify OTP. Please try again.");
      setIsError(true);
    }
  };

  return (
    <div className="min-h-screen w-full relative bg-black flex items-center justify-center">
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(226, 232, 240, 0.15), transparent 70%), #000000",
        }}
      />
      <div className="relative z-10 w-full max-w-md p-8 text-center">
        <div className="mb-8">
          <div className="w-16 h-16 mx-auto bg-gray-600 rounded-full flex items-center justify-center">
            <span className="text-white text-sm">Logo</span>
          </div>
        </div>
        <h2 className="text-3xl font-bold mb-2 text-white">Let’s get you started!</h2>
        <p className="text-sm mb-6 text-gray-400">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-blue-400 hover:underline">
            Sign in
          </Link>
        </p>
        {message && (
          <p
            className={`text-sm mb-4 p-2 rounded flex items-center ${
              isError ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
            }`}
          >
            {isError ? <XCircle className="w-4 h-4 mr-2" /> : <CheckCircle className="w-4 h-4 mr-2" />}
            {message}
          </p>
        )}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2 text-left">
            <Label htmlFor="username" className="text-gray-400">
              User Name
            </Label>
            <Input
              id="username"
              placeholder="Enter your username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              className="bg-gray-800 text-white border-none focus:ring-0"
            />
          </div>
          <div className="space-y-2 text-left">
            <Label htmlFor="email" className="text-gray-400">
              Email
            </Label>
            <Input
              id="email"
              placeholder="user@zeusairline.com"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="bg-gray-800 text-white border-none focus:ring-0"
            />
          </div>
          <div className="space-y-2 text-left">
            <Label htmlFor="password" className="text-gray-400">
              Password
            </Label>
            <Input
              id="password"
              placeholder="Enter your password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="bg-gray-800 text-white border-none focus:ring-0"
            />
            {showPasswordChecklist && (
              <ul className="text-[9px] text-gray-500 text-left space-y-1 mt-2">
                <li className="flex items-center">
                  {isLengthValid ? <CheckCircle className="text-green-500 w-4 h-4 mr-2" /> : <XCircle className="text-red-500 w-4 h-4 mr-2" />}
                  At least 8 characters
                </li>
                <li className="flex items-center">
                  {hasUpperCase ? <CheckCircle className="text-green-500 w-4 h-4 mr-2" /> : <XCircle className="text-red-500 w-4 h-4 mr-2" />}
                  At least one uppercase letter
                </li>
                <li className="flex items-center">
                  {hasLowerCase ? <CheckCircle className="text-green-500 w-4 h-4 mr-2" /> : <XCircle className="text-red-500 w-4 h-4 mr-2" />}
                  At least one lowercase letter
                </li>
                <li className="flex items-center">
                  {hasNumber ? <CheckCircle className="text-green-500 w-4 h-4 mr-2" /> : <XCircle className="text-red-500 w-4 h-4 mr-2" />}
                  At least one number
                </li>
                <li className="flex items-center">
                  {hasSpecialChar ? <CheckCircle className="text-green-500 w-4 h-4 mr-2" /> : <XCircle className="text-red-500 w-4 h-4 mr-2" />}
                  At least one special character
                </li>
              </ul>
            )}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition duration-200 ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Signing up..." : "Sign up"}
          </button>
        </form>
        <p className="text-xs text-gray-500 mt-6">
          By signing up, you agree to our Terms of Service and Privacy Policy.
        </p>

        {/* OTP Popup */}
        {showPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center">
              <h3 className="text-xl font-bold mb-4 text-gray-800">Enter OTP</h3>
              <p className="text-gray-600 mb-4">We sent an OTP to {formData.email}. Please enter it below.</p>
              <form onSubmit={handleOtpSubmit} className="space-y-4">
                <Input
                  id="otp"
                  placeholder="Enter OTP"
                  type="text"
                  value={otp}
                  onChange={handleOtpChange}
                  className="bg-gray-800 text-white border-none focus:ring-0 w-full"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ${
                    isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {isSubmitting ? "Verifying..." : "Verify OTP"}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Multi-Step Loader (after OTP verification) */}
        {isOtpVerified && (
          <MultiStepLoaderDemo
            loadingStates={loadingStates}
            loading={true}
            duration={1000}
            onClose={() => setIsOtpVerified(false)} // Optional cancel (remove in production)
          />
        )}
      </div>
    </div>
  );
}

export default SignupFormDemo;