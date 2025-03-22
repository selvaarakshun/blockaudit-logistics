
import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Line } from '@react-three/drei';
import { DoubleSide, Vector3, CubicBezierCurve3 } from 'three';
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

// Animated flight path using proper Three.js curves
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
  const lineRef = useRef<any>(null);
  
  // Calculate midpoint with height for curve
  const midPoint: [number, number, number] = [
    (start[0] + end[0]) / 2,
    (start[1] + end[1]) / 2,
    (start[2] + end[2]) / 2 + 0.5 // Add height to curve
  ];
  
  // Create bezier curve points
  const curve = new CubicBezierCurve3(
    new Vector3(...start),
    new Vector3(start[0] * 0.8 + midPoint[0] * 0.2, start[1] * 0.8 + midPoint[1] * 0.2, midPoint[2] * 1.5),
    new Vector3(end[0] * 0.8 + midPoint[0] * 0.2, end[1] * 0.8 + midPoint[1] * 0.2, midPoint[2] * 1.5),
    new Vector3(...end)
  );
  
  // Generate points along the curve
  const points = curve.getPoints(50);
  
  // Animation for the line
  useFrame(() => {
    if (lineRef.current) {
      lineRef.current.dashOffset -= 0.01;
    }
  });
  
  return (
    <group>
      {/* Line using drei Line component with dashed material */}
      <Line
        ref={lineRef}
        points={points}
        color={color}
        lineWidth={1.5}
        dashed
        dashSize={0.1}
        dashScale={1}
        dashOffset={0}
        transparent
        opacity={0.6}
      />
      
      {/* Animated ship/package */}
      <mesh position={curve.getPointAt(progress).toArray()}>
        <octahedronGeometry args={[0.03, 0]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} />
      </mesh>
    </group>
  );
};

// Earth globe component
const Earth = () => {
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
          color="#1e40af"
          specular="#555555"
          shininess={5}
        />
      </Sphere>
      
      {/* Cloud layer */}
      <Sphere ref={cloudsRef} args={[1.01, 64, 64]}>
        <meshPhongMaterial 
          color="#ffffff"
          transparent
          opacity={0.2}
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
      
      {/* Land masses rough approximation */}
      <group>
        {/* North America */}
        <mesh position={latLongToVector3(40, -100, 1.015)}>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshStandardMaterial color="#2e7d32" transparent opacity={0.8} />
        </mesh>
        
        {/* South America */}
        <mesh position={latLongToVector3(-20, -60, 1.015)}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial color="#2e7d32" transparent opacity={0.8} />
        </mesh>
        
        {/* Europe/Asia */}
        <mesh position={latLongToVector3(50, 10, 1.015)}>
          <sphereGeometry args={[0.25, 16, 16]} />
          <meshStandardMaterial color="#2e7d32" transparent opacity={0.8} />
        </mesh>
        
        {/* Africa */}
        <mesh position={latLongToVector3(0, 20, 1.015)}>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshStandardMaterial color="#2e7d32" transparent opacity={0.8} />
        </mesh>
        
        {/* Australia */}
        <mesh position={latLongToVector3(-25, 135, 1.015)}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color="#2e7d32" transparent opacity={0.8} />
        </mesh>
      </group>
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

// Scene wrapper component to handle errors gracefully
const WorldScene = ({ 
  shipments, 
  selectedShipment, 
  setSelectedShipment 
}: { 
  shipments: Shipment[]; 
  selectedShipment: string | null; 
  setSelectedShipment: (id: string | null) => void;
}) => {
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
    <>
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
      
      {/* Lighting */}
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1.5} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ffffff" />
    </>
  );
};

// Main World Map component
const WorldMap3D = ({ shipments = [] }: { shipments?: Shipment[] }) => {
  const [selectedShipment, setSelectedShipment] = useState<string | null>(null);
  const [errorState, setErrorState] = useState<boolean>(false);

  // Error handling - fix the type error by using React.ErrorInfo
  const handleErrors = (event: any) => {
    console.error("Three.js rendering error:", event);
    setErrorState(true);
  };

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
        <Canvas 
          camera={{ position: [0, 0, 2.5], fov: 45 }}
          onCreated={(state) => {
            // Set a simple placeholder for state.gl.setClearColor
            state.gl.setClearColor("#030711", 1);
          }}
          // Fix the type error by removing onError which is not a valid prop
        >
          <WorldScene 
            shipments={shipments} 
            selectedShipment={selectedShipment} 
            setSelectedShipment={setSelectedShipment} 
          />
        </Canvas>
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
