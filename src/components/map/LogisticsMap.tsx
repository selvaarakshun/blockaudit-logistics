
import { useState, useEffect } from 'react';
import { Map, MapPin, Navigation, Truck, Info, AlertTriangle, Wifi, Activity, Battery, Radio, Package, Warehouse, Satellite } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

// Define shipment point with additional data for enhanced tracking
interface ShipmentPoint {
  id: string;
  name: string;
  lat: number;
  lng: number;
  status: 'in-transit' | 'delivered' | 'pending' | 'delayed';
  temperature: number;
  humidity: number;
  batteryLevel: number;
  signalStrength: number;
  lastUpdate: string;
  estimatedArrival: string;
  healthStatus: 'optimal' | 'warning' | 'critical';
}

// Simulated data for real-time tracking
const SIMULATED_POINTS: ShipmentPoint[] = [
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
  const [shipmentPoints, setShipmentPoints] = useState<ShipmentPoint[]>([]);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [mapZoom, setMapZoom] = useState(1);
  const [isRotating, setIsRotating] = useState(true);
  const [rotationAngle, setRotationAngle] = useState(0);

  // Simulate real-time updates
  useEffect(() => {
    // Initialize with simulated data
    setShipmentPoints(SIMULATED_POINTS);
    
    // Simulate map loading
    const timer = setTimeout(() => setIsMapLoaded(true), 1000);
    
    // Real-time updates simulation interval
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
    }, 30000); // Update every 30 seconds

    // Rotate the map in 3D view
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

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'delivered': return 'bg-green-500';
      case 'in-transit': return 'bg-blue-500';
      case 'pending': return 'bg-yellow-500';
      case 'delayed': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getHealthStatusIndicator = (status: string) => {
    switch(status) {
      case 'optimal': return { color: 'text-green-500', icon: <Activity className="h-4 w-4" />, text: 'Optimal' };
      case 'warning': return { color: 'text-yellow-500', icon: <AlertTriangle className="h-4 w-4" />, text: 'Warning' };
      case 'critical': return { color: 'text-red-500', icon: <AlertTriangle className="h-4 w-4" />, text: 'Critical' };
      default: return { color: 'text-gray-500', icon: <Info className="h-4 w-4" />, text: 'Unknown' };
    }
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
          <div className="flex gap-2">
            <button 
              onClick={() => setIsRotating(!isRotating)}
              className={`p-2 rounded-full ${isRotating ? 'bg-primary/10 text-primary' : 'bg-gray-100 dark:bg-gray-800'}`}
              title={isRotating ? "Pause rotation" : "Resume rotation"}
            >
              <Radio className="h-4 w-4" />
            </button>
            <button 
              onClick={() => setMapZoom(prev => Math.min(prev + 0.5, 3))}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800"
              title="Zoom in"
            >
              <span className="text-lg font-bold">+</span>
            </button>
            <button 
              onClick={() => setMapZoom(prev => Math.max(prev - 0.5, 0.5))}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800"
              title="Zoom out"
            >
              <span className="text-lg font-bold">−</span>
            </button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0 relative">
        <div 
          className="aspect-[16/9] relative overflow-hidden" 
          style={{
            transform: `scale(${mapZoom})`
          }}
        >
          {!isMapLoaded ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 bg-gray-50 dark:bg-gray-900 text-center">
              <Satellite className="size-16 text-gray-400 animate-pulse mb-2" />
              <h3 className="text-xl font-medium">Loading Global Tracking Network</h3>
              <p className="text-gray-500 max-w-md mb-4">
                Connecting to satellite network and loading tracking data...
              </p>
              <div className="w-64">
                <Progress value={65} className="h-2" />
              </div>
            </div>
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
                {/* Earth texture simulation with gradients */}
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
                {shipmentPoints.map(point => {
                  // Convert lat/lng to visual position
                  const top = 50 + (point.lat / 90) * 50;
                  const left = 50 + (point.lng / 180) * 50;
                  
                  return (
                    <div 
                      key={point.id}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
                      style={{ 
                        top: `${top}%`, 
                        left: `${left}%`,
                        transition: 'all 0.3s ease'
                      }}
                      onClick={() => handlePointClick(point.id)}
                    >
                      <div className="relative">
                        <div className={`size-3 rounded-full ${getStatusColor(point.status)} shadow-lg`}></div>
                        <div className={`absolute inset-0 ${getStatusColor(point.status)} opacity-40 animate-ping rounded-full`}></div>
                        
                        {activePoint === point.id && (
                          <Card className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 z-20 shadow-xl">
                            <CardHeader className="py-2 px-3 flex flex-row items-center justify-between bg-gray-50 dark:bg-gray-800">
                              <div>
                                <CardTitle className="text-sm font-medium">{point.name}</CardTitle>
                                <CardDescription className="text-xs">{point.status.replace('-', ' ')}</CardDescription>
                              </div>
                              <div 
                                className={`px-2 py-1 rounded text-xs font-medium ${
                                  point.status === 'delivered' ? 'bg-green-100 text-green-800' :
                                  point.status === 'in-transit' ? 'bg-blue-100 text-blue-800' :
                                  point.status === 'delayed' ? 'bg-red-100 text-red-800' : 
                                  'bg-yellow-100 text-yellow-800'
                                }`}
                              >
                                {point.status.replace('-', ' ')}
                              </div>
                            </CardHeader>
                            <CardContent className="p-3 space-y-3 text-sm">
                              {/* Vitals monitoring */}
                              <div className="grid grid-cols-2 gap-2">
                                <div className="flex items-center gap-1.5">
                                  <Truck className="size-3.5 text-gray-500" />
                                  <span className="text-xs text-gray-600 dark:text-gray-400">ETA: {formatDate(point.estimatedArrival)}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                  <Wifi className="size-3.5 text-gray-500" />
                                  <span className="text-xs text-gray-600 dark:text-gray-400">Signal: {point.signalStrength}%</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                  <Package className="size-3.5 text-gray-500" />
                                  <span className="text-xs text-gray-600 dark:text-gray-400">Temp: {point.temperature}°C</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                  <Battery className="size-3.5 text-gray-500" />
                                  <span className="text-xs text-gray-600 dark:text-gray-400">Power: {point.batteryLevel}%</span>
                                </div>
                              </div>
                              
                              {/* Health status */}
                              <div className="pt-1">
                                <div className="text-xs text-gray-500 mb-1">Shipment Health</div>
                                <div className={`flex items-center gap-1 ${getHealthStatusIndicator(point.healthStatus).color}`}>
                                  {getHealthStatusIndicator(point.healthStatus).icon}
                                  <span className="font-medium text-xs">{getHealthStatusIndicator(point.healthStatus).text}</span>
                                </div>
                              </div>
                              
                              {/* Progress bar */}
                              <div className="pt-1">
                                <div className="text-xs text-gray-500 mb-1">Transit Progress</div>
                                <Progress 
                                  value={point.status === 'delivered' ? 100 : point.status === 'delayed' ? 60 : 75} 
                                  className="h-1.5" 
                                  indicatorClassName={
                                    point.status === 'delivered' ? 'bg-green-500' : 
                                    point.status === 'delayed' ? 'bg-red-500' : 
                                    'bg-blue-500'
                                  }
                                />
                              </div>
                            </CardContent>
                            <CardFooter className="py-2 px-3 bg-gray-50 dark:bg-gray-800 text-xs text-gray-500">
                              Last updated: {formatTime(point.lastUpdate)}
                            </CardFooter>
                          </Card>
                        )}
                      </div>
                    </div>
                  );
                })}
                
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
              
              {/* Bottom control panel */}
              <div className="absolute bottom-0 left-0 right-0 bg-white/80 dark:bg-black/60 backdrop-blur-sm p-2 z-10 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="flex items-center gap-1">
                    <div className="size-2 rounded-full bg-green-500"></div>
                    <span className="text-xs">Delivered</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="size-2 rounded-full bg-blue-500"></div>
                    <span className="text-xs">In Transit</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="size-2 rounded-full bg-yellow-500"></div>
                    <span className="text-xs">Pending</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="size-2 rounded-full bg-red-500"></div>
                    <span className="text-xs">Delayed</span>
                  </div>
                </div>
                <div className="flex items-center text-xs text-gray-600 dark:text-gray-300">
                  <MapPin className="h-3 w-3 mr-1" />
                  <span>Click on any tracking point for details</span>
                </div>
              </div>
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
