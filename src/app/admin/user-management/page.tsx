import React from 'react'
import Sidebar from '../../components/Sidebar'
import DashboardHeader from '../../components/DashboardHeader'
import UserManagementNav from '../../components/UserManagementNav.jsx'
import Link from 'next/link'

export default function ManageUsers() {
  return (
    <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <DashboardHeader />
          <UserManagementNav />
          <div className="p-6 flex-1 overflow-auto">
            {/* User management */}
            <div className="flex">
              User management
            </div>
          </div>
        </div>
      </div>
  )
}
