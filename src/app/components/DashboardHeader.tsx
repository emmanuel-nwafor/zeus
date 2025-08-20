import React from 'react'

export default function DashboardHeader() {
  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <div className="flex items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>
      <div className="flex items-center">
        <span className="text-gray-600 mr-2">Oladeinde Olamide</span>
        <img
          src="https://via.placeholder.com/30"
          alt="User Avatar"
          className="w-8 h-8 rounded-full"
        />
      </div>
    </header>
  )
}