
import React from 'react';
import { DoubleSide } from 'three';

// Marker component for shipment locations
const ShipmentMarker = ({ 
  position, 
  color, 
  selected, 
  onClick 
}: { 
  position: [number, number, number]; 
  color: string; 
  selected: boolean; 
  onClick: () => void;
}) => {
  // Scale animation for selected marker
  const scale = selected ? 1.5 : 1;
  
  return (
    <group position={position} onClick={onClick}>
      <mesh scale={[scale, scale, scale]}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
      </mesh>
      {selected && (
        <mesh position={[0, 0, 0]} renderOrder={1}>
          <ringGeometry args={[0.06, 0.08, 32]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.8} side={DoubleSide} />
        </mesh>
      )}
    </group>
  );
};

export default ShipmentMarker;
