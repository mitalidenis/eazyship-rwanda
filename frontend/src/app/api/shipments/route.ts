import { NextRequest, NextResponse } from 'next/server'
import { shipmentService } from '@/services/shipment-service'
import { CreateShipmentDTO, ShipmentStatus } from '@/types/shipment'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/../../lib/auth'

// Get all shipments
export async function GET() {
  try {
    // Get the current session
    const session = await getServerSession(authOptions)
    
    // Log session details for debugging
    console.log('Session details:', JSON.stringify(session, null, 2))
    
    // Check if user is authenticated and is an admin
    if (!session) {
      console.error('No session found')
      return NextResponse.json(
        { error: 'No session found' }, 
        { status: 401 }
      )
    }

    if (!session.user) {
      console.error('No user in session')
      return NextResponse.json(
        { error: 'No user in session' }, 
        { status: 401 }
      )
    }

    const userRole = (session.user as any).role
    console.log('User role:', userRole)

    if (userRole !== 'admin') {
      console.error('User is not an admin', userRole)
      return NextResponse.json(
        { error: 'Unauthorized access' }, 
        { status: 403 }
      )
    }

    // Fetch all shipments
    const shipments = await shipmentService.getAllShipments()
    console.log('Fetched shipments:', shipments.length)
    return NextResponse.json(shipments, { status: 200 })
  } catch (error) {
    console.error('Error fetching shipments:', error)
    return NextResponse.json(
      { error: 'Failed to fetch shipments', details: error instanceof Error ? error.message : 'Unknown error' }, 
      { status: 500 }
    )
  }
}