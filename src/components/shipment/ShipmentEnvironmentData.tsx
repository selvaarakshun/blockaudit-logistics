
import { AlertCircle, Battery, Droplets, Thermometer, Wifi } from 'lucide-react';

interface EnvironmentData {
  temperature: string;
  humidity: number;
  batteryLevel: number;
  signalStrength: number;
  shocks: number;
  lastDataUpdate: string;
}

interface ShipmentEnvironmentDataProps {
  environmentData: EnvironmentData;
}

const ShipmentEnvironmentData = ({ environmentData }: ShipmentEnvironmentDataProps) => {
  return (
    <div className="mb-6 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
      <h4 className="text-sm font-medium mb-3 flex items-center gap-1.5">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-cpu"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M15 2v2"/><path d="M15 20v2"/><path d="M2 15h2"/><path d="M2 9h2"/><path d="M20 15h2"/><path d="M20 9h2"/><path d="M9 2v2"/><path d="M9 20v2"/></svg>
        Real-time Monitoring Data
      </h4>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="flex flex-col">
          <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 mb-1">
            <Thermometer className="h-3 w-3" />
            <span>Temperature</span>
          </div>
          <div className="font-medium text-sm">{environmentData.temperature}°C</div>
        </div>
        
        <div className="flex flex-col">
          <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 mb-1">
            <Droplets className="h-3 w-3" />
            <span>Humidity</span>
          </div>
          <div className="font-medium text-sm">{environmentData.humidity}%</div>
        </div>
        
        <div className="flex flex-col">
          <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 mb-1">
            <Battery className="h-3 w-3" />
            <span>Tracker Battery</span>
          </div>
          <div className="font-medium text-sm">{environmentData.batteryLevel}%</div>
        </div>
        
        <div className="flex flex-col">
          <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 mb-1">
            <Wifi className="h-3 w-3" />
            <span>Signal</span>
          </div>
          <div className="font-medium text-sm">{environmentData.signalStrength}%</div>
        </div>
      </div>
      
      {environmentData.shocks > 0 && (
        <div className="mt-3 flex items-center gap-1.5 text-red-600 text-xs bg-red-50 dark:bg-red-900/20 p-2 rounded">
          <AlertCircle className="h-3 w-3" />
          <span>{environmentData.shocks} shock events detected during transit</span>
        </div>
      )}
      
      <div className="mt-2 text-xs text-gray-400">
        Last sensor update: {new Date(environmentData.lastDataUpdate).toLocaleTimeString()}
      </div>
    </div>
  );
};

export default ShipmentEnvironmentData;
