'use client'
import React, { useState } from 'react'
import Link from 'next/link'

export default function ProfileSubSecurityNav() {
  const [activeLink, setActiveLink] = useState('/admin/user-management/all-users')

  return (
    <div className="flex">
      <div className="flex-1 flex flex-col">
        <div className="p-6 flex-1 overflow-auto">
          <div className="flex space-x-6 border-b border-gray-200">
            <Link
              href="/admin/user-management/all-users"
              className={`pb-2 text-purple-600 border-b-2 border-purple-600 transition-all duration-300 ${
                activeLink === '/admin/user-management/all-users' ? 'border-b-2 border-purple-600' : 'border-b-transparent hover:border-b-2 hover:border-gray-300 hover:text-gray-900'
              }`}
              onClick={() => setActiveLink('/admin/user-management/all-users')}
            >
              All Users
            </Link>
            <Link
              href="/admin/user-management/suspended-users"
              className={`pb-2 text-gray-700 hover:text-gray-900 transition-all duration-300 ${
                activeLink === '/admin/user-management/suspended-users' ? 'border-b-2 border-purple-600' : 'border-b-transparent hover:border-b-2 hover:border-gray-300'
              }`}
              onClick={() => setActiveLink('/admin/user-management/suspended-users')}
            >
              Suspended Users
            </Link>
            <Link
              href="/admin/user-management/verification-request"
              className={`pb-2 text-gray-700 hover:text-gray-900 transition-all duration-300 ${
                activeLink === '/admin/user-management/verification-request' ? 'border-b-2 border-purple-600' : 'border-b-transparent hover:border-b-2 hover:border-gray-300'
              }`}
              onClick={() => setActiveLink('/admin/user-management/verification-request')}
            >
              Verification Requests
            </Link>
            https://appfur.postman.co/workspace/f89b4667-1237-4513-888e-e1f3c8168c8b/request/45186967-351d4c57-3f3a-48ec-81f7-dd1a5dd1bc92?action=share&source=copy-link&creator=39620868
          </div>
        </div>
      </div>
    </div>
  )
}