
import React, { useRef } from 'react';
import { useLoader, useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import { TextureLoader, DoubleSide } from 'three';

const Earth = () => {
  const earthRef = useRef<any>(null);
  const cloudsRef = useRef<any>(null);
  
  // Load textures
  const [dayMap, bumpMap, specularMap, cloudsMap] = useLoader(TextureLoader, [
    '/earth_daymap.jpg',
    '/earth_bumpmap.jpg',
    '/earth_specularmap.jpg',
    '/earth_clouds.jpg'
  ]);
  
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
          map={dayMap}
          bumpMap={bumpMap}
          bumpScale={0.05}
          specularMap={specularMap}
          specular="#777777"
          shininess={5}
        />
      </Sphere>
      
      {/* Cloud layer */}
      <Sphere ref={cloudsRef} args={[1.01, 64, 64]}>
        <meshPhongMaterial 
          map={cloudsMap}
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

export default Earth;
