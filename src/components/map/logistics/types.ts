
export interface ShipmentPoint {
  id: string;
  name: string;
  lat: number;
  lng: number;
  status: 'in-transit' | 'delivered' | 'pending' | 'delayed';
  temperature: number;
  humidity: number;
  batteryLevel: number;
  signalStrength: number;
  lastUpdate: string;
  estimatedArrival: string;
  healthStatus: 'optimal' | 'warning' | 'critical';
}
