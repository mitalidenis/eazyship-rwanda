'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { TruckIcon } from '@heroicons/react/24/outline'
import { UserRole } from '@prisma/client'

interface Shipment {
  id: string
  fromCountry: string
  toCountry: string
  status: string
  trackingNumber: string
  createdAt: string
  user: {
    name: string
    email: string
  }
}

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [shipments, setShipments] = useState<Shipment[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Redirect if not authenticated or not an admin
    if (status === 'unauthenticated') {
      router.push('/auth/login')
    } else if (status === 'authenticated' && session?.user?.role !== UserRole.ADMIN) {
      router.push('/dashboard')
    }
  }, [status, session, router])

  useEffect(() => {
    // Fetch shipments when authenticated as admin
    const fetchShipments = async () => {
      if (session?.user?.role === UserRole.ADMIN) {
        try {
          const response = await fetch('/api/shipments')
          if (!response.ok) {
            throw new Error('Failed to fetch shipments')
          }
          const data = await response.json()
          setShipments(data)
          setIsLoading(false)
        } catch (error) {
          console.error('Error fetching shipments:', error)
          setIsLoading(false)
        }
      }
    }

    fetchShipments()
  }, [session])

  // Status color mapping
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING': return 'bg-yellow-100 text-yellow-800'
      case 'IN_TRANSIT': return 'bg-blue-100 text-blue-800'
      case 'DELIVERED': return 'bg-green-100 text-green-800'
      case 'CANCELLED': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-primary-600 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6">
          Admin Dashboard
        </h1>

        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-primary-600">
              All Shipments
            </h2>
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-primary-500">
                <TruckIcon className="h-5 w-5 mr-2" />
                <span>10 Total</span>
              </div>
            </div>
          </div>

          {shipments.length === 0 ? (
            <div className="text-center py-12">
              <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8">
                <h2 className="text-2xl font-bold mb-6 text-primary-600">Shipments</h2>
                <div className="overflow-x-auto">
                  <table className="w-full bg-white divide-y divide-primary-200">
                    <thead className="bg-primary-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-primary-500 uppercase tracking-wider">
                          Shipment ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-primary-500 uppercase tracking-wider">
                          From Country
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-primary-500 uppercase tracking-wider">
                          To Country
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-primary-500 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-primary-500 uppercase tracking-wider">
                          Email
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-primary-500 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-primary-200">
                      {[
                        { id: 'SHP0132321', fromCountry: 'USA', toCountry: 'Rwanda', name: 'Denis Mitali', email: 'mitalidenis5@gmail.com', status: 'PENDING' },
                        { id: 'SHP0232312', fromCountry: 'China', toCountry: 'Rwanda', name: 'Fred Mugabo', email: 'fredmugabo@gmail.com', status: 'IN_TRANSIT' },
                        { id: 'SHP0123123', fromCountry: 'Germany', toCountry: 'Rwanda', name: 'Alice Murerwa', email: 'alice.murerwa@gmail.com', status: 'DELIVERED' },
                        { id: 'SHP0231123', fromCountry: 'UK', toCountry: 'Rwanda', name: 'Kirabo Monica', email: 'kirabomonica@gmail.com', status: 'PENDING' },
                        { id: 'SHP0232132', fromCountry: 'France', toCountry: 'Rwanda', name: 'David Cyubahiro', email: 'davidcyubahiro@gmail.com', status: 'IN_TRANSIT' },
                        { id: 'SHP0233213', fromCountry: 'Japan', toCountry: 'Rwanda', name: 'Pretty Mahoro', email: 'pretty.mahoro@gmail.com', status: 'DELIVERED' },
                        { id: 'SHP0123131', fromCountry: 'Canada', toCountry: 'Rwanda', name: 'Noble Manzi', email: 'noblemanzi@gmail.com', status: 'PENDING' },
                        { id: 'SHP0054354', fromCountry: 'Australia', toCountry: 'Rwanda', name: 'Esther Uwera', email: 'estheruwera@gmail.com', status: 'IN_TRANSIT' },
                        { id: 'SHP0676777', fromCountry: 'Brazil', toCountry: 'Rwanda', name: 'Ruth Uwase', email: 'ruthuwase@gmail.com', status: 'DELIVERED' },
                        { id: 'SHP0878568', fromCountry: 'India', toCountry: 'Rwanda', name: 'Eric Ganza', email: 'ericganza@gmail.com', status: 'PENDING' }
                      ].map((shipment) => (
                        <tr key={shipment.id} className="hover:bg-primary-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary-900">
                            {shipment.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-primary-500">
                            {shipment.fromCountry}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-primary-500">
                            {shipment.toCountry}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-primary-500">
                            {shipment.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-primary-500">
                            {shipment.email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              shipment.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                              shipment.status === 'IN_TRANSIT' ? 'bg-blue-100 text-blue-800' :
                              shipment.status === 'DELIVERED' ? 'bg-green-100 text-green-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {shipment.status.replace('_', ' ')}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-primary-200">
                <thead className="bg-primary-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-primary-500 uppercase tracking-wider">
                      Tracking Number
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-primary-500 uppercase tracking-wider">
                      From - To
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-primary-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-primary-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-primary-500 uppercase tracking-wider">
                      Created At
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-primary-200">
                  {shipments.map((shipment) => (
                    <tr key={shipment.id} className="hover:bg-primary-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary-900">
                        {shipment.trackingNumber}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-primary-500">
                        {shipment.fromCountry} - {shipment.toCountry}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-primary-500">
                        <div>{shipment.user.name}</div>
                        <div className="text-xs text-primary-400">{shipment.user.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(shipment.status)}`}>
                          {shipment.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-primary-500">
                        {new Date(shipment.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}