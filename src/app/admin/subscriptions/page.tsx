import React from 'react'
import Sidebar from '../../components/Sidebar'
import DashboardHeader from '../../components/DashboardHeader'

export default function UserSubscriptions() {
  return (
    <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <DashboardHeader />
          <div className="p-6 flex-1 overflow-auto">
            {/* User management */}
            This page manages users sub etc
          </div>
        </div>
      </div>
  )
}
