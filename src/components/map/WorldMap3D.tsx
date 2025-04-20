import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Shipment } from '@/types/shipment';
import MapErrorBoundary, { MapErrorFallback } from './MapErrorBoundary';
import WorldScene from './WorldScene';

const WorldMap3D = ({ shipments = [] }: { shipments?: Shipment[] }) => {
  const [selectedShipment, setSelectedShipment] = useState<string | null>(null);
  const [isTracking, setIsTracking] = useState<boolean>(false);

  return (
    <div className="relative w-full h-[600px] rounded-lg overflow-hidden border border-border bg-gray-950">
      <MapErrorBoundary fallback={<MapErrorFallback />}>
        <Canvas
          camera={{ position: [0, 0, 2.5], fov: 45 }}
          gl={{ 
            antialias: true,
            alpha: true,
            powerPreference: "high-performance"
          }}
          dpr={[1, 2]}
          shadows
        >
          <Suspense fallback={null}>
            <WorldScene 
              shipments={shipments}
              selectedShipment={selectedShipment}
              setSelectedShipment={setSelectedShipment}
              isTracking={isTracking}
            />
          </Suspense>
        </Canvas>

        {/* Controls overlay */}
        <div className="absolute top-4 right-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-2 rounded-lg shadow-lg z-20">
          <button
            onClick={() => setIsTracking(prev => !prev)}
            className={`p-2 rounded ${isTracking ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
            title={isTracking ? "Disable tracking" : "Enable tracking"}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </button>
        </div>

        {/* Selected shipment overlay */}
        {selectedShipment && (
          <div className="absolute bottom-4 left-4 right-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-3 rounded-lg shadow-lg z-10">
          {shipments.filter(s => s.id === selectedShipment).map(shipment => (
            <div key={shipment.id} className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">{shipment.trackingNumber}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {shipment.origin} to {shipment.destination}
                </p>
              </div>
              <div className="flex flex-col items-end">
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                  shipment.status === 'delivered' ? 'bg-green-100 text-green-800' :
                  shipment.status === 'in-transit' ? 'bg-blue-100 text-blue-800' :
                  shipment.status === 'pending' ? 'bg-amber-100 text-amber-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {shipment.status.replace('-', ' ')}
                </span>
                <span className="text-xs text-gray-500 mt-1">
                  ETA: {new Date(shipment.estimatedDelivery).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
          <button 
            onClick={() => setSelectedShipment(null)}
            className="absolute top-1 right-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            ×
          </button>
        </div>
        )}

        {/* Legend */}
        <div className="absolute bottom-4 right-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-2 rounded-lg shadow-lg z-10 flex gap-3 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span>Origin</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span>Destination</span>
          </div>
        </div>
      </MapErrorBoundary>
    </div>
  );
};

export default WorldMap3D;
