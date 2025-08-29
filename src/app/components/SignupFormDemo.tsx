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
  const [otp, setOtp] = useState(["", "", "", "", "", ""]); // Array for 6-digit OTP
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [resendTimer, setResendTimer] = useState(0); // Timer for resend OTP

  // Password strength validation
  const [showPasswordChecklist, setShowPasswordChecklist] = useState(false);
  const isLengthValid = formData.password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(formData.password);
  const hasLowerCase = /[a-z]/.test(formData.password);
  const hasNumber = /[0-9]/.test(formData.password);
  const hasSpecialChar = /[^A-Za-z0-9]/.test(formData.password);

  useEffect(() => {
    setShowPasswordChecklist(formData.password.length > 0);
    let timer: NodeJS.Timeout | undefined;
    if (resendTimer > 0) {
      timer = setInterval(() => setResendTimer((prev) => prev - 1), 1000);
    } else if (resendTimer === 0 && showPopup) {
      if (timer) clearInterval(timer); // Only clear if timer is defined
    }
    return () => {
      if (timer) clearInterval(timer); // Cleanup only if timer exists
    };
  }, [formData.password, resendTimer, showPopup]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setMessage("");
  };

  const handleOtpChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const newOtp = [...otp];
    newOtp[index] = e.target.value.replace(/\D/, "").slice(0, 1); // Only numbers, max 1 digit
    setOtp(newOtp);

    // Move focus to next input
    if (e.target.value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
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
        const otpResponse = await fetch("/api/auth/send-otp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: formData.email }),
        });

        if (otpResponse.ok) {
          setMessage("A one-time password (OTP) has been sent to your email. Please enter it below.");
          setIsError(false);
          setShowPopup(true);
          setResendTimer(30); // Start 30-second timer
        } else {
          const errorData = await otpResponse.json();
          setMessage(errorData.message || "Failed to send OTP. Please try again.");
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
    const otpValue = otp.join("");
    if (!otpValue || otpValue.length < 6) {
      setMessage("Please enter a valid 6-digit OTP.");
      setIsError(true);
      return;
    }

    try {
      const response = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, otp: otpValue }),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage("OTP verified! Redirecting...");
        setIsError(false);
        setShowPopup(false);
        setIsOtpVerified(true);
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

  const handleResendOtp = async () => {
    if (resendTimer > 0) return;
    setMessage("Resending OTP...");
    setIsError(false);
    try {
      const response = await fetch("/api/auth/resend-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email }),
      });

      if (response.ok) {
        setMessage("OTP resent successfully. Please check your email.");
        setIsError(false);
        setResendTimer(30); // Reset timer
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || "Failed to resend OTP. Please try again later.");
        setIsError(true);
      }
    } catch (error) {
      console.error("Resend OTP error:", error);
      setMessage("Failed to resend OTP. Please try again.");
      setIsError(true);
    }
  };

  // Redirect after loader completes
  useEffect(() => {
    if (isOtpVerified) {
      const totalDuration = loadingStates.length * 1000; // 5 seconds for 5 steps
      const timer: NodeJS.Timeout = setTimeout(() => {
        window.location.href = "/auth/login";
      }, totalDuration);
      return () => clearTimeout(timer);
    }
  }, [isOtpVerified]);

  return (
    <div className="min-h-screen w-full relative bg-black flex items-center justify-center dark:bg-gray-900">
      <div
        className="absolute inset-0 z-0 dark:bg-gray-900"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(226, 232, 240, 0.15), transparent 70%), #000000",
        }}
      />
      <div className="relative z-10 w-full max-w-md p-8 text-center dark:text-white">
        <div className="mb-8">
          <div className="w-16 h-16 mx-auto bg-gray-600 rounded-full flex items-center justify-center dark:bg-gray-700">
            <span className="text-white text-sm">Logo</span>
          </div>
        </div>
        <h2 className="text-3xl font-bold mb-2 text-white dark:text-gray-100">Let’s get you started!</h2>
        <p className="text-sm mb-6 text-gray-400 dark:text-gray-400">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-blue-400 hover:underline dark:text-blue-300">
            Sign in
          </Link>
        </p>
        {message && (
          <p
            className={`text-sm mb-4 p-2 rounded flex items-center ${
              isError ? "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200" : "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200"
            }`}
          >
            {isError ? <XCircle className="w-4 h-4 mr-2 dark:text-red-200" /> : <CheckCircle className="w-4 h-4 mr-2 dark:text-green-200" />}
            {message}
          </p>
        )}
        <form className="space-y-6 dark:space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2 text-left dark:space-y-2">
            <Label htmlFor="username" className="text-gray-400 dark:text-gray-500">
              User Name
            </Label>
            <Input
              id="username"
              placeholder="Enter your username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              className="bg-gray-800 text-white border-none focus:ring-0 dark:bg-gray-700 dark:text-gray-200"
            />
          </div>
          <div className="space-y-2 text-left dark:space-y-2">
            <Label htmlFor="email" className="text-gray-400 dark:text-gray-500">
              Email
            </Label>
            <Input
              id="email"
              placeholder="user@zeusairline.com"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="bg-gray-800 text-white border-none focus:ring-0 dark:bg-gray-700 dark:text-gray-200"
            />
          </div>
          <div className="space-y-2 text-left dark:space-y-2">
            <Label htmlFor="password" className="text-gray-400 dark:text-gray-500">
              Password
            </Label>
            <Input
              id="password"
              placeholder="Enter your password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="bg-gray-800 text-white border-none focus:ring-0 dark:bg-gray-700 dark:text-gray-200"
            />
            {showPasswordChecklist && (
              <ul className="text-[9px] text-gray-500 text-left space-y-1 mt-2 dark:text-gray-400">
                <li className="flex items-center">
                  {isLengthValid ? <CheckCircle className="text-green-500 w-4 h-4 mr-2 dark:text-green-400" /> : <XCircle className="text-red-500 w-4 h-4 mr-2 dark:text-red-400" />}
                  At least 8 characters
                </li>
                <li className="flex items-center">
                  {hasUpperCase ? <CheckCircle className="text-green-500 w-4 h-4 mr-2 dark:text-green-400" /> : <XCircle className="text-red-500 w-4 h-4 mr-2 dark:text-red-400" />}
                  At least one uppercase letter
                </li>
                <li className="flex items-center">
                  {hasLowerCase ? <CheckCircle className="text-green-500 w-4 h-4 mr-2 dark:text-green-400" /> : <XCircle className="text-red-500 w-4 h-4 mr-2 dark:text-red-400" />}
                  At least one lowercase letter
                </li>
                <li className="flex items-center">
                  {hasNumber ? <CheckCircle className="text-green-500 w-4 h-4 mr-2 dark:text-green-400" /> : <XCircle className="text-red-500 w-4 h-4 mr-2 dark:text-red-400" />}
                  At least one number
                </li>
                <li className="flex items-center">
                  {hasSpecialChar ? <CheckCircle className="text-green-500 w-4 h-4 mr-2 dark:text-green-400" /> : <XCircle className="text-red-500 w-4 h-4 mr-2 dark:text-red-400" />}
                  At least one special character
                </li>
              </ul>
            )}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition duration-200 dark:bg-gray-200 dark:text-gray-900 dark:hover:bg-gray-300 ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Signing up..." : "Sign up"}
          </button>
        </form>
        <p className="text-xs text-gray-500 mt-6 dark:text-gray-400">
          By signing up, you agree to our Terms of Service and Privacy Policy.
        </p>

        {/* Enhanced OTP Popup with Animations */}
        {showPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center animate-slide-up dark:bg-gray-800">
              <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">Verify Your Account</h3>
              <p className="text-gray-600 mb-4 dark:text-gray-300">Enter the 6-digit code sent to {formData.email}.</p>
              <form onSubmit={handleOtpSubmit} className="space-y-4">
                <div className="flex justify-center gap-3">
                  {otp.map((digit, index) => (
                    <Input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e)}
                      className="w-12 h-12 text-center text-2xl font-bold bg-gray-100 border-2 border-gray-300 rounded focus:border-blue-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:border-blue-400"
                      maxLength={1}
                      autoFocus={index === 0}
                    />
                  ))}
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200 dark:bg-blue-600 dark:hover:bg-blue-700 ${
                    isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {isSubmitting ? "Verifying..." : "Verify"}
                </button>
                <p className="text-sm text-gray-500 mt-2 dark:text-gray-400">
                  Didn’t receive the code?{" "}
                  <button
                    onClick={handleResendOtp}
                    disabled={resendTimer > 0}
                    className={`text-blue-500 hover:underline dark:text-blue-300 ${resendTimer > 0 ? "cursor-not-allowed opacity-50" : ""}`}
                  >
                    Resend OTP{resendTimer > 0 ? ` (${resendTimer}s)` : ""}
                  </button>
                </p>
              </form>
            </div>
          </div>
        )}

        {/* Multi-Step Loader (after OTP verification) */}
        {isOtpVerified && (
          <div className="fixed inset-0 flex items-center justify-center z-60 bg-black bg-opacity-80">
            <MultiStepLoaderDemo
              loadingStates={loadingStates}
              loading={true}
              duration={1000}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default SignupFormDemo;