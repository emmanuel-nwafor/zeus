'use client'
import React from 'react'
import Sidebar from './Sidebar'
import Statistics from './Statistics'
import DashboardHeader from './DashboardHeader'

export default function ClientRendering() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        <div className="p-6 flex-1 overflow-auto">
          <Statistics />
        </div>
      </div>
    </div>
  )
}