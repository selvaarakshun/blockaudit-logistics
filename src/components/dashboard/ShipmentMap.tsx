
import { Map, Package } from 'lucide-react';
import InteractiveMap from '../map/InteractiveMap';
import { useState } from 'react';

const ShipmentMap = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  return (
    <div className={`mt-10 rounded-xl border border-border overflow-hidden ${isFullscreen ? 'fixed inset-0 z-50 bg-white dark:bg-logistics-dark' : ''}`}>
      <div className="bg-white dark:bg-logistics-dark p-4 border-b border-border flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Map className="size-5 text-logistics-blue" />
          <h3 className="font-medium">Shipment Map</h3>
        </div>
        <button 
          className="text-sm text-logistics-blue hover:underline"
          onClick={() => setIsFullscreen(!isFullscreen)}
        >
          {isFullscreen ? 'Exit Fullscreen' : 'View Fullscreen'}
        </button>
      </div>
      
      <div className={isFullscreen ? 'h-full p-4' : ''}>
        <InteractiveMap />
      </div>
    </div>
  );
};

export default ShipmentMap;
