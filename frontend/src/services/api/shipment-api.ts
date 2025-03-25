import { Shipment } from '@/models/shipment'
import { CreateShipmentDTO, ShipmentStatus } from '@/types/shipment'

export const shipmentApi = {
  // Fetch all shipments
  async getAllShipments(): Promise<Shipment[]> {
    try {
      const response = await fetch('/api/shipments', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error('Failed to fetch shipments')
      }

      return await response.json()
    } catch (error) {
      console.error('Error fetching shipments:', error)
      throw error
    }
  },

  // Create a new shipment
  async createShipment(shipmentData: CreateShipmentDTO): Promise<Shipment> {
    try {
      const response = await fetch('/api/shipments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(shipmentData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to create shipment')
      }

      return await response.json()
    } catch (error) {
      console.error('Error creating shipment:', error)
      throw error
    }
  },

  // Update shipment status
  async updateShipmentStatus(id: string, status: ShipmentStatus): Promise<Shipment> {
    try {
      const response = await fetch('/api/shipments', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, status }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to update shipment status')
      }

      return await response.json()
    } catch (error) {
      console.error('Error updating shipment status:', error)
      throw error
    }
  },
}