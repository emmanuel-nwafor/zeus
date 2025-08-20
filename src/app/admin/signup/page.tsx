import React, { useState } from 'react';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState(null);

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://api.blumdate.com/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code }),
      });
      if (!response.ok) throw new Error('Signup failed');
      const data = await response.json();
      alert('Signup successful! Please log in.');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Sign Up</h2>
        {error && <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>}
        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-gray-200"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-2">Code</label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-gray-200"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 text-white p-2 rounded-lg hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-800 transition-colors"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}