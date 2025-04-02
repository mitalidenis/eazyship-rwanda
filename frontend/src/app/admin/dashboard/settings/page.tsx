'use client'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { UserRole } from '@prisma/client'

export default function AdminSettingsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  // Redirect if not an admin
  if (status === 'authenticated' && session?.user?.role !== UserRole.ADMIN) {
    router.push('/dashboard')
  }

  // Copy the exact implementation from user dashboard settings page
  return (
    <div className="min-h-screen bg-primary-600 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold text-primary-600 mb-6">
          Account Settings
        </h1>
        
        <div className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-primary-700">
              Name
            </label>
            <input 
              type="text" 
              id="name" 
              className="mt-1 block w-full rounded-md border-primary-300 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
              value={session?.user?.name || ''}
              readOnly
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-primary-700">
              Email
            </label>
            <input 
              type="email" 
              id="email" 
              className="mt-1 block w-full rounded-md border-primary-300 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
              value={session?.user?.email || ''}
              readOnly
            />
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-medium text-primary-700">
              Role
            </label>
            <input 
              type="text" 
              id="role" 
              className="mt-1 block w-full rounded-md border-primary-300 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
              value={session?.user?.role || ''}
              readOnly
            />
          </div>
        </div>
      </div>
    </div>
  )
}