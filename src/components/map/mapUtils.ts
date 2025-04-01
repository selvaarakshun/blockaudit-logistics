
import { Vector3, CubicBezierCurve3 } from 'three';

// Convert latitude and longitude to 3D coordinates on a sphere
export const latLongToVector3 = (lat: number, long: number, radius: number): [number, number, number] => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (long + 180) * (Math.PI / 180);
  
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = (radius * Math.sin(phi) * Math.sin(theta));
  const y = (radius * Math.cos(phi));
  
  return [x, y, z];
};

// Get color based on shipment status
export const getShipmentColor = (status: string) => {
  switch (status) {
    case 'delivered': return "#10b981"; // Green
    case 'in-transit': return "#3b82f6"; // Blue
    case 'pending': return "#f59e0b"; // Amber
    case 'delayed': return "#ef4444"; // Red
    default: return "#6b7280"; // Gray
  }
};

// Get progress value (0-1) based on shipment status
export const getShipmentProgress = (status: string) => {
  switch (status) {
    case 'delivered': return 1;
    case 'in-transit': return 0.6;
    case 'pending': return 0.1;
    case 'delayed': return 0.4;
    default: return 0.5;
  }
};

// Create a curve between two points
export const createShipmentCurve = (origin: [number, number, number], destination: [number, number, number]) => {
  // Calculate midpoint with height for curve
  const midPoint: [number, number, number] = [
    (origin[0] + destination[0]) / 2,
    (origin[1] + destination[1]) / 2,
    (origin[2] + destination[2]) / 2 + 0.5
  ];
  
  // Create bezier curve
  return new CubicBezierCurve3(
    new Vector3(...origin),
    new Vector3(origin[0] * 0.8 + midPoint[0] * 0.2, origin[1] * 0.8 + midPoint[1] * 0.2, midPoint[2] * 1.5),
    new Vector3(destination[0] * 0.8 + midPoint[0] * 0.2, destination[1] * 0.8 + midPoint[1] * 0.2, midPoint[2] * 1.5),
    new Vector3(...destination)
  );
};
