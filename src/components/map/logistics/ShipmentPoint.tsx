
import { MapPin } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Battery, Info, AlertTriangle, Wifi, Activity, Package, Truck } from 'lucide-react';
import { ShipmentPoint as ShipmentPointType } from './types';

interface ShipmentPointProps {
  point: ShipmentPointType;
  isActive: boolean;
  onPointClick: (id: string) => void;
}

const ShipmentPoint = ({ point, isActive, onPointClick }: ShipmentPointProps) => {
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

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div 
      className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
      style={{ 
        top: `${50 + (point.lat / 90) * 50}%`, 
        left: `${50 + (point.lng / 180) * 50}%`,
        transition: 'all 0.3s ease'
      }}
      onClick={() => onPointClick(point.id)}
    >
      <div className="relative">
        <div className={`size-3 rounded-full ${getStatusColor(point.status)} shadow-lg`}></div>
        <div className={`absolute inset-0 ${getStatusColor(point.status)} opacity-40 animate-ping rounded-full`}></div>
        
        {isActive && (
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
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center gap-1.5">
                  <Truck className="size-3.5 text-gray-500" />
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    ETA: {formatDate(point.estimatedArrival)}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Wifi className="size-3.5 text-gray-500" />
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    Signal: {point.signalStrength}%
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Package className="size-3.5 text-gray-500" />
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    Temp: {point.temperature}°C
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Battery className="size-3.5 text-gray-500" />
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    Power: {point.batteryLevel}%
                  </span>
                </div>
              </div>
              
              <div className="pt-1">
                <div className="text-xs text-gray-500 mb-1">Shipment Health</div>
                <div className={`flex items-center gap-1 ${getHealthStatusIndicator(point.healthStatus).color}`}>
                  {getHealthStatusIndicator(point.healthStatus).icon}
                  <span className="font-medium text-xs">{getHealthStatusIndicator(point.healthStatus).text}</span>
                </div>
              </div>
              
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
};

export default ShipmentPoint;
