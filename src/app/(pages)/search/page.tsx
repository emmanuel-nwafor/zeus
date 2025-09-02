"use client";
import { useState } from "react";
import { SidebarDemo } from "@/app/components/SidebarDemo";
import { ThemeToggle } from "@/app/components/ThemeToggle";
import { Plane, Search } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Search() {
  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`/api/flights?departure=${departure}&arrival=${arrival}`);
      const data = await res.json();
      setFlights(data);
    } catch (error) {
      console.error("Error fetching flights:", error);
      setFlights([]);
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen w-full bg-neutral-100 dark:bg-neutral-900">
      <SidebarDemo />
      <div className="flex-1 p-4 sm:p-6 md:p-8">
        <div className="flex justify-end mb-4">
          <ThemeToggle />
        </div>
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200 mb-6">
            Search Flights
          </h1>
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <label className="text-sm font-medium text-neutral-600 dark:text-neutral-300">
                Departure
              </label>
              <input
                type="text"
                value={departure}
                onChange={(e) => setDeparture(e.target.value)}
                placeholder="e.g., Lagos"
                className="w-full mt-1 p-2 rounded-md bg-neutral-200 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div className="flex-1">
              <label className="text-sm font-medium text-neutral-600 dark:text-neutral-300">
                Arrival
              </label>
              <input
                type="text"
                value={arrival}
                onChange={(e) => setArrival(e.target.value)}
                placeholder="e.g., London"
                className="w-full mt-1 p-2 rounded-md bg-neutral-200 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className={cn(
                "mt-6 sm:mt-7 p-2 rounded-md bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold hover:-translate-y-0.5 transition duration-200",
                loading && "opacity-50 cursor-not-allowed"
              )}
            >
              <Search className="w-5 h-5" />
            </button>
          </form>
          <div>
            {loading && <p className="text-neutral-600 dark:text-neutral-300">Loading...</p>}
            {flights.length === 0 && !loading && (
              <p className="text-neutral-600 dark:text-neutral-300">No flights found.</p>
            )}
            {flights.map((flight: any) => (
              <div
                key={flight.flightNumber}
                className="p-4 mb-4 rounded-md bg-white dark:bg-neutral-800 shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Plane className="w-5 h-5 text-blue-600" />
                    <h2 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200">
                      {flight.flightNumber}
                    </h2>
                  </div>
                  <p className="text-lg font-bold text-blue-600">${flight.price}</p>
                </div>
                <p className="text-neutral-600 dark:text-neutral-300">
                  {flight.departure} to {flight.arrival}
                </p>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                  Departure: {new Date(flight.departureTime).toLocaleString()}
                </p>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                  Arrival: {new Date(flight.arrivalTime).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}