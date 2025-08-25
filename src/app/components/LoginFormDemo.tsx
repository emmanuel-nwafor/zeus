"use client";

import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import Link from "next/link";

export function LoginFormDemo() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Login form submitted");
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
        <h2 className="text-3xl font-bold mb-2 text-white">Welcome back!</h2>
        <p className="text-sm mb-6 text-gray-400">
          First time here?{" "}
          <Link href="/auth/signup" className="text-blue-400 hover:underline">
            Sign up for free
          </Link>
        </p>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2 text-left">
            <Label htmlFor="email" className="text-gray-400">
              Your email
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
              ********
            </Label>
            <Input
              id="password"
              placeholder="Enter Password"
              type="password"
              className="bg-gray-800 text-white border-none focus:ring-0"
            />
          </div>
          <div className="text-sm text-blue-400 hover:underline mb-4 text-right">
            <Link href="/forgot-password">Forgot Password?</Link>
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition duration-200"
          >
            Sign in
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
