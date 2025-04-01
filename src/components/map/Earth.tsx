
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import { DoubleSide } from 'three';
import { latLongToVector3 } from './mapUtils';

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

export default Earth;
