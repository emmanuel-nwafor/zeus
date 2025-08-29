"use client";

import React, { useState, useEffect } from "react";
import { SidebarDemo } from '@/app/components/SidebarDemo'

interface Flight {
  _id: string;
  from: string;
  to: string;
  departure: string;
  arrival: string;
  price: number;
}

interface Booking {
  flightId: string;
  name: string;
  email: string;
  seat: string;
}

export default function DashboardPage() {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [selectedRoute, setSelectedRoute] = useState<Flight | null>(null);
  const [bookingData, setBookingData] = useState({ name: "", email: "", seat: "Economy" });

  useEffect(() => {
    async function fetchFlights() {
      try {
        const response = await fetch("/api/flights");
        const data = await response.json();
        setFlights(data);
      } catch (error) {
        console.error("Error fetching flights:", error);
      }
    }
    fetchFlights();
  }, []);

  const handleBookNow = (route: Flight) => {
    setSelectedRoute(route);
  };

  const handleBookingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setBookingData({ ...bookingData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRoute) return;

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ flightId: selectedRoute._id, ...bookingData }),
      });
      if (response.ok) {
        alert("Booking confirmed! Check your email for details.");
        setSelectedRoute(null);
        setBookingData({ name: "", email: "", seat: "Economy" });
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Booking failed. Try again.");
      }
    } catch (error) {
      console.error("Booking error:", error);
      alert("Failed to process booking. Check your connection.");
    }
  };

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Sidebar */}
      <SidebarDemo />

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Zeus Airline Dashboard - Flight Booking</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {flights.map((route) => (
            <div key={route._id} className="bg-gray-800 p-4 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold">{route.from} to {route.to}</h2>
              <p className="text-gray-400">Departure: {route.departure}</p>
              <p className="text-gray-400">Arrival: {route.arrival}</p>
              <p className="text-green-400 font-bold">${route.price}</p>
              <button
                className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
                onClick={() => handleBookNow(route)}
              >
                Book Now
              </button>
            </div>
          ))}
        </div>

        {selectedRoute && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full text-center">
              <h2 className="text-xl font-bold mb-4">Book Flight: {selectedRoute.from} to {selectedRoute.to}</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-gray-300">Full Name</label>
                  <input
                    id="name"
                    name="name"
                    value={bookingData.name}
                    onChange={handleBookingChange}
                    className="w-full p-2 bg-gray-700 text-white border-none rounded"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-gray-300">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={bookingData.email}
                    onChange={handleBookingChange}
                    className="w-full p-2 bg-gray-700 text-white border-none rounded"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="seat" className="block text-gray-300">Seat Class</label>
                  <select
                    id="seat"
                    name="seat"
                    value={bookingData.seat}
                    onChange={handleBookingChange}
                    className="w-full p-2 bg-gray-700 text-white border-none rounded"
                  >
                    <option value="Economy">Economy</option>
                    <option value="Business">Business</option>
                    <option value="First">First Class</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
                >
                  Confirm Booking
                </button>
                <button
                  type="button"
                  className="mt-2 w-full bg-gray-600 hover:bg-gray-700 text-white py-2 rounded"
                  onClick={() => setSelectedRoute(null)}
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}