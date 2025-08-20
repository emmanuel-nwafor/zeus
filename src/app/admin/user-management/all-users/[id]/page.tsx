'use client';
import React, { useState, useEffect } from 'react';
import Sidebar from '@/app/components/Sidebar';
import DashboardHeader from '@/app/components/DashboardHeader';
import UserManagementNav from '@/app/components/UserManagementNav';
import { useParams } from 'next/navigation';

interface UserProfile {
  status: string;
  data: {
    spokenLanguages: string[];
    hobbies: string[];
    interests: string[];
    favoriteColors: string[];
    pets: string[];
    lookingFor: string[];
    images: string[];
    videos: string[];
    createdAt: string;
    updatedAt: string;
    userId: {
      location: { type: string; coordinates: number[] };
      _id: string;
      firstName: string;
      lastName: string;
      role: string;
      emailVerified: boolean;
      phoneVerified: boolean;
      facialVerified: boolean;
      premium: boolean;
      email: string;
      photo: string;
      likedUsers: string[];
      blockedUsers: string[];
      matchedUsers: string[];
      isBlocked: boolean;
      createdAt: string;
      updatedAt: string;
      profileId: string;
      id: string;
    };
    id: string;
  };
  message: string;
}

async function fetchUserProfile(userId: string) {
  const token = process.env.PUBLIC_TOKEN;
  if (!token) {
    throw new Error('Token not found in environment variables');
  }

  const response = await fetch(`${process.env.ADMIN_API_CALL}/admin/profile/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    cache: 'no-store',
  });

  if (!response.ok) throw new Error(`Failed to fetch user profile: ${response.status}`);
  return await response.json() as UserProfile;
}

export default function UserProfile() {
  const params = useParams();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!params?.id) {
        setError('No user ID provided');
        return;
      }
      try {
        const data = await fetchUserProfile(params.id as string);
        setProfile(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      }
    };
    fetchData();
  }, [params?.id]);

  if (error) return (
    <div className="flex h-screen bg-white">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        <UserManagementNav />
        <div className="p-2 sm:p-4 md:p-6 flex-1 overflow-auto text-center text-red-600">{error}</div>
      </div>
    </div>
  );
  if (!profile) return (
    <div className="flex h-screen bg-white">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        <UserManagementNav />
        <div className="p-2 sm:p-4 md:p-6 flex-1 overflow-auto text-center text-gray-700">Loading...</div>
      </div>
    </div>
  );

  const user = profile.data.userId;

  return (
    <div className="flex h-screen bg-white">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        <UserManagementNav />
        <div className="p-2 sm:p-4 md:p-6 flex-1 overflow-auto">
          <div className="bg-white p-2 sm:p-4 md:p-6 rounded-lg shadow-lg">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-purple-700 mb-2 sm:mb-4">User Profile</h2>
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 mb-2 sm:mb-4">
              <img
                src={user.photo}
                alt={`${user.firstName} ${user.lastName}`}
                className="w-12 sm:w-16 h-12 sm:h-16 rounded-full"
                onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/30'; }}
              />
              <div>
                <div className="font-medium text-gray-900 text-base sm:text-lg">{`${user.firstName} ${user.lastName}`}</div>
                <div className="text-sm text-gray-500">ID: {user.id}</div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div><strong>Role:</strong> {user.role}</div>
              <div><strong>Email:</strong> {user.email}</div>
              <div><strong>Email Verified:</strong> {user.emailVerified ? 'Yes' : 'No'}</div>
              <div><strong>Phone Verified:</strong> {user.phoneVerified ? 'Yes' : 'No'}</div>
              <div><strong>Facial Verified:</strong> {user.facialVerified ? 'Yes' : 'No'}</div>
              <div><strong>Premium:</strong> {user.premium ? 'Yes' : 'No'}</div>
              <div><strong>Created At:</strong> {new Date(user.createdAt).toLocaleDateString()}</div>
              <div><strong>Updated At:</strong> {new Date(user.updatedAt).toLocaleDateString()}</div>
              <div><strong>Location:</strong> {`[${user.location.coordinates[1]}, ${user.location.coordinates[0]}]`}</div>
              {/* Add more fields as needed */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}