"use client";
import React from "react";

export default function About() {
  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-neutral-900">
      <section className="py-16 px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="max-w-8xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-neutral-800 dark:text-neutral-100 tracking-tight opacity-0 animate-fade-in">
            About Zeus Airline
          </h1>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="opacity-0 animate-fade-in animation-delay-300">
              <p className="mt-6 sm:text-sm md:text-lg text-neutral-700 dark:text-neutral-200 max-w-md sm:max-w-lg opacity-0 animate-fade-in animation-delay-300">
                Zeus Airline is your gateway to the skies, built on a passion for seamless travel and exceptional service. With a modern fleet of cutting-edge aircraft and a commitment to affordability, we connect you to destinations worldwide. Our team is dedicated to making every journey comfortable, reliable, and unforgettable, whether you’re flying for business or exploring new horizons.
              </p>
              <p className="mt-6 sm:text-sm md:text-lg text-neutral-700 dark:text-neutral-200 max-w-md sm:max-w-lg opacity-0 animate-fade-in animation-delay-300">
                Founded with a vision to redefine air travel, Zeus Airline combines innovation, safety, and customer-first values. From our eco-friendly initiatives to our award-winning in-flight experience, we’re here to elevate your journey. Choose Zeus Airline and soar with confidence.
              </p>
              <a
                href="/search"
                className="mt-6 inline-block bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-lg font-semibold px-8 py-3 rounded-md hover:bg-blue-900 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                Explore Flights
              </a>
            </div>
            <div className="opacity-0 animate-fade-in animation-delay-600">
              <div className="rounded-lg overflow-hidden shadow-xl">
                <img
                  src="https://cdn.pixabay.com/photo/2023/01/15/22/47/airplane-7721277_960_720.jpg"
                  alt="Zeus Airline Fleet"
                  className="w-full h-auto object-cover aspect-[16/9]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}