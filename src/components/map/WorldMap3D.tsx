
import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Shipment } from '@/types/shipment';
import MapErrorBoundary, { MapErrorFallback } from './MapErrorBoundary';
import WorldScene from './WorldScene';

// Main World Map component
const WorldMap3D = ({ shipments = [] }: { shipments?: Shipment[] }) => {
  const [selectedShipment, setSelectedShipment] = useState<string | null>(null);
  const [errorState, setErrorState] = useState<boolean>(false);
  const [isTracking, setIsTracking] = useState<boolean>(false);
  const [tiltAngle, setTiltAngle] = useState<number>(30);

  return (
    <div className="relative w-full h-[600px] rounded-lg overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700">
      {errorState ? (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
          <div className="text-center p-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <h3 className="text-lg font-semibold mb-2">3D Map Unavailable</h3>
            <p className="text-sm text-gray-500">Could not render the 3D world map. Please try again later.</p>
          </div>
        </div>
      ) : (
        <MapErrorBoundary fallback={<MapErrorFallback />}>
          <Canvas 
            camera={{ position: [0, 0, 2.5], fov: 45 }}
            onCreated={(state) => {
              state.gl.setClearColor("#030711", 1);
            }}
          >
            <WorldScene 
              shipments={shipments} 
              selectedShipment={selectedShipment} 
              setSelectedShipment={setSelectedShipment}
              isTracking={isTracking}
            />
          </Canvas>
          
          {/* 3D Tracking Controls */}
          <div className="absolute top-4 right-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-2 rounded-lg shadow-lg z-20 flex gap-2">
            <button
              onClick={() => setIsTracking(prev => !prev)}
              className={`p-2 rounded ${isTracking ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
              title={isTracking ? "Disable 3D tracking" : "Enable 3D tracking"}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </button>
            <button
              onClick={() => setTiltAngle(prev => Math.min(prev + 10, 60))}
              disabled={!isTracking}
              className={`p-2 rounded ${!isTracking ? 'opacity-50 cursor-not-allowed' : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600'}`}
              title="Increase tilt angle"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m18 15-6-6-6 6" />
              </svg>
            </button>
            <button
              onClick={() => setTiltAngle(prev => Math.max(prev - 10, 0))}
              disabled={!isTracking}
              className={`p-2 rounded ${!isTracking ? 'opacity-50 cursor-not-allowed' : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600'}`}
              title="Decrease tilt angle"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
          </div>
        </MapErrorBoundary>
      )}
      
      {/* Overlay with selected shipment details */}
      {selectedShipment && !errorState && (
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
      <div className="absolute bottom-4 right-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-2 rounded-lg shadow z-10 flex gap-3 text-xs">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
          <span>Origin</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span>Destination</span>
        </div>
      </div>
    </div>
  );
};

export default WorldMap3D;
