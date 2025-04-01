
import React, { useState, useEffect } from 'react';
import { PerspectiveCamera } from '@react-three/drei';
import { Vector3 } from 'three';
import { Shipment } from '@/pages/Dashboard';
import Earth from './Earth';
import ShipmentMarker from './ShipmentMarker';
import FlightPath from './FlightPath';
import CameraController from './CameraController';
import { latLongToVector3, getShipmentColor, getShipmentProgress, createShipmentCurve } from './mapUtils';

// Shipment coordinates data
const shipmentCoordinates = [
  { id: '1', origin: { lat: 40.7128, long: -74.0060 }, destination: { lat: 34.0522, long: -118.2437 } }, // NY to LA
  { id: '2', origin: { lat: 37.7749, long: -122.4194 }, destination: { lat: 47.6062, long: -122.3321 } }, // SF to Seattle
  { id: '3', origin: { lat: 41.8781, long: -87.6298 }, destination: { lat: 25.7617, long: -80.1918 } }, // Chicago to Miami
  { id: '4', origin: { lat: 42.3601, long: -71.0589 }, destination: { lat: 30.2672, long: -97.7431 } }, // Boston to Austin
];

// Scene wrapper component to handle errors gracefully
const WorldScene = ({ 
  shipments, 
  selectedShipment, 
  setSelectedShipment,
  isTracking
}: { 
  shipments: Shipment[]; 
  selectedShipment: string | null; 
  setSelectedShipment: (id: string | null) => void;
  isTracking: boolean;
}) => {
  // Camera tracking position and target
  const [trackingCameraPos, setTrackingCameraPos] = useState<[number, number, number]>([0, 0, 2.5]);
  const [trackingTarget, setTrackingTarget] = useState<[number, number, number]>([0, 0, 0]);
  
  // Update camera position when tracking a shipment
  useEffect(() => {
    if (selectedShipment && isTracking) {
      const selectedCoord = shipmentCoordinates.find(coord => coord.id === selectedShipment);
      if (selectedCoord) {
        const shipment = shipments.find(s => s.id === selectedShipment);
        const progress = shipment ? getShipmentProgress(shipment.status) : 0.5;
        
        const origin = latLongToVector3(selectedCoord.origin.lat, selectedCoord.origin.long, 1);
        const destination = latLongToVector3(selectedCoord.destination.lat, selectedCoord.destination.long, 1);
        
        // Create a curve
        const curve = createShipmentCurve(origin, destination);
        
        // Get current position along curve based on progress
        const currentPos = curve.getPointAt(progress);
        
        // Calculate optimal camera position to view the tracked point
        // Position camera at a slight offset from the tracked point
        const trackingPos: [number, number, number] = [
          currentPos.x * 1.5,
          currentPos.y * 1.5, 
          currentPos.z * 1.5
        ];
        
        setTrackingCameraPos(trackingPos);
        setTrackingTarget([currentPos.x, currentPos.y, currentPos.z]);
      }
    }
  }, [selectedShipment, isTracking, shipments]);

  return (
    <>
      {/* Camera with tracking support */}
      <PerspectiveCamera makeDefault position={[0, 0, 2.5]} fov={45} />
      <CameraController 
        trackingId={selectedShipment} 
        position={trackingCameraPos} 
        lookAt={trackingTarget}
        enableTracking={isTracking}
      />
      
      {/* Earth globe */}
      <Earth />
      
      {/* Shipment markers */}
      {shipments.map((shipment, index) => {
        const coords = shipmentCoordinates[index % shipmentCoordinates.length];
        if (!coords) return null;
        
        const originPos = latLongToVector3(coords.origin.lat, coords.origin.long, 1);
        const destPos = latLongToVector3(coords.destination.lat, coords.destination.long, 1);
        const color = getShipmentColor(shipment.status);
        const progress = getShipmentProgress(shipment.status);
        
        return (
          <group key={shipment.id}>
            {/* Origin marker */}
            <ShipmentMarker 
              position={originPos} 
              color="#3b82f6" 
              selected={selectedShipment === shipment.id}
              onClick={() => setSelectedShipment(shipment.id)} 
            />
            
            {/* Destination marker */}
            <ShipmentMarker 
              position={destPos} 
              color="#10b981" 
              selected={selectedShipment === shipment.id}
              onClick={() => setSelectedShipment(shipment.id)} 
            />
            
            {/* Flight path */}
            <FlightPath 
              start={originPos} 
              end={destPos} 
              progress={progress}
              color={color}
            />
          </group>
        );
      })}
      
      {/* Lighting */}
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1.5} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ffffff" />
    </>
  );
};

export default WorldScene;
