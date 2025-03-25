'use client'

import * as React from 'react'
import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { 
  HomeIcon, 
  CogIcon, 
  TruckIcon,
  ArrowLeftStartOnRectangleIcon 
} from '@heroicons/react/24/outline'
import { signOut, useSession } from "next-auth/react"

export default function AdminDashboardLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    console.log('Session data:', session)
    
    // REMOVE ANY REDIRECTION LOGIC HERE
  }, [status, session])

  const menuItems = [
    { 
      name: 'Dashboard', 
      icon: HomeIcon, 
      href: '/admin/dashboard' 
    },
    { 
      name: 'Shipments', 
      icon: TruckIcon, 
      href: '/admin/shipments' 
    },
    { 
      name: 'Settings', 
      icon: CogIcon, 
      href: '/admin/settings' 
    }
  ]

  const handleLogout = async () => {
    await signOut({ 
      redirect: false  // No automatic redirection
    })
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-4">
        <nav>
          <ul>
            {menuItems.map((item) => (
              <li 
                key={item.href} 
                className={`mb-2 ${pathname === item.href ? 'bg-gray-700' : ''}`}
              >
                <a 
                  href={item.href} 
                  className="flex items-center p-2 hover:bg-gray-700 rounded"
                >
                  <item.icon className="w-6 h-6 mr-2" />
                  {item.name}
                </a>
              </li>
            ))}
            <li>
              <button 
                onClick={handleLogout}
                className="flex items-center p-2 hover:bg-red-700 rounded w-full text-left"
              >
                <ArrowLeftStartOnRectangleIcon className="w-6 h-6 mr-2" />
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {children}
      </div>
    </div>
  )
}