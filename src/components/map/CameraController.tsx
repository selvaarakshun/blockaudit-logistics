
import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Vector3 } from 'three';

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

export default CameraController;
