
import React from 'react';
import { ShipmentPoint as ShipmentPointType } from './types';
import ShipmentPoint from './ShipmentPoint';
import MapLegend from './MapLegend';

interface GlobeVisualizationProps {
  rotationAngle: number;
  shipmentPoints: ShipmentPointType[];
  activePoint: string | null;
  onPointClick: (id: string) => void;
}

const GlobeVisualization = ({ 
  rotationAngle, 
  shipmentPoints, 
  activePoint, 
  onPointClick 
}: GlobeVisualizationProps) => {
  return (
    <div 
      className="absolute inset-0"
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d'
      }}
    >
      {/* 3D rotating earth visualization */}
      <div 
        className="absolute inset-0 bg-blue-50 dark:bg-blue-950 overflow-hidden"
        style={{
          transform: `rotateY(${rotationAngle}deg)`,
          transition: 'transform 0.1s linear',
          borderRadius: '50%',
          width: '150%',
          height: '150%',
          left: '-25%',
          top: '-25%',
          boxShadow: 'inset 0 0 20px rgba(0,0,0,0.2), 0 0 50px rgba(0,100,255,0.1)'
        }}
      >
        {/* Earth texture simulation */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-green-400"></div>
          <div className="grid grid-cols-36 grid-rows-18 h-full w-full">
            {Array.from({ length: 648 }).map((_, i) => (
              <div key={i} className="border border-blue-200 dark:border-blue-800 opacity-30"></div>
            ))}
          </div>
        </div>
        
        {/* Continents simulation */}
        <div className="absolute left-[20%] top-[30%] w-[25%] h-[15%] bg-green-300 dark:bg-green-700 opacity-40 rounded-full"></div>
        <div className="absolute left-[55%] top-[20%] w-[30%] h-[25%] bg-green-300 dark:bg-green-700 opacity-40 rounded-full"></div>
        <div className="absolute left-[30%] top-[65%] w-[15%] h-[10%] bg-green-300 dark:bg-green-700 opacity-40 rounded-full"></div>
        <div className="absolute left-[10%] top-[45%] w-[12%] h-[8%] bg-green-300 dark:bg-green-700 opacity-40 rounded-full"></div>
        
        {/* Shipment tracking points */}
        {shipmentPoints.map(point => (
          <ShipmentPoint
            key={point.id}
            point={point}
            isActive={activePoint === point.id}
            onPointClick={onPointClick}
          />
        ))}
        
        {/* Visual flight paths */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
          <defs>
            <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0.8" />
            </linearGradient>
          </defs>
          <path d="M20%,30% Q50%,10% 80%,35%" stroke="url(#routeGradient)" strokeWidth="0.5" fill="none" strokeDasharray="2,2" />
          <path d="M80%,35% Q60%,60% 30%,70%" stroke="url(#routeGradient)" strokeWidth="0.5" fill="none" strokeDasharray="2,2" />
          <path d="M30%,70% Q10%,50% 20%,30%" stroke="url(#routeGradient)" strokeWidth="0.5" fill="none" strokeDasharray="2,2" />
        </svg>
      </div>
      
      {/* Bottom legend */}
      <MapLegend />
    </div>
  );
};

export default GlobeVisualization;
