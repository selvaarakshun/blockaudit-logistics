
import { useState, useEffect } from 'react';
import { Map, Truck, Info, Package, Navigation } from 'lucide-react';

type ShipmentPoint = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  status: 'in-transit' | 'delivered' | 'pending';
};

const InteractiveMap = () => {
  const [activePoint, setActivePoint] = useState<string | null>(null);
  const [shipmentPoints, setShipmentPoints] = useState<ShipmentPoint[]>([]);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  useEffect(() => {
    // Simulate fetching shipment data
    const mockShipmentPoints: ShipmentPoint[] = [
      { id: '1', name: 'New York Distribution Center', lat: 40.7128, lng: -74.0060, status: 'in-transit' },
      { id: '2', name: 'Chicago Warehouse', lat: 41.8781, lng: -87.6298, status: 'delivered' },
      { id: '3', name: 'Los Angeles Port', lat: 34.0522, lng: -118.2437, status: 'pending' },
      { id: '4', name: 'Miami Shipping Hub', lat: 25.7617, lng: -80.1918, status: 'in-transit' },
      { id: '5', name: 'Seattle Distribution Center', lat: 47.6062, lng: -122.3321, status: 'delivered' }
    ];

    setShipmentPoints(mockShipmentPoints);
    
    // Simulate map loading
    const timer = setTimeout(() => {
      setIsMapLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleMapInteraction = () => {
    setIsMapLoaded(true);
  };

  const handlePointClick = (id: string) => {
    setActivePoint(id === activePoint ? null : id);
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'delivered': return 'bg-green-500';
      case 'in-transit': return 'bg-blue-500';
      case 'pending': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="aspect-[16/9] bg-white dark:bg-logistics-dark relative overflow-hidden rounded-xl border border-border">
      {!isMapLoaded ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center">
          <Map className="size-16 text-logistics-gray mb-2" />
          <h3 className="text-xl font-medium">Interactive Shipment Map</h3>
          <p className="text-logistics-gray max-w-md mb-4">
            View and track your shipments in real-time with our blockchain-secured map.
          </p>
          <button 
            className="btn-primary"
            onClick={handleMapInteraction}
          >
            Load Interactive Map
          </button>
        </div>
      ) : (
        <>
          {/* Map background */}
          <div className="absolute inset-0 bg-logistics-light-gray dark:bg-white/5">
            {/* Simplified map grid for visualization */}
            <div className="grid grid-cols-12 grid-rows-6 h-full w-full">
              {[...Array(72)].map((_, i) => (
                <div 
                  key={i} 
                  className="border border-logistics-blue/5 flex items-center justify-center"
                />
              ))}
            </div>
            
            {/* Connection lines between points */}
            <svg className="absolute inset-0 w-full h-full">
              <line x1="20%" y1="30%" x2="40%" y2="40%" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="2" strokeDasharray="5,5" />
              <line x1="40%" y1="40%" x2="80%" y2="35%" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="2" strokeDasharray="5,5" />
              <line x1="80%" y1="35%" x2="30%" y2="70%" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="2" strokeDasharray="5,5" />
              <line x1="30%" y1="70%" x2="20%" y2="30%" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="2" strokeDasharray="5,5" />
            </svg>
            
            {/* Shipment points */}
            <div className="absolute top-[30%] left-[20%]">
              <div 
                className={`size-5 rounded-full ${getStatusColor('in-transit')} cursor-pointer animate-pulse relative shadow-lg`}
                onClick={() => handlePointClick('1')}
              >
                {activePoint === '1' && (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-white dark:bg-logistics-dark shadow-lg rounded-lg p-3 w-48 z-10">
                    <h4 className="font-medium text-sm mb-1">New York Distribution Center</h4>
                    <div className="flex items-center gap-1 text-xs text-logistics-gray mb-1">
                      <Truck className="size-3" />
                      <span>In Transit</span>
                    </div>
                    <div className="text-xs">Last updated: 2 hours ago</div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="absolute top-[40%] left-[40%]">
              <div 
                className={`size-5 rounded-full ${getStatusColor('delivered')} cursor-pointer relative shadow-lg`}
                onClick={() => handlePointClick('2')}
              >
                {activePoint === '2' && (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-white dark:bg-logistics-dark shadow-lg rounded-lg p-3 w-48 z-10">
                    <h4 className="font-medium text-sm mb-1">Chicago Warehouse</h4>
                    <div className="flex items-center gap-1 text-xs text-green-500 mb-1">
                      <Package className="size-3" />
                      <span>Delivered</span>
                    </div>
                    <div className="text-xs">Last updated: 1 day ago</div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="absolute top-[35%] left-[80%]">
              <div 
                className={`size-5 rounded-full ${getStatusColor('pending')} cursor-pointer relative shadow-lg`}
                onClick={() => handlePointClick('3')}
              >
                {activePoint === '3' && (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-white dark:bg-logistics-dark shadow-lg rounded-lg p-3 w-48 z-10">
                    <h4 className="font-medium text-sm mb-1">Los Angeles Port</h4>
                    <div className="flex items-center gap-1 text-xs text-yellow-500 mb-1">
                      <Info className="size-3" />
                      <span>Pending</span>
                    </div>
                    <div className="text-xs">Last updated: 5 hours ago</div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="absolute top-[70%] left-[30%]">
              <div 
                className={`size-5 rounded-full ${getStatusColor('in-transit')} cursor-pointer animate-pulse relative shadow-lg`}
                onClick={() => handlePointClick('4')}
              >
                {activePoint === '4' && (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-white dark:bg-logistics-dark shadow-lg rounded-lg p-3 w-48 z-10">
                    <h4 className="font-medium text-sm mb-1">Miami Shipping Hub</h4>
                    <div className="flex items-center gap-1 text-xs text-logistics-blue mb-1">
                      <Navigation className="size-3" />
                      <span>In Transit</span>
                    </div>
                    <div className="text-xs">Last updated: 30 minutes ago</div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Map controls overlay */}
          <div className="absolute bottom-4 right-4 flex flex-col gap-2">
            <button className="size-10 bg-white dark:bg-logistics-dark rounded-full flex items-center justify-center shadow-md border border-border text-logistics-blue">
              <span className="text-lg font-bold">+</span>
            </button>
            <button className="size-10 bg-white dark:bg-logistics-dark rounded-full flex items-center justify-center shadow-md border border-border text-logistics-blue">
              <span className="text-lg font-bold">−</span>
            </button>
          </div>
          
          {/* Legend */}
          <div className="absolute bottom-4 left-4 bg-white dark:bg-logistics-dark p-3 rounded-md shadow-md border border-border">
            <h4 className="text-sm font-medium mb-2">Shipment Status</h4>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="size-3 rounded-full bg-blue-500"></div>
                <span className="text-xs">In Transit</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="size-3 rounded-full bg-green-500"></div>
                <span className="text-xs">Delivered</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="size-3 rounded-full bg-yellow-500"></div>
                <span className="text-xs">Pending</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default InteractiveMap;
