"use client";
import { useState } from "react";
import { Sidebar } from "@/app/components/Sidebar";
import { ThemeToggle } from "@/app/components/ThemeToggle";
import { Home, BookOpen, Settings, LogOut, Plane, Users, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function DashboardPage() {
  const [isDarkMode, setIsDarkMode] = useState(false); // For theme toggle state

  const links = [
    { label: "Dashboard", href: "/dashboard", icon: <Home className="h-5 w-5" /> },
    { label: "Destinations", href: "/destinations", icon: <BookOpen className="h-5 w-5" /> },
    { label: "Settings", href: "/settings", icon: <Settings className="h-5 w-5" /> },
    { label: "Logout", href: "/", icon: <LogOut className="h-5 w-5" /> },
  ];

  const userProfileLink = {
    label: "User's profile",
    href: "#",
    icon: (
      <img
        src="https://i.pinimg.com/1200x/98/64/58/9864584c00559b51ecc9438aa97799ef.jpg"
        className="h-7 w-7 rounded-full"
        width={50}
        height={50}
        alt="Avatar"
      />
    ),
  };

  // Mock data
  const stats = [
    { label: "Total Flights", value: "1,234", icon: <Plane className="h-6 w-6 text-blue-600" />, color: "bg-blue-100 dark:bg-blue-900" },
    { label: "Active Users", value: "5,678", icon: <Users className="h-6 w-6 text-indigo-600" />, color: "bg-indigo-100 dark:bg-indigo-900" },
    { label: "Bookings Today", value: "89", icon: <Calendar className="h-6 w-6 text-purple-600" />, color: "bg-purple-100 dark:bg-purple-900" },
  ];

  const recentBookings = [
    { id: "B001", flightNumber: "ZA123", user: "John Doe", destination: "Lagos to London", date: "2025-09-03", status: "Confirmed" },
    { id: "B002", flightNumber: "ZA456", user: "Jane Smith", destination: "New York to Paris", date: "2025-09-04", status: "Pending" },
    { id: "B003", flightNumber: "ZA789", user: "Alex Brown", destination: "Dubai to Tokyo", date: "2025-09-05", status: "Confirmed" },
  ];

  const popularDestinations = [
    { name: "Lagos", image: "https://i.pinimg.com/1200x/56/33/09/56330989fdacd69191e5b3b0dcdf56d8.jpg", bookings: 245 },
    { name: "London", image: "https://i.pinimg.com/1200x/73/4f/63/734f63794802234f24e5ffcbdda1a0b0.jpg", bookings: 189 },
    { name: "Paris", image: "https://i.pinimg.com/736x/9b/a2/e8/9ba2e8790a7b9f85625908e882a62970.jpg", bookings: 162 },
  ];

  return (
    <div className="flex min-h-screen bg-neutral-100 dark:bg-neutral-900">
      <Sidebar links={links} userProfileLink={userProfileLink} />
      <div className="flex-1 p-4 md:p-6 ml-0 md:ml-[60px] lg:ml-[60px]">
        <div className="flex justify-end mb-4">
          <ThemeToggle />
        </div>
        <div className="w-full">
          <h1 className="text-xl md:text-3xl font-bold text-neutral-800 dark:text-neutral-200 mb-6">
            Dashboard
          </h1>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className={cn(
                  "p-10 rounded-lg shadow-md",
                  stat.color,
                  "text-neutral-800 dark:text-neutral-200",
                  "hover:shadow-lg transition-shadow duration-300"
                )}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center gap-3">
                  {stat.icon}
                  <div>
                    <p className="text-sm font-medium">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Recent Bookings Table */}
          <div className="mb-8">
            <h2 className="text-lg md:text-xl font-semibold text-neutral-800 dark:text-neutral-200 mb-4">
              Recent Bookings
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white dark:bg-neutral-800 rounded-lg shadow-md">
                <thead>
                  <tr className="bg-neutral-200 dark:bg-neutral-700">
                    <th className="p-3 text-left text-sm font-medium text-neutral-600 dark:text-neutral-300">Booking ID</th>
                    <th className="p-3 text-left text-sm font-medium text-neutral-600 dark:text-neutral-300">Flight</th>
                    <th className="p-3 text-left text-sm font-medium text-neutral-600 dark:text-neutral-300">User</th>
                    <th className="p-3 text-left text-sm font-medium text-neutral-600 dark:text-neutral-300">Destination</th>
                    <th className="p-3 text-left text-sm font-medium text-neutral-600 dark:text-neutral-300">Date</th>
                    <th className="p-3 text-left text-sm font-medium text-neutral-600 dark:text-neutral-300">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentBookings.map((booking, index) => (
                    <motion.tr
                      key={booking.id}
                      className="border-b dark:border-neutral-700"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <td className="p-3 text-neutral-800 dark:text-neutral-200">{booking.id}</td>
                      <td className="p-3 text-neutral-800 dark:text-neutral-200">{booking.flightNumber}</td>
                      <td className="p-3 text-neutral-800 dark:text-neutral-200">{booking.user}</td>
                      <td className="p-3 text-neutral-800 dark:text-neutral-200">{booking.destination}</td>
                      <td className="p-3 text-neutral-800 dark:text-neutral-200">{booking.date}</td>
                      <td className="p-3">
                        <span
                          className={cn(
                            "px-2 py-1 rounded-full text-xs font-medium",
                            booking.status === "Confirmed" ? "bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300" : "bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-300"
                          )}
                        >
                          {booking.status}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Popular Destinations */}
          <div>
            <h2 className="text-lg md:text-xl font-semibold text-neutral-800 dark:text-neutral-200 mb-4">
              Popular Destinations
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {popularDestinations.map((dest, index) => (
                <motion.div
                  key={dest.name}
                  className="relative p-4 rounded-lg bg-white dark:bg-neutral-800 shadow-md overflow-hidden"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-48 object-cover rounded-md mb-3"
                  />
                  <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200">{dest.name}</h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-300">{dest.bookings} bookings this month</p>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}