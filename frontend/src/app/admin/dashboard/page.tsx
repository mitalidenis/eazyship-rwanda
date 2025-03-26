'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { 
  ChartBarIcon, 
  TruckIcon, 
  UsersIcon, 
  CurrencyDollarIcon 
} from '@heroicons/react/24/outline'
import SessionProvider from '@/components/SessionProvider'
import { useRouter } from 'next/navigation'

function DashboardPageContent() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [dashboardStats, setDashboardStats] = useState({
    totalShipments: 0,
    activeShipments: 0,
    totalRevenue: 0,
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
  
    if (status === 'unauthenticated') {
      router.push('/')
    }

    // Fetch stats
    if (status === 'authenticated' && session?.user) {
      console.log('Authenticated user:', session.user)
      
      const fetchStats = async () => {
        try {
          // Placeholder for actual API call
          setDashboardStats({
            totalShipments: 10,
            activeShipments: 5,
            totalRevenue: 50000
          })
        } catch (error) {
          console.error('Failed to fetch dashboard stats', error)
        } finally {
          setIsLoading(false)
        }
      }

      fetchStats()
    } else if (status === 'loading') {
      setIsLoading(true)
    } else {
      setIsLoading(false)
    }
  }, [status, session, router])

  // Prevent rendering during loading
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    )
  }

  // Render dashboard content
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Shipments */}
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
          <div className="bg-blue-100 p-3 rounded-full mr-4">
            <TruckIcon className="h-8 w-8 text-blue-600" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Total Shipments</p>
            <p className="text-2xl font-bold">{dashboardStats.totalShipments}</p>
          </div>
        </div>

        {/* Active Shipments */}
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
          <div className="bg-green-100 p-3 rounded-full mr-4">
            <ChartBarIcon className="h-8 w-8 text-green-600" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Active Shipments</p>
            <p className="text-2xl font-bold">{dashboardStats.activeShipments}</p>
          </div>
        </div>

        {/* Total Revenue */}
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
          <div className="bg-purple-100 p-3 rounded-full mr-4">
            <CurrencyDollarIcon className="h-8 w-8 text-purple-600" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Total Revenue</p>
            <p className="text-2xl font-bold">RWF {dashboardStats.totalRevenue.toLocaleString()}</p>
          </div>
        </div>

        {/* Customer Count */}
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
          <div className="bg-red-100 p-3 rounded-full mr-4">
            <UsersIcon className="h-8 w-8 text-red-600" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Total Customers</p>
            <p className="text-2xl font-bold">50</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <SessionProvider>
      <DashboardPageContent />
    </SessionProvider>
  )
}
