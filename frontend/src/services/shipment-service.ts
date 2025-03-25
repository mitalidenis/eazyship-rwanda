import { Shipment } from '@/models/shipment'
import { CreateShipmentDTO, ShipmentStatus } from '@/types/shipment'
import prisma from '@/lib/prisma'
import { nanoid } from 'nanoid'

// Mock data for fallback
const MOCK_SHIPMENTS: Shipment[] = [
  {
    id: 'mock1',
    trackingNumber: 'EZY-001',
    userId: 'user1',
    user: { 
      id: 'user1', 
      name: 'Denis Mitali', 
      email: 'denis@eazyship.rw'
    },
    from: 'Kigali, Rwanda',
    to: 'Nairobi, Kenya',
    status: 'PENDING',
    date: new Date(),
    totalCost: 5000,
    items: JSON.stringify(['Electronics'])
  },
  {
    id: 'mock2',
    trackingNumber: 'EZY-002',
    userId: 'user2',
    user: { 
      id: 'user2', 
      name: 'Jane Doe', 
      email: 'jane@example.com'
    },
    from: 'Butare, Rwanda',
    to: 'Kampala, Uganda',
    status: 'IN_TRANSIT',
    date: new Date(),
    totalCost: 7500,
    items: JSON.stringify(['Clothing'])
  }
]

class ShipmentService {
  async getAllShipments(): Promise<Shipment[]> {
    try {
      // Attempt to fetch from database
      const shipments = await prisma.shipment.findMany({
        include: { 
          user: {
            select: {
              id: true,
              name: true,
              email: true
            }
          } 
        },
        orderBy: { date: 'desc' }
      })
      
      // Convert shipments to match the Shipment type
      return shipments.map(shipment => ({
        ...shipment,
        items: shipment.items || '[]'
      }))
    } catch (error) {
      // Fallback to mock data if database connection fails
      console.warn('Database fetch failed, using mock shipments', error)
      return MOCK_SHIPMENTS
    }
  }

  // Generate a unique tracking number
  private generateTrackingNumber(): string {
    return `EZY-${nanoid(8).toUpperCase()}`
  }

  async createShipment(shipmentData: CreateShipmentDTO): Promise<Shipment> {
    // Validate shipment data with more detailed checks
    console.log('Creating shipment with data:', JSON.stringify(shipmentData, null, 2))

    if (!shipmentData.userId) {
      console.error('Shipment creation failed: Missing user ID')
      throw new Error('User ID is required')
    }
    if (!shipmentData.from || !shipmentData.to) {
      console.error('Shipment creation failed: Missing origin or destination')
      throw new Error('Origin and destination are required')
    }
    if (!shipmentData.items || shipmentData.items.length === 0) {
      console.error('Shipment creation failed: No items')
      throw new Error('At least one item is required')
    }

    // Validate total cost
    const totalCost = shipmentData.totalCost || 0
    if (totalCost < 0) {
      console.error('Shipment creation failed: Invalid total cost')
      throw new Error('Total cost cannot be negative')
    }

    // Set default values
    const shipmentToCreate = {
      trackingNumber: this.generateTrackingNumber(),
      status: 'PENDING' as ShipmentStatus,
      date: new Date(),
      items: JSON.stringify(shipmentData.items || []),
      totalCost: totalCost,
      userId: shipmentData.userId,
      from: shipmentData.from,
      to: shipmentData.to
    }

    try {
      console.log('Attempting to create shipment in database:', JSON.stringify(shipmentToCreate, null, 2))
      
      // Verify user exists before creating shipment
      const user = await prisma.user.findUnique({
        where: { id: shipmentData.userId }
      })

      if (!user) {
        console.error('Shipment creation failed: User not found')
        throw new Error('User not found')
      }
      
      const newShipment = await prisma.shipment.create({
        data: shipmentToCreate,
        include: { 
          user: {
            select: {
              id: true,
              name: true,
              email: true
            }
          } 
        }
      })
      
      console.log('Shipment created successfully:', JSON.stringify(newShipment, null, 2))
      return {
        ...newShipment,
        items: newShipment.items || '[]'
      }
    } catch (error) {
      console.error('Failed to create shipment:', error)
      throw new Error('Could not create shipment')
    }
  }

  async updateShipmentStatus(id: string, status: ShipmentStatus): Promise<Shipment> {
    try {
      return await prisma.shipment.update({
        where: { id },
        data: { status }
      })
    } catch (error) {
      console.warn('Shipment status update failed', error)
      // Find and update mock shipment
      const shipment = MOCK_SHIPMENTS.find(s => s.id === id)
      if (shipment) {
        shipment.status = status
        return shipment
      }
      throw error
    }
  }
}

export const shipmentService = new ShipmentService()