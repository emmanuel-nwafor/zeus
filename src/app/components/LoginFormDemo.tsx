"use client";

import React, { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import Link from "next/link";
import { CheckCircle, XCircle } from "lucide-react"; // Lucide React icons

export function LoginFormDemo() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setMessage(""); // Clear message on input change
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setMessage("");

    // Client-side validation
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
      console.log("Submitting login:", formData);
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage("Login successful! Redirecting...");
        setIsError(false);
        // Add redirect logic here (e.g., to a dashboard)
        setTimeout(() => (window.location.href = "/dashboard"), 2000); // Example redirect
      } else {
        setMessage(result.message || "An error occurred during login. Please try again.");
        setIsError(true);
      }
    } catch (error) {
      console.error("Login submission error:", error);
      setMessage("Failed to connect to the server. Please check your network and try again.");
      setIsError(true);
    } finally {
      setIsSubmitting(false);
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
        <h2 className="text-3xl font-bold mb-2 text-white">Welcome back!</h2>
        <p className="text-sm mb-6 text-gray-400">
          First time here?{" "}
          <Link href="/auth/signup" className="text-blue-400 hover:underline">
            Sign up for free
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
            <Label htmlFor="email" className="text-gray-400">
              Your email
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
              placeholder="Enter Password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="bg-gray-800 text-white border-none focus:ring-0"
            />
          </div>
          <div className="text-sm text-blue-400 hover:underline mb-4 text-right">
            <Link href="/forgot-password">Forgot Password?</Link>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition duration-200 ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Signing in..." : "Sign in"}
          </button>
          <p className="text-sm text-gray-400 mb-4">Sign in using magic link</p>
          <p className="text-xs text-gray-500">Single sign-on (SSO)</p>
        </form>
        <p className="text-xs text-gray-500 mt-6">
          Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}

export default LoginFormDemo;