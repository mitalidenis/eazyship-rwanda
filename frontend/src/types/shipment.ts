import { Shipment } from '../models/shipment'

export enum ShipmentStatus {
  PENDING = 'PENDING',
  IN_TRANSIT = 'IN_TRANSIT',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED'
}

export type CreateShipmentDTO = Omit<Shipment, 'id' | 'date' | 'trackingNumber' | 'status'> & { 
  id?: string 
  date?: string
  trackingNumber?: string
  status?: ShipmentStatus
  items?: string // JSON string of items
}