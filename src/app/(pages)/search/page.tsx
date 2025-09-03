"use client";
import { useState } from "react";
import { Sidebar } from "@/app/components/Sidebar";
import { SearchIcon, Plane } from "lucide-react";
import { cn } from "@/lib/utils";

export default function SearchPage() {
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

  const links = [
    { label: "Dashboard", href: "/dashboard", icon: <SearchIcon className="h-5 w-5" /> },
    { label: "Destinations", href: "/destinations", icon: <Plane className="h-5 w-5" /> },
    { label: "Settings", href: "/settings", icon: <SearchIcon className="h-5 w-5" /> },
    { label: "Logout", href: "/", icon: <SearchIcon className="h-5 w-5" /> },
  ];

  const userProfileLink = {
    label: "User's profile",
    href: "#",
    icon: <img src="https://i.pinimg.com/1200x/98/64/58/9864584c00559b51ecc9438aa97799ef.jpg" className="h-7 w-7 rounded-full" width={50} height={50} alt="Avatar" />,
  };

  const searchContent = (
    <div>
      <form onSubmit={handleSearch} className="flex flex-col gap-2">
        <div>
          <label className="text-xs md:text-sm font-medium text-neutral-400 dark:text-neutral-500">
            Departure
          </label>
          <input
            type="text"
            value={departure}
            onChange={(e) => setDeparture(e.target.value)}
            placeholder="e.g., Lagos"
            className="w-full mt-1 p-1 md:p-2 rounded-md bg-neutral-200 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200 focus:outline-none focus:ring-2 focus:ring-blue-600 text-xs md:text-sm"
          />
        </div>
        <div>
          <label className="text-xs md:text-sm font-medium text-neutral-400 dark:text-neutral-500">
            Arrival
          </label>
          <input
            type="text"
            value={arrival}
            onChange={(e) => setArrival(e.target.value)}
            placeholder="e.g., London"
            className="w-full mt-1 p-1 md:p-2 rounded-md bg-neutral-200 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200 focus:outline-none focus:ring-2 focus:ring-blue-600 text-xs md:text-sm"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={cn(
            "mt-2 w-full px-2 py-1 md:px-3 md:py-2 rounded-md bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold hover:-translate-y-0.5 transition duration-200 text-xs md:text-sm",
            loading && "opacity-50 cursor-not-allowed"
          )}
        >
          <SearchIcon className="w-4 h-4 md:w-5 md:h-5" />
        </button>
      </form>
      <div className="mt-4 max-h-48 overflow-y-auto">
        {loading && <p className="text-xs md:text-sm text-neutral-400 dark:text-neutral-500">Loading...</p>}
        {flights.length === 0 && !loading && (
          <p className="text-xs md:text-sm text-neutral-400 dark:text-neutral-500">No flights found.</p>
        )}
        {flights.map((flight: any) => (
          <div
            key={flight.flightNumber}
            className="p-2 mb-2 rounded-md bg-neutral-100 dark:bg-neutral-800 shadow-sm text-xs md:text-sm"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Plane className="w-4 h-4 text-blue-600" />
                <h2 className="font-semibold text-neutral-800 dark:text-neutral-200">
                  {flight.flightNumber}
                </h2>
              </div>
              <p className="font-bold text-blue-600">${flight.price}</p>
            </div>
            <p className="text-neutral-600 dark:text-neutral-300">
              {flight.departure} to {flight.arrival}
            </p>
            <p className="text-neutral-500 dark:text-neutral-400">
              Dep: {new Date(flight.departureTime).toLocaleString()}
            </p>
            <p className="text-neutral-500 dark:text-neutral-400">
              Arr: {new Date(flight.arrivalTime).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-neutral-100 dark:bg-neutral-900">
      <Sidebar links={links} content={searchContent} userProfileLink={userProfileLink} />
      <div className="flex-1 p-4 md:p-6">
        {/* Main content for Search page */}
        <h1 className="text-2xl md:text-3xl font-bold text-neutral-800 dark:text-neutral-200">Search Results</h1>
      </div>
    </div>
  );
}