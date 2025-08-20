'use client'
import React from 'react'
import { Eye, Trash2 } from 'lucide-react'

export default function SuspendedUsers() {
  const users = [
    { id: 1, name: 'Olivia Rhye', username: 'olivia', accountType: 'Premium', status: 'Suspended', email: 'olivia@untitledui.com', joinDate: 'April 12, 2025', avatar: 'https://via.placeholder.com/30' },
    { id: 2, name: 'Phoenix Baker', username: 'phoenix', accountType: 'Free', status: 'Suspended', email: 'phoenix@untitledui.com', joinDate: 'April 12, 2025', avatar: 'https://via.placeholder.com/30' },
    { id: 3, name: 'Lana Steiner', username: 'lana', accountType: 'Free', status: 'Suspended', email: 'lana@untitledui.com', joinDate: 'April 12, 2025', avatar: 'https://via.placeholder.com/30' },
    { id: 4, name: 'Demi Wilkinson', username: 'demi', accountType: 'Premium', status: 'Suspended', email: 'demi@untitledui.com', joinDate: 'April 12, 2025', avatar: 'https://via.placeholder.com/30' },
    { id: 5, name: 'Candice Wu', username: 'candice', accountType: 'Free', status: 'Suspended', email: 'candice@untitledui.com', joinDate: 'April 12, 2025', avatar: 'https://via.placeholder.com/30' },
    { id: 6, name: 'Natali Craig', username: 'natali', accountType: 'Premium', status: 'Suspended', email: 'natali@untitledui.com', joinDate: 'April 12, 2025', avatar: 'https://via.placeholder.com/30' },
    { id: 7, name: 'Drew Cano', username: 'drew', accountType: 'Premium', status: 'Suspended', email: 'drew@untitledui.com', joinDate: 'April 12, 2025', avatar: 'https://via.placeholder.com/30' },
    { id: 8, name: 'Orlando Diggs', username: 'orlando', accountType: 'Free', status: 'Suspended', email: 'orlando@untitledui.com', joinDate: 'April 12, 2025', avatar: 'https://via.placeholder.com/30' },
    { id: 9, name: 'Andi Lane', username: 'andi', accountType: 'Premium', status: 'Suspended', email: 'andi@untitledui.com', joinDate: 'April 12, 2025', avatar: 'https://via.placeholder.com/30' },
    { id: 10, name: 'Kate Morrison', username: 'kate', accountType: 'Free', status: 'Suspended', email: 'kate@untitledui.com', joinDate: 'April 12, 2025', avatar: 'https://via.placeholder.com/30' },
  ]

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-purple-700">
          Suspended Users <span className="text-gray-500 text-base font-normal">({users.length} users)</span>
        </h2>
        <input
          type="text"
          placeholder="Search User..."
          className="border border-gray-300 rounded-lg p-2 w-full sm:w-1/3 mt-4 sm:mt-0 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left min-w-[900px] border-collapse">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 pl-4 pr-2 border-b-2 border-gray-200">
                <div className="flex items-center">
                  <input type="checkbox" className="h-4 w-4 text-purple-600 border-gray-300 rounded focus:ring-0 mr-2" />
                  <span className="text-sm font-medium text-gray-700">Name</span>
                </div>
              </th>
              <th className="py-3 px-2 border-b-2 border-gray-200">
                <span className="text-sm font-medium text-gray-700">Account Type</span>
              </th>
              <th className="py-3 px-2 border-b-2 border-gray-200">
                <span className="text-sm font-medium text-gray-700">Status</span>
              </th>
              <th className="py-3 px-2 border-b-2 border-gray-200">
                <span className="text-sm font-medium text-gray-700">Email Address</span>
              </th>
              <th className="py-3 px-2 border-b-2 border-gray-200">
                <span className="text-sm font-medium text-gray-700">Join Date</span>
              </th>
              <th className="py-3 px-2 border-b-2 border-gray-200">
                <span className="text-sm font-medium text-gray-700">Action</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 transition-colors duration-200">
                <td className="py-4 pl-4 pr-2 border-b border-gray-200">
                  <div className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 text-purple-600 border-gray-300 rounded focus:ring-0 mr-2" />
                    <img src={user.avatar} alt={user.name} className="w-6 h-6 rounded-full mr-2" />
                    <div className="text-sm">
                      <div className="font-medium text-gray-900">{user.name}</div>
                      <div className="text-gray-500 text-xs">@{user.username}</div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-2 border-b border-gray-200">
                  <span className="text-sm text-gray-700">{user.accountType}</span>
                </td>
                <td className="py-4 px-2 border-b border-gray-200">
                  <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                    user.status === 'Active' ? 'text-green-700 bg-green-100' : 'text-red-700 bg-red-100'
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="py-4 px-2 border-b border-gray-200">
                  <span className="text-sm text-gray-700">{user.email}</span>
                </td>
                <td className="py-4 px-2 border-b border-gray-200">
                  <span className="text-sm text-gray-700">{user.joinDate}</span>
                </td>
                <td className="py-4 px-2 border-b border-gray-200">
                  <div className="flex space-x-2">
                    <button className="text-purple-600 hover:text-purple-800 transition-colors duration-200">
                      <Eye className="w-5 h-5" />
                    </button>
                    <button className="text-red-600 hover:text-red-800 transition-colors duration-200">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-6 text-sm text-gray-500">
        <button className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 transition-colors duration-200">← Previous</button>
        <div className="space-x-2">
          <span className="px-3 py-1 rounded bg-purple-100 text-purple-700 font-medium">1</span>
          <span className="px-3 py-1 rounded hover:bg-gray-100">2</span>
          <span className="px-3 py-1 rounded hover:bg-gray-100">3</span>
          <span className="px-3 py-1 rounded hover:bg-gray-100">...</span>
          <span className="px-3 py-1 rounded hover:bg-gray-100">8</span>
          <span className="px-3 py-1 rounded hover:bg-gray-100">9</span>
          <span className="px-3 py-1 rounded hover:bg-gray-100">10</span>
        </div>
        <button className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 transition-colors duration-200">Next →</button>
      </div>
    </div>
  )
}