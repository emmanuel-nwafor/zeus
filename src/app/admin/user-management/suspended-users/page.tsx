import React from 'react'
import Sidebar from '../../../components/Sidebar'
import DashboardHeader from '../../../components/DashboardHeader'
import UserManagementNav from '@/app/components/UserManagementNav'
import SuspendedUsers from '@/app/components/SuspendedUsers'

export default function SuspendedUser() {
  return (
    <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <DashboardHeader />
          <UserManagementNav />
          <div className="p-6 flex-1 overflow-auto">
            {/* User management */}
            <SuspendedUsers />
          </div>
        </div>
      </div>
  )
}
