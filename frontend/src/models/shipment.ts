export interface Shipment {
    id: string;
    userId: string;
    date: Date;
    status: string;
    trackingNumber: string;
    items: string;
    from: string;
    to: string;
    totalCost: number;
    user?: {
      id: string;
      name: string;
      email: string;
    };
  }
  
  export function parseShipmentItems(itemsJson: string): string[] {
    try {
      return JSON.parse(itemsJson)
    } catch (error) {
      console.warn('Failed to parse shipment items:', error)
      return []
    }
  }

  export function generateTrackingNumber(): string {
    return `EZY-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`
  }