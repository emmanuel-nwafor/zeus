'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, Trash2 } from 'lucide-react';

interface User {
  id: string;
  name: string;
  username: string;
  accountType: string;
  status: string;
  email: string;
  joinDate: string;
  avatar: string;
  role: string;
}

export default function UserTable({ users: initialUsers }: { users: User[] }) {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState<User[]>(initialUsers);
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);
  const usersPerPage = 10;
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      const filtered = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
      setCurrentPage(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm, users]);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = useMemo(() => filteredUsers.slice(indexOfFirstUser, indexOfLastUser), [filteredUsers, indexOfFirstUser, indexOfLastUser]);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const handleViewUser = async (userId: string) => {
    const apiUrl = `${process.env.ADMIN_API_CALL}/admin/profile/${userId}`;
    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.PUBLIC_TOKEN}`,
        },
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const userData = await response.json();
      router.push(`/admin/user-management/profile/${userId}`);
    } catch (error) {
      console.error('Fetch error details:', error);
      if (error instanceof Error) {
        alert(`Failed to fetch user profile: ${error.message}`);
      }
      router.push(`/admin/user-management/profile/${userId}`);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    setUserToDelete(userId);
    setShowDeletePopup(true);
  };

  const confirmDelete = async () => {
    if (!userToDelete) return;
    const apiUrl = `${process.env.ADMIN_API_CALL}/admin/profile/${userToDelete}`;
    try {
      const response = await fetch(apiUrl, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.PUBLIC_TOKEN}`,
        },
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const result = await response.json();
      console.log('Delete successful:', result);
      setUsers(users.filter(user => user.id !== userToDelete));
      setShowDeletePopup(false);
      setUserToDelete(null);
    } catch (error) {
      console.error('Delete error:', error);
      if (error instanceof Error) {
        alert(`Failed to delete user: ${error.message}`);
      }
    }
  };

  const cancelDelete = () => {
    setShowDeletePopup(false);
    setUserToDelete(null);
  };

  const handlePageChange = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && currentPage > 1) setCurrentPage(currentPage - 1);
    else if (direction === 'next' && currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-purple-700">
          All Users <span className="text-gray-500 text-base font-normal">({filteredUsers.length} users)</span>
        </h2>
        <input
          type="text"
          placeholder="Search User..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 w-full sm:w-1/3 mt-4 sm:mt-0 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left min-w-[900px] border-collapse hidden md:table">
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
            {currentUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 transition-colors duration-200">
                <td className="py-4 pl-4 pr-2 border-b border-gray-200">
                  <div className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 text-purple-600 border-gray-300 rounded focus:ring-0 mr-2" />
                    <img src={user.avatar} alt={user.name} className="w-6 h-6 rounded-full mr-2" onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/30'; }} />
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
                    <button onClick={() => handleViewUser(user.id)} className="text-purple-600 hover:text-purple-800 transition-colors duration-200">
                      <Eye className="w-5 h-5" />
                    </button>
                    <button onClick={() => handleDeleteUser(user.id)} className="text-red-600 hover:text-red-800 transition-colors duration-200">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="md:hidden grid grid-cols-1 gap-4">
          {currentUsers.map((user) => (
            <div key={user.id} className="grid grid-cols-2 gap-2 bg-white p-4 rounded-lg shadow hover:bg-gray-50 transition-colors duration-200">
              <div className="col-span-2 flex items-center space-x-2 mb-2">
                <input type="checkbox" className="h-4 w-4 text-purple-600 border-gray-300 rounded focus:ring-0 mr-2" />
                <img src={user.avatar} alt={user.name} className="w-6 h-6 rounded-full mr-2" onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/30'; }} />
                <div>
                  <div className="font-medium text-gray-900">{user.name}</div>
                  <div className="text-gray-500 text-xs">@{user.username}</div>
                </div>
              </div>
              <div className="font-medium text-gray-700">Account Type</div>
              <div className="text-gray-700">{user.accountType}</div>
              <div className="font-medium text-gray-700">Status</div>
              <div className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                user.status === 'Active' ? 'text-green-700 bg-green-100' : 'text-red-700 bg-red-100'
              }`}>
                {user.status}
              </div>
              <div className="font-medium text-gray-700">Email</div>
              <div className="text-gray-700">{user.email}</div>
              <div className="font-medium text-gray-700">Join Date</div>
              <div className="text-gray-700">{user.joinDate}</div>
              <div className="font-medium text-gray-700">Action</div>
              <div className="flex space-x-2">
                <button onClick={() => handleViewUser(user.id)} className="text-purple-600 hover:text-purple-800 transition-colors duration-200">
                  <Eye className="w-5 h-5" />
                </button>
                <button onClick={() => handleDeleteUser(user.id)} className="text-red-600 hover:text-red-800 transition-colors duration-200">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {showDeletePopup && (
        <div className="fixed inset-0 bg-gray-50 bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center mb-4">
              <Trash2 className="w-6 h-6 text-red-600 mr-2" />
              <h3 className="text-lg font-semibold text-purple-700">Confirm Deletion</h3>
            </div>
            <p className="text-gray-700 mb-4">Are you sure you want to delete this user?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors duration-200"
              >
                No
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors duration-200"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="flex justify-between items-center mt-6 text-sm text-gray-500">
        <button
          onClick={() => handlePageChange('prev')}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 transition-colors duration-200 disabled:opacity-50"
        >
          ← Previous
        </button>
        <div className="space-x-2">
          {[...Array(totalPages)].map((_, index) => (
            <span
              key={index + 1}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-3 py-1 rounded cursor-pointer ${currentPage === index + 1 ? 'bg-purple-100 text-purple-700 font-medium' : 'hover:bg-gray-100'}`}
            >
              {index + 1}
            </span>
          ))}
        </div>
        <button
          onClick={() => handlePageChange('next')}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 transition-colors duration-200 disabled:opacity-50"
        >
          Next →
        </button>
      </div>
    </div>
  );
}