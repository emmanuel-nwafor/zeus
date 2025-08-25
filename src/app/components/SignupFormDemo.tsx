"use client";

import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import Link from "next/link";

export function SignupFormDemo() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Signup form submitted");
  };

  return (
    <div className="min-h-screen w-full relative bg-black flex items-center justify-center">
      {/* Gradient Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(226, 232, 240, 0.15), transparent 70%), #000000",
        }}
      />
      <div className="relative z-10 w-full max-w-md p-8 text-center">
        {/* Placeholder for Logo */}
        <div className="mb-8">
          <div className="w-16 h-16 mx-auto bg-gray-600 rounded-full flex items-center justify-center">
            {/* Replace with your logo */}
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
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2 text-left">
            <Label htmlFor="username" className="text-gray-400">
              User Name
            </Label>
            <Input
              id="username"
              placeholder="Flip"
              type="text"
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
              className="bg-gray-800 text-white border-none focus:ring-0"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition duration-200"
          >
            Sign up
          </button>
        </form>
        <p className="text-xs text-gray-500 mt-6">
          Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}

export default SignupFormDemo;