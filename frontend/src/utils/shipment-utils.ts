import { CreateShipmentDTO, ShipmentStatus } from '@/types/shipment'
import { generateTrackingNumber } from '@/models/shipment'

export function createShipmentPayload(
  userId: string, 
  shipmentDetails: Partial<Omit<CreateShipmentDTO, 'userId' | 'status' | 'trackingNumber'>> & {
    status?: ShipmentStatus;
    trackingNumber?: string;
    items?: string[];
  }
): CreateShipmentDTO {
  // Ensure items is always a string array, then convert to JSON string
  const items = Array.isArray(shipmentDetails.items) 
    ? shipmentDetails.items.filter(item => typeof item === 'string')
    : [];

  return {
    userId,
    from: shipmentDetails.from || '',
    to: shipmentDetails.to || '',
    items: JSON.stringify(items),
    totalCost: shipmentDetails.totalCost || 0,
    status: shipmentDetails.status || ShipmentStatus.PENDING,
    trackingNumber: shipmentDetails.trackingNumber || generateTrackingNumber(),
    ...shipmentDetails
  }
}

export function validateShipmentPayload(payload: CreateShipmentDTO): boolean {
  return !!(
    payload.userId && 
    payload.from && 
    payload.to && 
    payload.items && 
    payload.totalCost !== undefined
  )
}