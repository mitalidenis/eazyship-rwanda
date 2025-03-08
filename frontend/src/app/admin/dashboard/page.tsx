'use client'

import { useState } from 'react'
import { TruckIcon, ClockIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline'

export default function AdminDashboard() {
  // Mock orders data with user information
  const orders = [
    {
      id: 'ORD001',
      date: '2025-03-01',
      status: 'Delivered',
      items: 'iPhone 15 Pro',
      from: 'USA',
      trackingNumber: 'TRK123456789',
      user: {
        name: 'John Doe',
        email: 'john@example.com'
      }
    },
    {
      id: 'ORD002',
      date: '2025-03-03',
      status: 'In Transit',
      items: 'MacBook Air',
      from: 'UK',
      trackingNumber: 'TRK987654321',
      user: {
        name: 'Jane Smith',
        email: 'jane@example.com'
      }
    },
    {
      id: 'ORD003',
      date: '2025-03-04',
      status: 'Processing',
      items: 'AirPods Pro',
      from: 'China',
      trackingNumber: 'TRK456789123',
      user: {
        name: 'Bob Wilson',
        email: 'bob@example.com'
      }
    }
  ]

  const [selectedStatus, setSelectedStatus] = useState('all')

  const filteredOrders = selectedStatus === 'all' 
    ? orders 
    : orders.filter(order => order.status.toLowerCase() === selectedStatus.toLowerCase())

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return <CheckCircleIcon className="mr-1 h-4 w-4 text-green-500" />
      case 'in transit':
        return <TruckIcon className="mr-1 h-4 w-4 text-blue-500" />
      case 'processing':
        return <ClockIcon className="mr-1 h-4 w-4 text-yellow-500" />
      default:
        return <XCircleIcon className="mr-1 h-4 w-4 text-red-500" />
    }
  }

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'bg-green-100 text-green-800'
      case 'in transit':
        return 'bg-blue-100 text-blue-800'
      case 'processing':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-red-100 text-red-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-10">
        <header>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">Admin Dashboard</h1>
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
            {/* Order Management */}
            <div className="bg-white shadow sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="sm:flex sm:items-center">
                  <div className="sm:flex-auto">
                    <h2 className="text-lg font-medium leading-6 text-gray-900">Order Management</h2>
                    <p className="mt-2 text-sm text-gray-700">
                      A list of all orders including their status, customer details, and tracking information.
                    </p>
                  </div>
                  <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                    <select
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
                    >
                      <option value="all">All Orders</option>
                      <option value="delivered">Delivered</option>
                      <option value="in transit">In Transit</option>
                      <option value="processing">Processing</option>
                    </select>
                  </div>
                </div>
                <div className="mt-8 flow-root">
                  <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                      <table className="min-w-full divide-y divide-gray-300">
                        <thead>
                          <tr>
                            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Order ID</th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Date</th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Customer</th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Items</th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">From</th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Tracking</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {filteredOrders.map((order) => (
                            <tr key={order.id}>
                              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">{order.id}</td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{order.date}</td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                <div>{order.user.name}</div>
                                <div className="text-gray-400">{order.user.email}</div>
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{order.items}</td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{order.from}</td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm">
                                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(order.status)}`}>
                                  {getStatusIcon(order.status)}
                                  {order.status}
                                </span>
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{order.trackingNumber}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
