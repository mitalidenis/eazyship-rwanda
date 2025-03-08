'use client'

import { useState } from 'react'
import { MagnifyingGlassIcon, ShoppingBagIcon } from '@heroicons/react/24/outline'

const mockOrders = [
  {
    id: 'ORD001',
    date: '2025-03-01',
    items: [
      { name: 'iPhone 15 Pro', quantity: 1, price: 999 },
      { name: 'AirPods Pro', quantity: 1, price: 249 }
    ],
    status: 'Completed',
    total: 1248,
    paymentStatus: 'Paid'
  },
  {
    id: 'ORD002',
    date: '2025-03-03',
    items: [
      { name: 'MacBook Air', quantity: 1, price: 1299 }
    ],
    status: 'Processing',
    total: 1299,
    paymentStatus: 'Pending'
  },
  {
    id: 'ORD003',
    date: '2025-03-05',
    items: [
      { name: 'iPad Pro', quantity: 1, price: 799 },
      { name: 'Apple Pencil', quantity: 1, price: 129 },
      { name: 'Magic Keyboard', quantity: 1, price: 299 }
    ],
    status: 'Confirmed',
    total: 1227,
    paymentStatus: 'Paid'
  }
]

export default function Orders() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredOrders = mockOrders.filter(order => 
    order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold leading-6 text-gray-900">Orders</h1>
          <p className="mt-2 text-sm text-gray-700">
            View and manage your order history
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            className="block rounded-md bg-primary-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
          >
            New Order
          </button>
        </div>
      </div>

      <div className="mt-8">
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <input
            type="text"
            placeholder="Search orders by ID or item name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full rounded-md border-0 py-2 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm"
          />
        </div>
      </div>

      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      Order ID
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Date
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Items
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Status
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Total
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Payment
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {filteredOrders.map((order) => (
                    <tr key={order.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-primary-600 sm:pl-6">
                        {order.id}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {order.date}
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-500">
                        <ul>
                          {order.items.map((item, index) => (
                            <li key={index}>
                              {item.quantity}x {item.name}
                            </li>
                          ))}
                        </ul>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${
                          order.status === 'Completed'
                            ? 'bg-green-50 text-green-700'
                            : order.status === 'Processing'
                            ? 'bg-yellow-50 text-yellow-700'
                            : 'bg-blue-50 text-blue-700'
                        }`}>
                          <ShoppingBagIcon className="mr-1 h-4 w-4" />
                          {order.status}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        ${order.total.toFixed(2)}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${
                          order.paymentStatus === 'Paid'
                            ? 'bg-green-50 text-green-700'
                            : 'bg-yellow-50 text-yellow-700'
                        }`}>
                          {order.paymentStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
