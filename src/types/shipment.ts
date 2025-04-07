
export interface Shipment {
  id: string;
  trackingNumber: string;
  status: 'pending' | 'in-transit' | 'delivered' | 'delayed';
  origin: string;
  destination: string;
  estimatedDelivery: string;
  lastUpdated: string;
  items: number;
  shipmentName?: string;
  userId?: string;
}
