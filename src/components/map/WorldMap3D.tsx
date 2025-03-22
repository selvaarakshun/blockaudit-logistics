
import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useTexture, Sphere } from '@react-three/drei';
import { DoubleSide, Vector3 } from 'three';
import { Shipment } from '@/pages/Dashboard';

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

// Animated flight path
const FlightPath = ({ 
  start, 
  end, 
  progress = 0.5, 
  color 
}: { 
  start: [number, number, number]; 
  end: [number, number, number]; 
  progress: number;
  color: string;
}) => {
  const curve = useRef<any>(null);
  const lineRef = useRef<any>(null);
  
  // Animate ship along the path
  useFrame(() => {
    if (curve.current && lineRef.current) {
      // Update line material dash offset for animation
      lineRef.current.material.dashOffset -= 0.01;
    }
  });
  
  const midPoint = [
    (start[0] + end[0]) / 2,
    (start[1] + end[1]) / 2,
    (start[2] + end[2]) / 2 + 0.5 // Add height to curve
  ];
  
  return (
    <group>
      {/* Dotted line path */}
      <mesh ref={lineRef}>
        <tubeGeometry args={[
          new CustomCurvedLine(start, midPoint as [number, number, number], end),
          64,  // tubular segments
          0.005, // radius
          8,   // radial segments
          false // closed
        ]} />
        <meshBasicMaterial 
          color={color} 
          transparent 
          opacity={0.6} 
          dashSize={0.1}
          gapSize={0.1}
          dashOffset={0}
          onUpdate={(self) => {
            self.dashSize = 0.1;
            self.gapSize = 0.1;
          }}
        />
      </mesh>
      
      {/* Animated ship/package */}
      <mesh position={calculatePositionOnCurve(start, midPoint as [number, number, number], end, progress)}>
        <octahedronGeometry args={[0.03, 0]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} />
      </mesh>
    </group>
  );
};

// Helper class for curved flight paths
class CustomCurvedLine {
  private points: Vector3[];
  
  constructor(start: [number, number, number], mid: [number, number, number], end: [number, number, number]) {
    this.points = [
      new Vector3(...start),
      new Vector3(...mid),
      new Vector3(...end)
    ];
  }
  
  getPoint(t: number) {
    const p0 = this.points[0];
    const p1 = this.points[1];
    const p2 = this.points[2];
    
    // Quadratic Bezier curve formula
    const x = (1 - t) * (1 - t) * p0.x + 2 * (1 - t) * t * p1.x + t * t * p2.x;
    const y = (1 - t) * (1 - t) * p0.y + 2 * (1 - t) * t * p1.y + t * t * p2.y;
    const z = (1 - t) * (1 - t) * p0.z + 2 * (1 - t) * t * p1.z + t * t * p2.z;
    
    return new Vector3(x, y, z);
  }
}

// Calculate position on a curved line for a given progress (0-1)
const calculatePositionOnCurve = (
  start: [number, number, number], 
  mid: [number, number, number], 
  end: [number, number, number], 
  progress: number
): [number, number, number] => {
  // Quadratic Bezier curve formula
  const t = progress;
  const x = (1 - t) * (1 - t) * start[0] + 2 * (1 - t) * t * mid[0] + t * t * end[0];
  const y = (1 - t) * (1 - t) * start[1] + 2 * (1 - t) * t * mid[1] + t * t * end[1];
  const z = (1 - t) * (1 - t) * start[2] + 2 * (1 - t) * t * mid[2] + t * t * end[2];
  
  return [x, y, z];
};

// Earth globe component
const Earth = () => {
  // Load Earth textures
  const textures = useTexture({
    map: '/earth_daymap.jpg',
    bumpMap: '/earth_bumpmap.jpg',
    specularMap: '/earth_specularmap.jpg',
    cloudsMap: '/earth_clouds.jpg'
  });
  
  const earthRef = useRef<any>(null);
  const cloudsRef = useRef<any>(null);
  
  // Rotate the earth slowly
  useFrame(({ clock }) => {
    if (earthRef.current) {
      earthRef.current.rotation.y = clock.getElapsedTime() * 0.05;
    }
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y = clock.getElapsedTime() * 0.07;
    }
  });
  
  return (
    <group>
      {/* Earth sphere */}
      <Sphere ref={earthRef} args={[1, 64, 64]}>
        <meshPhongMaterial 
          map={textures.map} 
          bumpMap={textures.bumpMap} 
          bumpScale={0.05}
          specularMap={textures.specularMap}
          specular="#555555"
          shininess={5}
        />
      </Sphere>
      
      {/* Cloud layer */}
      <Sphere ref={cloudsRef} args={[1.01, 64, 64]}>
        <meshPhongMaterial 
          map={textures.cloudsMap}
          transparent
          opacity={0.4}
          depthWrite={false}
        />
      </Sphere>
      
      {/* Atmosphere glow */}
      <Sphere args={[1.02, 64, 64]}>
        <meshPhongMaterial 
          color="#88aeff"
          transparent
          opacity={0.1}
          side={DoubleSide}
        />
      </Sphere>
    </group>
  );
};

// Convert latitude and longitude to 3D coordinates on a sphere
const latLongToVector3 = (lat: number, long: number, radius: number): [number, number, number] => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (long + 180) * (Math.PI / 180);
  
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = (radius * Math.sin(phi) * Math.sin(theta));
  const y = (radius * Math.cos(phi));
  
  return [x, y, z];
};

// Main World Map component
const WorldMap3D = ({ shipments = [] }: { shipments?: Shipment[] }) => {
  const [selectedShipment, setSelectedShipment] = useState<string | null>(null);
  
  // Shipment data with coordinates
  const shipmentCoordinates = [
    { id: '1', origin: { lat: 40.7128, long: -74.0060 }, destination: { lat: 34.0522, long: -118.2437 } }, // NY to LA
    { id: '2', origin: { lat: 37.7749, long: -122.4194 }, destination: { lat: 47.6062, long: -122.3321 } }, // SF to Seattle
    { id: '3', origin: { lat: 41.8781, long: -87.6298 }, destination: { lat: 25.7617, long: -80.1918 } }, // Chicago to Miami
    { id: '4', origin: { lat: 42.3601, long: -71.0589 }, destination: { lat: 30.2672, long: -97.7431 } }, // Boston to Austin
  ];
  
  // Get color based on shipment status
  const getShipmentColor = (status: string) => {
    switch (status) {
      case 'delivered': return "#10b981"; // Green
      case 'in-transit': return "#3b82f6"; // Blue
      case 'pending': return "#f59e0b"; // Amber
      case 'delayed': return "#ef4444"; // Red
      default: return "#6b7280"; // Gray
    }
  };
  
  // Get progress value (0-1) based on shipment status
  const getShipmentProgress = (status: string) => {
    switch (status) {
      case 'delivered': return 1;
      case 'in-transit': return 0.6;
      case 'pending': return 0.1;
      case 'delayed': return 0.4;
      default: return 0.5;
    }
  };

  return (
    <div className="relative w-full h-[600px] rounded-lg overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700">
      <Canvas camera={{ position: [0, 0, 2.5], fov: 45 }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ffffff" />
        
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
        
        {/* Controls */}
        <OrbitControls 
          enablePan={false}
          enableZoom={true}
          minDistance={1.5}
          maxDistance={4}
          rotateSpeed={0.5}
          zoomSpeed={0.5}
          autoRotate={!selectedShipment}
          autoRotateSpeed={0.5}
        />
      </Canvas>
      
      {/* Overlay with selected shipment details */}
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
                <span className={`px-2 py-0.5 rounded-full text-xs ${
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
