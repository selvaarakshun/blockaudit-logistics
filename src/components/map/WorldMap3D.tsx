
import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Sphere, PerspectiveCamera } from '@react-three/drei';
import { DoubleSide, Vector3, CubicBezierCurve3, MathUtils } from 'three';
import { Shipment } from '@/pages/Dashboard';

// Custom error boundary component
class ErrorBoundary extends React.Component<{ 
  children: React.ReactNode, 
  fallback: React.ReactNode 
}> {
  state = { hasError: false };
  
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  
  componentDidCatch(error: Error) {
    console.error("Three.js rendering error:", error);
  }
  
  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    
    return this.props.children;
  }
}

// Camera controller for 3D tracking
const CameraController = ({ 
  trackingId, 
  position, 
  lookAt = [0, 0, 0],
  enableTracking = false
}: { 
  trackingId: string | null; 
  position?: [number, number, number];
  lookAt?: [number, number, number];
  enableTracking?: boolean;
}) => {
  const { camera } = useThree();
  const controlsRef = useRef<any>(null);
  
  // Set initial camera position
  useEffect(() => {
    if (position && !trackingId) {
      camera.position.set(...position);
      camera.lookAt(...lookAt);
    }
  }, []);
  
  // Handle tracking mode
  useEffect(() => {
    if (controlsRef.current) {
      // When tracking is enabled, disable orbit controls
      controlsRef.current.enabled = !enableTracking;
    }
  }, [enableTracking]);
  
  // Animate to tracking position
  useFrame((state, delta) => {
    if (enableTracking && trackingId && position) {
      // Smoothly move camera to tracking position with easing
      camera.position.lerp(new Vector3(...position), delta * 2);
      
      // Look at target
      const targetPos = new Vector3(...lookAt);
      const currentLookAt = new Vector3();
      camera.getWorldDirection(currentLookAt);
      const targetLookAt = targetPos.clone().sub(camera.position).normalize();
      
      // Interpolate the camera direction
      const newLookAt = currentLookAt.lerp(targetLookAt, delta * 3);
      camera.lookAt(camera.position.clone().add(newLookAt));
    }
  });
  
  return <OrbitControls 
    ref={controlsRef}
    enablePan={false}
    enableZoom={true}
    minDistance={1.5}
    maxDistance={4}
    rotateSpeed={0.5}
    zoomSpeed={0.5}
    autoRotate={!trackingId && !enableTracking}
    autoRotateSpeed={0.5}
    maxPolarAngle={Math.PI * 0.7} // Similar to Google Maps' max tilt
  />;
};

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
  const curvePoints = useRef<Vector3[]>([]);
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
  useEffect(() => {
    curvePoints.current = curve.getPoints(50);
  }, [start, end]);
  
  // Animation for the line
  useFrame(() => {
    if (lineRef.current) {
      lineRef.current.material.dashOffset -= 0.01;
    }
  });
  
  return (
    <group>
      {/* Create a line directly using buffer geometry */}
      <group>
        <mesh>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={curvePoints.current.length}
              array={new Float32Array(curvePoints.current.flatMap(p => [p.x, p.y, p.z]))}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color={color} linewidth={1.5} transparent opacity={0.6} />
        </mesh>
      </group>
      
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
  
  // Update camera position when tracking a shipment
  useEffect(() => {
    if (selectedShipment && isTracking) {
      const selectedCoord = shipmentCoordinates.find(coord => coord.id === selectedShipment);
      if (selectedCoord) {
        const shipment = shipments.find(s => s.id === selectedShipment);
        const progress = shipment ? getShipmentProgress(shipment.status) : 0.5;
        
        const origin = latLongToVector3(selectedCoord.origin.lat, selectedCoord.origin.long, 1);
        const destination = latLongToVector3(selectedCoord.destination.lat, selectedCoord.destination.long, 1);
        
        // Calculate midpoint
        const midPoint: [number, number, number] = [
          (origin[0] + destination[0]) / 2,
          (origin[1] + destination[1]) / 2,
          (origin[2] + destination[2]) / 2 + 0.5
        ];
        
        // Create a curve
        const curve = new CubicBezierCurve3(
          new Vector3(...origin),
          new Vector3(origin[0] * 0.8 + midPoint[0] * 0.2, origin[1] * 0.8 + midPoint[1] * 0.2, midPoint[2] * 1.5),
          new Vector3(destination[0] * 0.8 + midPoint[0] * 0.2, destination[1] * 0.8 + midPoint[1] * 0.2, midPoint[2] * 1.5),
          new Vector3(...destination)
        );
        
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

// Fallback UI when map rendering fails
const MapErrorFallback = () => (
  <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
    <div className="text-center p-6">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
      <h3 className="text-lg font-semibold mb-2">3D Map Unavailable</h3>
      <p className="text-sm text-gray-500">Could not render the 3D world map. Please try again later.</p>
    </div>
  </div>
);

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
        <ErrorBoundary fallback={<MapErrorFallback />}>
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
        </ErrorBoundary>
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
