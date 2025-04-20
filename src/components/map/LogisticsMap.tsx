import { useState, useEffect } from 'react';
import { Map, Satellite, Navigation, Warehouse } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ShipmentPoint as ShipmentPointType } from './logistics/types';
import MapControls from './logistics/MapControls';
import LoadingOverlay from './logistics/LoadingOverlay';
import GlobeVisualization from './logistics/GlobeVisualization';

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
            <GlobeVisualization
              rotationAngle={rotationAngle}
              shipmentPoints={shipmentPoints}
              activePoint={activePoint}
              onPointClick={handlePointClick}
            />
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
