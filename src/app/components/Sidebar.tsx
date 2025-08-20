'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { Menu, LayoutDashboard, Users, ShieldCheck, CreditCard, Flag, Mail, User, LogOut } from 'lucide-react'

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-gray-100 rounded"
      >
        <Menu className="w-6 h-6" />
      </button>
      <div
        className={`w-64 h-screen bg-gray-100 p-4 flex flex-col justify-between transition-all duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 fixed md:static z-40`}
      >
        <div>
          <div className="flex mb-8 items-center">
            <img
              className="h-10"
              src="https://vercel.com/api/v0/deployments/dpl_CZ9wpENxpt1yHZcm5W1cWG79CvxQ/favicon?project=blum-date&readyState=READY&teamId=team_oWV743q6AKiY5P899CooniCH"
              alt="blumdate-logo"
            />
            <h1 className="font-bold text-xl m-3 text-pink-500">
              Blumdate
            </h1>
          </div>
          <Link
            href="/admin"
            className="w-full text-left bg-[#c805b8] rounded-xl text-white py-3 px-4 mb-2 hover:bg-purple-700 flex items-center"
          >
            <LayoutDashboard className="w-5 h-5 mr-2" />
            Dashboard
          </Link>
          <Link
            href="/admin/user-management/all-users"
            className="w-full text-left text-gray-700 py-3 px-4 mb-2 hover:bg-gray-200 hover:rounded-xl flex items-center"
          >
            <Users className="w-5 h-5 mr-2" />
            User Management
          </Link>
          <Link
            href="/admin/content-moderation"
            className="w-full text-left text-gray-700 py-3 px-4 mb-2 hover:bg-gray-200 hover:rounded-xl flex items-center"
          >
            <ShieldCheck className="w-5 h-5 mr-2" />
            Content Moderation
          </Link>
          <Link
            href="/admin/subscriptions"
            className="w-full text-left text-gray-700 py-3 px-4 mb-2 hover:bg-gray-200 hover:rounded-xl flex items-center"
          >
            <CreditCard className="w-5 h-5 mr-2" />
            Subscriptions
          </Link>
          <Link
            href="/admin/report-abuse"
            className="w-full text-left text-gray-700 py-3 px-4 mb-2 hover:bg-gray-200 hover:rounded-xl flex items-center"
          >
            <Flag className="w-5 h-5 mr-2" />
            Reports & Abuse
          </Link>
          <Link
            href="/admin/communication-mgt"
            className="w-full text-left text-gray-700 py-3 px-4 mb-2 hover:bg-gray-200 hover:rounded-xl flex items-center"
          >
            <Mail className="w-5 h-5 mr-2" />
            Communication Mgt
          </Link>
          <Link
            href="/admin/profile"
            className="w-full text-left text-gray-700 py-3 px-4 mb-2 hover:bg-gray-200 hover:rounded-xl flex items-center"
          >
            <User className="w-5 h-5 mr-2" />
            Profile
          </Link>
        </div>
        <Link
          href="/logout"
          className="w-full rounded-xl text-left text-red-500 py-3 px-4 hover:bg-red-100 flex items-center"
        >
          <LogOut className="w-5 h-5 mr-2" />
          Logout
        </Link>
      </div>
    </>
  )
}