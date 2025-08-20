import React from 'react'
import Sidebar from '../../../components/Sidebar'
import DashboardHeader from '../../../components/DashboardHeader'
import UserManagementNav from '@/app/components/UserManagementNav'

export default function VerificationRequset() {
  return (
    <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <DashboardHeader />
          <UserManagementNav />
          <div className="p-6 flex-1 overflow-auto">
            {/* User management */}
            This page manages all users verification request etc
          </div>
        </div>
      </div>
  )
}
