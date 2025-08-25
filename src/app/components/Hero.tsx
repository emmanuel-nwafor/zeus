import React from "react";
import { FlipWords } from "../components/ui/flip-words";
import { NavbarDemo } from "./NavbarDemo";

export function HeroPage() {
  const words = ["faster", "easier", "cheaper", "smoother"];

  return (
    <>
      <div className="bg-[url('https://cdn.pixabay.com/photo/2022/11/22/02/13/aircraft-7608576_960_720.jpg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/30 z-0" />

        <NavbarDemo />
       
        <div className="h-screen flex justify-start items-center px-4 sm:px-6 md:px-8 lg:px-12 relative">
          <div className="relative z-10 text-left max-w-4xl sm:max-w-3xl opacity-0 animate-fade-in">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white dark:text-neutral-100 tracking-tight">
              Fly
              <FlipWords words={words} className="text-blue-600 dark:text-blue-400 font-black" /> <br />
              with Zeus Airline
            </h1>
            <p className="mt-6 sm:text-sm md:text-lg text-white dark:text-neutral-200 max-w-md sm:max-w-lg opacity-0 animate-fade-in animation-delay-300">
              Zeus Airline delivers unparalleled travel experiences with world-class service, unbeatable prices, and a state-of-the-art fleet. Book your next flight today and soar to your dream destinations with comfort, style, and ease!
            </p>
            <div className="mt-8 opacity-0 animate-fade-in animation-delay-600">
              <button
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-lg font-semibold px-8 py-3 rounded-md hover:bg-blue-900 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                // onClick={() => window.location.href = "/search"}
              >
                Book Your Flight Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}