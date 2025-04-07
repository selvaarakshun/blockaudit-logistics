
import { AlertCircle, Box, MapPin, Package, Truck } from 'lucide-react';
import { Shipment } from '@/types/shipment';

interface ShipmentTrackingHistoryProps {
  shipment: Shipment;
}

const ShipmentTrackingHistory = ({ shipment }: ShipmentTrackingHistoryProps) => {
  const getTrackingEvents = () => {
    const events = [
      {
        date: new Date(new Date(shipment.lastUpdated).getTime() - 86400000 * 3),
        location: shipment.origin,
        status: 'Order processed',
        description: 'Order has been processed and is ready for shipment'
      }
    ];
    
    if (['in-transit', 'delivered', 'delayed'].includes(shipment.status)) {
      events.push({
        date: new Date(new Date(shipment.lastUpdated).getTime() - 86400000 * 2),
        location: `${shipment.origin} Distribution Center`,
        status: 'Picked up by carrier',
        description: 'Package has been picked up by the carrier'
      });
      
      events.push({
        date: new Date(new Date(shipment.lastUpdated).getTime() - 86400000),
        location: 'Transit Hub',
        status: 'In transit',
        description: `Package is in transit to ${shipment.destination}`
      });
    }
    
    if (shipment.status === 'delayed') {
      events.push({
        date: new Date(shipment.lastUpdated),
        location: 'Transit Hub',
        status: 'Delayed',
        description: 'Package has been delayed due to weather conditions'
      });
    }
    
    if (shipment.status === 'delivered') {
      events.push({
        date: new Date(shipment.lastUpdated),
        location: shipment.destination,
        status: 'Delivered',
        description: 'Package has been delivered'
      });
    }
    
    return events.sort((a, b) => b.date.getTime() - a.date.getTime());
  };

  return (
    <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
      <h4 className="font-medium text-sm mb-3">Tracking History</h4>
      <div className="space-y-4">
        {getTrackingEvents().map((event, index) => (
          <div key={index} className="relative pl-6 border-l-2 border-gray-200 dark:border-gray-700">
            <div className="absolute -left-[5px] top-0 size-2.5 rounded-full bg-blue-600"></div>
            <div className="mb-1">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {event.date.toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
            </div>
            <div className="flex items-start gap-2">
              {event.status === 'Delivered' && <Package className="h-4 w-4 text-green-600 mt-0.5" />}
              {event.status === 'In transit' && <Truck className="h-4 w-4 text-blue-600 mt-0.5" />}
              {event.status === 'Delayed' && <AlertCircle className="h-4 w-4 text-red-600 mt-0.5" />}
              {event.status === 'Order processed' && <Box className="h-4 w-4 text-gray-600 mt-0.5" />}
              {event.status === 'Picked up by carrier' && <Box className="h-4 w-4 text-gray-600 mt-0.5" />}
              <div>
                <p className="text-sm font-medium">
                  {event.status}
                </p>
                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  <MapPin className="h-3 w-3 mr-1" />
                  {event.location}
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {event.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShipmentTrackingHistory;
