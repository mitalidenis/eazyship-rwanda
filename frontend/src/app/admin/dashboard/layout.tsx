// c:\Users\Admin\CascadeProjects\eazyship-rwanda\frontend\src\app\admin\dashboard\layout.tsx
'use client'

import * as React from 'react'
import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { 
  HomeIcon, 
  CogIcon, 
  ArrowLeftStartOnRectangleIcon,
  Bars3Icon 
} from '@heroicons/react/24/outline'
import { signOut, useSession } from "next-auth/react"
import { UserRole } from '@prisma/client'
import Link from 'next/link'
import Footer from '@/components/Footer'

const navigation = [
  { 
    name: 'Dashboard', 
    href: '/admin/dashboard', 
    icon: HomeIcon 
  },
  { 
    name: 'Settings', 
    href: '/admin/dashboard/settings', 
    icon: CogIcon 
  }
]

export default function AdminDashboardLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  // Redirect if not an admin
  useEffect(() => {
    if (status === 'authenticated' && session?.user?.role !== UserRole.ADMIN) {
      router.push('/dashboard')
    } else if (status === 'unauthenticated') {
      router.push('/auth/login')
    }
  }, [status, session, router])

  const handleSignOut = () => {
    signOut({ callbackUrl: '/auth/login' })
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Logout Button */}
      <div className="fixed bottom-4 right-4 z-50">
        <button 
          onClick={handleSignOut}
          className="bg-red-500 text-white p-3 rounded-full shadow-lg hover:bg-red-600 transition-colors"
          aria-label="Sign Out"
        >
          <ArrowLeftStartOnRectangleIcon className="h-6 w-6" />
        </button>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}