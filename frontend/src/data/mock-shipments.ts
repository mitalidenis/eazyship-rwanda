import { Shipment } from '../models/shipment'

export const mockShipments: Shipment[] = [
  {
    id: '1',
    userId: 'user123',
    date: new Date(),
    status: 'PENDING',
    trackingNumber: 'EZY-ABC123',
    items: JSON.stringify(['Laptop', 'Charger']),
    from: 'Kigali',
    to: 'Butare',
    totalCost: 5000,
    user: {
      id: 'user123',
      name: 'Denis Mitali',
      email: 'mitalidenis5@gmail.com'
    }
  }
]