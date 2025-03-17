
import { Map, Package } from 'lucide-react';

const ShipmentMap = () => {
  return (
    <div className="mt-10 rounded-xl border border-border overflow-hidden">
      <div className="bg-white dark:bg-logistics-dark p-4 border-b border-border flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Map className="size-5 text-logistics-blue" />
          <h3 className="font-medium">Shipment Map</h3>
        </div>
        <button className="text-sm text-logistics-blue hover:underline">View Fullscreen</button>
      </div>
      
      <div className="aspect-[16/9] bg-logistics-light-gray dark:bg-white/5 flex items-center justify-center">
        <div className="text-center p-8">
          <Package className="size-12 text-logistics-gray mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">Interactive Map</h3>
          <p className="text-logistics-gray max-w-md mb-4">
            Track your shipments in real-time with our interactive map visualization.
          </p>
          <button className="btn-primary">Enable Map View</button>
        </div>
      </div>
    </div>
  );
};

export default ShipmentMap;
