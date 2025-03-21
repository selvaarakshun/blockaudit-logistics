
import { MapPin } from 'lucide-react';
import { Shipment } from '@/pages/Dashboard';

interface ShipmentMapProps {
  shipments?: Shipment[];
}

const ShipmentMap = ({ shipments = [] }: ShipmentMapProps) => {
  return (
    <div className="bg-white dark:bg-gray-800/50 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden mt-10">
      <div className="p-4 border-b border-gray-100 dark:border-gray-700">
        <h2 className="font-semibold">Shipment Map View</h2>
      </div>
      
      <div className="aspect-[16/9] bg-gray-100 dark:bg-gray-900 relative overflow-hidden">
        {/* Simplified Map Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20">
          <div className="grid grid-cols-8 grid-rows-6 h-full w-full opacity-20 dark:opacity-10">
            {Array.from({ length: 48 }).map((_, i) => (
              <div key={i} className="border border-gray-300 dark:border-gray-700"></div>
            ))}
          </div>
        </div>
        
        {/* Map Locations */}
        {shipments.map((shipment, index) => {
          // Simplified position calculation - in a real app would use geo coordinates
          const left = 10 + (index * 15) % 80;
          const top = 20 + (index * 10) % 60;
          
          return (
            <div 
              key={shipment.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
              style={{ left: `${left}%`, top: `${top}%` }}
            >
              <div className="flex flex-col items-center">
                <MapPin className={`h-6 w-6 ${
                  shipment.status === 'delivered' ? 'text-green-500' :
                  shipment.status === 'in-transit' ? 'text-blue-500' :
                  shipment.status === 'delayed' ? 'text-red-500' : 'text-amber-500'
                }`} />
                <div className="bg-white dark:bg-gray-800 rounded-md shadow-md p-2 mt-1 text-xs whitespace-nowrap">
                  <span className="font-medium">{shipment.shipmentName || shipment.trackingNumber}</span>
                </div>
              </div>
            </div>
          );
        })}
        
        {shipments.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400">
            <div className="text-center">
              <MapPin className="h-10 w-10 mx-auto mb-2 opacity-30" />
              <p>No shipments to display on map</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShipmentMap;
