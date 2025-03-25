'use client'

import { usePathname } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Toaster } from 'react-hot-toast'

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isDashboardPage = pathname?.startsWith('/dashboard') || pathname?.startsWith('/admin/dashboard')

  return (
    <div className="min-h-screen flex flex-col">
      {!isDashboardPage && <Navbar />}
      <main className="flex-1">
        {children}
      </main>
      {!isDashboardPage && <Footer />}
      <Toaster position="top-right" />
    </div>
  )
}