import React from 'react';
import Sidebar from '@/app/components/Sidebar';
import DashboardHeader from '@/app/components/DashboardHeader';
import UserManagementNav from '@/app/components/UserManagementNav';
import UserTable from '@/app/components/UserTable';

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

interface Profile {
  userId: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    premium: boolean;
    emailVerified: boolean;
    createdAt: string;
    photo?: string;
    role: string;
  } | null;
}

interface ApiResponse {
  data: {
    profiles: Profile[];
  };
}

async function fetchUsers() {
  const token = process.env.PUBLIC_TOKEN;
  if (!token) {
    throw new Error('Token not found in environment variables');
  }

  const response = await fetch('https://api.blumdate.com/admin/profiles', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    cache: 'no-store', // Prevent caching for fresh data
  });

  if (!response.ok) throw new Error('Failed to fetch users');
  const data: ApiResponse = await response.json();
  const formattedUsers: User[] = data.data?.profiles
    ?.filter((profile): profile is { userId: NonNullable<Profile['userId']> } => profile.userId !== null)
    .map(profile => ({
      id: profile.userId._id,
      name: `${profile.userId.firstName} ${profile.userId.lastName}`,
      username: profile.userId.email.split('@')[0],
      accountType: profile.userId.premium ? 'Premium' : 'Free',
      status: profile.userId.emailVerified ? 'Active' : 'Pending',
      email: profile.userId.email,
      joinDate: new Date(profile.userId.createdAt).toLocaleDateString(),
      avatar: profile.userId.photo || 'https://via.placeholder.com/30',
      role: profile.userId.role,
    })) || [];

  return formattedUsers;
}

export default async function AllUsers() {
  let users: User[] = [];
  let error: string | null = null;

  try {
    users = await fetchUsers();
  } catch (err) {
    error = err instanceof Error ? err.message : 'An error occurred';
  }

  return (
    <div className="flex h-screen bg-white">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        <UserManagementNav />
        <div className="p-4 md:p-6 flex-1 overflow-auto">
          {error ? (
            <div className="text-center text-red-600 dark:text-red-400">{error}</div>
          ) : (
            <UserTable users={users} />
          )}
        </div>
      </div>
    </div>
  );
}