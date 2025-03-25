'use client'

import { useState, useEffect } from 'react'
import { 
  EyeIcon, 
  PencilIcon, 
  TrashIcon 
} from '@heroicons/react/24/outline'
import { Shipment } from '@/models/shipment'
import { ShipmentStatus } from '@/types/shipment'
import { shipmentApi } from '@/services/api/shipment-api'

export default function ShipmentsPage() {
  const [shipments, setShipments] = useState<Shipment[]>([])
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchShipments() {
      try {
        setIsLoading(true)
        const fetchedShipments = await shipmentApi.getAllShipments()
        setShipments(fetchedShipments)
        setError(null)
      } catch (err) {
        setError('Failed to load shipments')
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchShipments()
  }, [])

  const handleViewDetails = (shipment: Shipment) => {
    setSelectedShipment(shipment)
    setIsModalOpen(true)
  }

  const handleUpdateStatus = async (id: string, newStatus: ShipmentStatus) => {
    try {
      const updatedShipment = await shipmentApi.updateShipmentStatus(id, newStatus)
      
      // Update local state
      setShipments(prevShipments => 
        prevShipments.map(shipment => 
          shipment.id === updatedShipment.id ? updatedShipment : shipment
        )
      )
      
      // Update selected shipment if it's the same one
      if (selectedShipment?.id === id) {
        setSelectedShipment(updatedShipment)
      }
    } catch (error) {
      console.error('Failed to update shipment status', error)
      setError('Failed to update shipment status')
    }
  }

  const StatusBadge = ({ status }: { status: ShipmentStatus }) => {
    const statusColors: Record<ShipmentStatus, string> = {
      PENDING: 'bg-yellow-100 text-yellow-800',
      IN_TRANSIT: 'bg-blue-100 text-blue-800',
      DELIVERED: 'bg-green-100 text-green-800',
      CANCELLED: 'bg-red-100 text-red-800'
    }

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[status]}`}>
        {status.replace('_', ' ')}
      </span>
    )
  }

  const ShipmentDetailsModal = () => {
    if (!selectedShipment) return null

    // Parse items if it's a string
    const items = Array.isArray(selectedShipment.items) 
      ? selectedShipment.items 
      : JSON.parse(selectedShipment.items || '[]')

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold mb-4">Shipment Details</h2>
          <div className="space-y-2">
            <p><strong>Tracking Number:</strong> {selectedShipment.trackingNumber}</p>
            <p><strong>From:</strong> {selectedShipment.from}</p>
            <p><strong>To:</strong> {selectedShipment.to}</p>
            <p><strong>Items:</strong> {items.join(', ')}</p>
            <p><strong>Total Cost:</strong> RWF {selectedShipment.totalCost.toLocaleString()}</p>
            <p><strong>Status:</strong> <StatusBadge status={selectedShipment.status as ShipmentStatus} /></p>
            <p><strong>User:</strong> {selectedShipment.user?.name || 'Unknown'}</p>
            <p><strong>Date:</strong> {new Date(selectedShipment.date).toLocaleString()}</p>
          </div>
          <div className="mt-6 flex justify-end space-x-4">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        {error}
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Shipments</h1>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Tracking Number</th>
              <th className="p-4 text-left">Customer</th>
              <th className="p-4 text-left">From</th>
              <th className="p-4 text-left">To</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Total Cost</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {shipments.map((shipment) => (
              <tr key={shipment.id} className="border-b hover:bg-gray-50">
                <td className="p-4">{shipment.trackingNumber}</td>
                <td className="p-4">{shipment.user?.name || 'Unknown'}</td>
                <td className="p-4">{shipment.from}</td>
                <td className="p-4">{shipment.to}</td>
                <td className="p-4">
                  <StatusBadge status={shipment.status as ShipmentStatus} />
                </td>
                <td className="p-4">RWF {shipment.totalCost.toLocaleString()}</td>
                <td className="p-4 flex justify-center space-x-2">
                  <button 
                    onClick={() => handleViewDetails(shipment)}
                    className="text-blue-600 hover:text-blue-800"
                    title="View Details"
                  >
                    <EyeIcon className="h-5 w-5" />
                  </button>
                  <select 
                    value={shipment.status}
                    onChange={(e) => handleUpdateStatus(shipment.id, e.target.value as ShipmentStatus)}
                    className="text-sm border rounded px-2 py-1"
                  >
                    <option value="PENDING">Pending</option>
                    <option value="IN_TRANSIT">In Transit</option>
                    <option value="DELIVERED">Delivered</option>
                    <option value="CANCELLED">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && <ShipmentDetailsModal />}
    </div>
  )
}