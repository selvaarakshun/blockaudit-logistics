
import { useState, useEffect } from 'react';
import { Map, Satellite, Navigation, Warehouse } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ShipmentPoint as ShipmentPointType } from './logistics/types';
import ShipmentPoint from './logistics/ShipmentPoint';
import MapControls from './logistics/MapControls';
import MapLegend from './logistics/MapLegend';
import LoadingOverlay from './logistics/LoadingOverlay';

// Simulated data for real-time tracking
const SIMULATED_POINTS: ShipmentPointType[] = [
  {
    id: '1',
    name: 'Container #A7291',
    lat: 40.7128,
    lng: -74.0060,
    status: 'in-transit',
    temperature: 5.2,
    humidity: 42,
    batteryLevel: 87,
    signalStrength: 92,
    lastUpdate: new Date(Date.now() - 25 * 60000).toISOString(),
    estimatedArrival: new Date(Date.now() + 3 * 24 * 60 * 60000).toISOString(),
    healthStatus: 'optimal'
  },
  {
    id: '2',
    name: 'Refrigerated Cargo #B1832',
    lat: 34.0522,
    lng: -118.2437,
    status: 'in-transit',
    temperature: 2.1,
    humidity: 38,
    batteryLevel: 64,
    signalStrength: 78,
    lastUpdate: new Date(Date.now() - 45 * 60000).toISOString(),
    estimatedArrival: new Date(Date.now() + 1 * 24 * 60 * 60000).toISOString(),
    healthStatus: 'warning'
  },
  {
    id: '3',
    name: 'Medical Supplies #M5492',
    lat: 41.8781,
    lng: -87.6298,
    status: 'delayed',
    temperature: 8.7,
    humidity: 51,
    batteryLevel: 32,
    signalStrength: 45,
    lastUpdate: new Date(Date.now() - 120 * 60000).toISOString(),
    estimatedArrival: new Date(Date.now() + 2 * 24 * 60 * 60000).toISOString(),
    healthStatus: 'critical'
  }
];

const LogisticsMap = () => {
  const [activePoint, setActivePoint] = useState<string | null>(null);
  const [shipmentPoints, setShipmentPoints] = useState<ShipmentPointType[]>([]);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [mapZoom, setMapZoom] = useState(1);
  const [isRotating, setIsRotating] = useState(true);
  const [rotationAngle, setRotationAngle] = useState(0);

  useEffect(() => {
    setShipmentPoints(SIMULATED_POINTS);
    const timer = setTimeout(() => setIsMapLoaded(true), 1000);
    
    const updateInterval = setInterval(() => {
      setShipmentPoints(points => 
        points.map(point => ({
          ...point,
          temperature: Math.round((point.temperature + (Math.random() * 0.4 - 0.2)) * 10) / 10,
          humidity: Math.min(100, Math.max(0, point.humidity + Math.floor(Math.random() * 3 - 1))),
          batteryLevel: point.batteryLevel > 99 ? 100 : point.batteryLevel - (Math.random() > 0.7 ? 1 : 0),
          signalStrength: Math.min(100, Math.max(0, point.signalStrength + Math.floor(Math.random() * 5 - 2))),
          lastUpdate: new Date().toISOString()
        }))
      );
    }, 30000);

    const rotationInterval = setInterval(() => {
      if (isRotating) {
        setRotationAngle(prev => (prev + 0.5) % 360);
      }
    }, 100);
    
    return () => {
      clearTimeout(timer);
      clearInterval(updateInterval);
      clearInterval(rotationInterval);
    };
  }, [isRotating]);

  const handlePointClick = (id: string) => {
    setActivePoint(id === activePoint ? null : id);
  };

  return (
    <Card className="shadow-lg border border-border overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl flex items-center gap-2">
              <Map className="h-5 w-5 text-primary" />
              Real-time Logistics Tracking
            </CardTitle>
            <CardDescription>
              GPS-powered real-time tracking with environmental monitoring
            </CardDescription>
          </div>
          <MapControls
            isRotating={isRotating}
            onRotationToggle={() => setIsRotating(!isRotating)}
            onZoomIn={() => setMapZoom(prev => Math.min(prev + 0.5, 3))}
            onZoomOut={() => setMapZoom(prev => Math.max(prev - 0.5, 0.5))}
          />
        </div>
      </CardHeader>
      <CardContent className="p-0 relative">
        <div 
          className="aspect-[16/9] relative overflow-hidden" 
          style={{ transform: `scale(${mapZoom})` }}
        >
          {!isMapLoaded ? (
            <LoadingOverlay />
          ) : (
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
                    onPointClick={handlePointClick}
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
          )}
        </div>
      </CardContent>
      <CardFooter className="p-3 border-t flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <Satellite className="h-3 w-3" />
          <span>Global Tracking Network • {shipmentPoints.length} active shipments</span>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-1">
            <Warehouse className="h-3 w-3" />
            <span>3 Distribution Centers</span>
          </div>
          <div className="flex items-center gap-1">
            <Navigation className="h-3 w-3" />
            <span>7 Transit Routes</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default LogisticsMap;
