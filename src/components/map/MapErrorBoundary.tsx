
import React from 'react';

// Custom error boundary component
class MapErrorBoundary extends React.Component<{ 
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

// Fallback UI when map rendering fails
export const MapErrorFallback = () => (
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

export default MapErrorBoundary;
