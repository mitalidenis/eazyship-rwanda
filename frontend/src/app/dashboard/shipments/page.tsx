'use client'

import { useState } from 'react'
import { TruckIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'

const mockShipments = [
  {
    id: 'SHP001',
    trackingNumber: 'TRK123456789',
    status: 'In Transit',
    origin: 'China',
    destination: 'Rwanda',
    estimatedDelivery: '2025-03-10',
    weight: '5.2 kg',
    type: 'Express'
  },
  {
    id: 'SHP002',
    trackingNumber: 'TRK987654321',
    status: 'Delivered',
    origin: 'USA',
    destination: 'Rwanda',
    estimatedDelivery: '2025-03-03',
    weight: '2.8 kg',
    type: 'Standard'
  },
  {
    id: 'SHP003',
    trackingNumber: 'TRK456789123',
    status: 'Processing',
    origin: 'Dubai',
    destination: 'Rwanda',
    estimatedDelivery: '2025-03-15',
    weight: '8.1 kg',
    type: 'Express'
  }
]

export default function Shipments() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredShipments = mockShipments.filter(shipment => 
    shipment.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    shipment.status.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold leading-6 text-gray-900">Shipments</h1>
          <p className="mt-2 text-sm text-gray-700">
            Track and manage all your shipments in one place
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            className="block rounded-md bg-primary-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
          >
            Create Shipment
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
            placeholder="Search by tracking number or status..."
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
                      Tracking Number
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Status
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Origin
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Destination
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Est. Delivery
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Weight
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Type
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {filteredShipments.map((shipment) => (
                    <tr key={shipment.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-primary-600 sm:pl-6">
                        {shipment.trackingNumber}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${
                          shipment.status === 'Delivered'
                            ? 'bg-green-50 text-green-700'
                            : shipment.status === 'In Transit'
                            ? 'bg-blue-50 text-blue-700'
                            : 'bg-yellow-50 text-yellow-700'
                        }`}>
                          <TruckIcon className="mr-1 h-4 w-4" />
                          {shipment.status}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{shipment.origin}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{shipment.destination}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{shipment.estimatedDelivery}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{shipment.weight}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${
                          shipment.type === 'Express'
                            ? 'bg-purple-50 text-purple-700'
                            : 'bg-gray-50 text-gray-700'
                        }`}>
                          {shipment.type}
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
