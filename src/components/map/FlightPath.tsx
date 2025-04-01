
import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Vector3, CubicBezierCurve3 } from 'three';

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

export default FlightPath;
