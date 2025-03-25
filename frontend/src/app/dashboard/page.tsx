'use client'

import { useState } from 'react'
import { CurrencyDollarIcon, TruckIcon, ClockIcon } from '@heroicons/react/24/outline'

const countries = [
  'Rwanda',
  'China',
  'USA',
  'Dubai',
  'Kenya',
  'Uganda',
  'Tanzania',
  'South Africa'
]

// Define interfaces for type safety
interface FormData {
  fromCountry: string
  toCountry: string
  length: string
  width: string
  height: string
  weight: string
}

interface User {
  name: string
  email: string
  joinedDate: string
}

interface Order {
  id: string
  date: string
  status: string
  items: string
  from: string
  trackingNumber: string
}

export default function UserDashboard() {
  const [formData, setFormData] = useState<FormData>({
    fromCountry: 'Rwanda',
    toCountry: '',
    length: '',
    width: '',
    height: '',
    weight: ''
  })
  const [shippingCost, setShippingCost] = useState<number | null>(null)

  // Mock user data
  const user: User = {
    name: 'Mitali Denis',
    email: 'mitalidenis5@gmail.com',
    joinedDate: '2025-01-15'
  }

  // Mock order data
  const orders: Order[] = [
    {
      id: 'ORD001',
      date: '2025-03-01',
      status: 'Delivered',
      items: 'iPhone 15 Pro',
      from: 'USA',
      trackingNumber: 'TRK123456789'
    },
    {
      id: 'ORD002',
      date: '2025-03-03',
      status: 'In Transit',
      items: 'MacBook Air',
      from: 'UK',
      trackingNumber: 'TRK987654321'
    }
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const calculateShipping = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.toCountry) {
      alert('Please select a destination country')
      return
    }
    // Mock calculation based on weight and dimensions
    const volume = parseFloat(formData.length) * parseFloat(formData.width) * parseFloat(formData.height) / 5000 // Volumetric weight
    const actualWeight = parseFloat(formData.weight)
    const chargeableWeight = Math.max(volume, actualWeight)
    const baseRate = formData.fromCountry === 'Rwanda' ? 10 : 15
    const cost = chargeableWeight * baseRate
    setShippingCost(cost)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-10">
        <header>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">Dashboard</h1>
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
            {/* User Profile */}
            <div className="bg-white shadow sm:rounded-lg mb-6">
              <div className="px-4 py-5 sm:p-6">
                <h2 className="text-lg font-medium leading-6 text-gray-900">Profile Information</h2>
                <div className="mt-4">
                  <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Name</dt>
                      <dd className="mt-1 text-sm text-gray-900">{user.name}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Email</dt>
                      <dd className="mt-1 text-sm text-gray-900">{user.email}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>

            {/* Shipping Calculator */}
            <div className="bg-white shadow sm:rounded-lg mb-6">
              <div className="px-4 py-5 sm:p-6">
                <h2 className="text-lg font-medium leading-6 text-gray-900">Shipping Calculator</h2>
                <form onSubmit={calculateShipping} className="mt-4 space-y-6">
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="fromCountry" className="block text-sm font-medium text-gray-700 mb-2">
                        From Country
                      </label>
                      <select
                        id="fromCountry"
                        name="fromCountry"
                        value={formData.fromCountry}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleChange(e)}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 text-gray-900"
                      >
                        {countries.map(country => (
                          <option key={country} value={country} className="text-gray-900">
                            {country}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="toCountry" className="block text-sm font-medium text-gray-700 mb-2">
                        To Country
                      </label>
                      <select
                        id="toCountry"
                        name="toCountry"
                        value={formData.toCountry}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleChange(e)}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 text-gray-900"
                        required
                      >
                        <option value="" className="text-gray-400">Select destination</option>
                        {countries.map(country => (
                          <option key={country} value={country} className="text-gray-900">
                            {country}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="length" className="block text-sm font-medium text-gray-700 mb-2">
                        Length (cm)
                      </label>
                      <input
                        type="number"
                        id="length"
                        name="length"
                        value={formData.length}
                        onChange={handleChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 text-gray-900"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="width" className="block text-sm font-medium text-gray-700 mb-2">
                        Width (cm)
                      </label>
                      <input
                        type="number"
                        id="width"
                        name="width"
                        value={formData.width}
                        onChange={handleChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 text-gray-900"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="height" className="block text-sm font-medium text-gray-700 mb-2">
                        Height (cm)
                      </label>
                      <input
                        type="number"
                        id="height"
                        name="height"
                        value={formData.height}
                        onChange={handleChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 text-gray-900"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-2">
                        Weight (kg)
                      </label>
                      <input
                        type="number"
                        id="weight"
                        name="weight"
                        value={formData.weight}
                        onChange={handleChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 text-gray-900"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="w-full bg-primary-600 text-white py-3 px-4 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors inline-flex items-center justify-center"
                    >
                      <CurrencyDollarIcon className="mr-2 h-5 w-5" />
                      Calculate Cost
                    </button>
                  </div>

                  {shippingCost !== null && (
                    <div className="rounded-md bg-blue-50 p-4">
                      <div className="flex">
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-blue-800">
                            Estimated Shipping Cost: ${shippingCost.toFixed(2)}
                          </h3>
                        </div>
                      </div>
                    </div>
                  )}
                </form>
              </div>
            </div>

            {/* Order History */}
            <div className="bg-white shadow sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h2 className="text-lg font-medium leading-6 text-gray-900">Order History</h2>
                <div className="mt-4">
                  <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-300">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">Order ID</th>
                          <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Date</th>
                          <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Items</th>
                          <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">From</th>
                          <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                          <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Tracking</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        {orders.map((order) => (
                          <tr key={order.id}>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">
                              {order.id}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{order.date}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{order.items}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{order.from}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm">
                              <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                              }`}>
                                {order.status === 'Delivered' ? (
                                  <TruckIcon className="mr-1 h-4 w-4" />
                                ) : (
                                  <ClockIcon className="mr-1 h-4 w-4" />
                                )}
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
        </main>
      </div>
    </div>
  )
}