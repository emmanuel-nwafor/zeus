'use client'
import React from 'react'

export default function Statistics() {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <h1 className="text-gray-500 text-sm">All Users</h1>
          <span className="text-2xl font-bold">52</span>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <h1 className="text-gray-500 text-sm">Active Subscriptions</h1>
          <span className="text-2xl font-bold">11</span>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <h1 className="text-gray-500 text-sm">Verification Request</h1>
          <span className="text-2xl font-bold">4</span>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <h1 className="text-gray-500 text-sm">Reports Received</h1>
          <span className="text-2xl font-bold">0</span>
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <h1 className="text-gray-500 text-sm mb-2">Subscription Revenue Trends</h1>
        <div className="flex justify-between text-xs text-gray-400 mb-2">
          <span>12 months</span>
          <span>3 months</span>
          <span>30 days</span>
          <span>7 days</span>
          <span>24 hours</span>
        </div>
        <div className="h-48 flex items-end">
          {/* <svg className="w-full" viewBox="0 0 100 40" preserveAspectRatio="none">
            <path
              d="M0,30 Q10,25 20,28 T40,30 T60,35 T80,32 T100,30"
              fill="none"
              stroke="#e41c92"
              strokeWidth="2"
            />
            <rect width="100" height="40" fill="rgba(228, 28, 146, 0.1)" />
          </svg> */}
        </div>
        <div className="flex justify-between text-xs text-gray-400 mt-2">
          <span>Jan</span>
          <span>Feb</span>
          <span>Mar</span>
          <span>Apr</span>
          <span>May</span>
          <span>Jun</span>
          <span>Jul</span>
          <span>Aug</span>
          <span>Sep</span>
          <span>Oct</span>
          <span>Nov</span>
          <span>Dec</span>
        </div>
      </div>
    </div>
  )
}