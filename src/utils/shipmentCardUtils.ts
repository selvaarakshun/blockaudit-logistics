
import { Shipment } from '@/types/shipment';

/**
 * Format date to a human-readable format
 */
export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

/**
 * Get the color classes for the different shipment status types
 */
export const getStatusColors = (status: Shipment['status']) => {
  const statusColors = {
    'pending': 'bg-amber-100 text-amber-800 border-amber-200',
    'in-transit': 'bg-blue-100 text-blue-800 border-blue-200',
    'delivered': 'bg-green-100 text-green-800 border-green-200',
    'delayed': 'bg-red-100 text-red-800 border-red-200'
  };
  
  return statusColors[status];
};

/**
 * Format the status display text
 */
export const formatStatusText = (status: Shipment['status']): string => {
  return status.replace('-', ' ');
};

/**
 * Get the progress percentage based on shipment status
 */
export const getProgressPercentage = (status: Shipment['status']): number => {
  switch (status) {
    case 'pending': return 25;
    case 'in-transit': return 60;
    case 'delivered': return 100;
    case 'delayed': return 60;
    default: return 0;
  }
};

/**
 * Generate tracking environment data for a shipment
 */
export const generateTrackingEnvironmentData = (shipment: Shipment) => {
  const idNum = parseInt(shipment.id) || 1;
  return {
    temperature: (Math.sin(idNum * 0.5) * 3 + 5).toFixed(1),
    humidity: Math.floor(Math.sin(idNum * 0.3) * 10 + 45),
    batteryLevel: Math.floor(Math.sin(idNum * 0.7) * 15 + 75),
    signalStrength: Math.floor(Math.sin(idNum * 0.9) * 10 + 85),
    shocks: shipment.status === 'delayed' ? 3 : 0,
    lastDataUpdate: new Date(new Date(shipment.lastUpdated).getTime() - 30 * 60000).toISOString()
  };
};
