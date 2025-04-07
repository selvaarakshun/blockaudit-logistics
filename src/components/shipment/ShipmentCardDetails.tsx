
import { Progress } from '@/components/ui/progress';
import { Shipment } from '@/types/shipment';
import { Truck } from 'lucide-react';
import ShipmentProgress from './ShipmentProgress';
import ShipmentEnvironmentData from './ShipmentEnvironmentData';
import ShipmentTrackingHistory from './ShipmentTrackingHistory';
import ShipmentDetailsSection from './ShipmentDetailsSection';

interface ShipmentCardDetailsProps {
  shipment: Shipment;
}

const ShipmentCardDetails = ({ shipment }: ShipmentCardDetailsProps) => {
  const getProgressPercentage = () => {
    switch (shipment.status) {
      case 'pending': return 25;
      case 'in-transit': return 60;
      case 'delivered': return 100;
      case 'delayed': return 60;
      default: return 0;
    }
  };

  const getTrackingEnvironmentData = () => {
    const idNum = parseInt(shipment.id) || 1;
    return {
      temperature: (Math.sin(idNum * 0.5) * 3 + 5).toFixed(1),
      humidity: Math.floor(Math.sin(idNum * 0.3) * 10 + 45),
      batteryLevel: Math.floor(Math.sin(idNum * 0.7) * 15 + 75),
      signalStrength: Math.floor(Math.sin(idNum * 0.9) * 10 + 85),
      shocks: shipment.status === 'delayed' ? 3 : 0,
      lastDataUpdate: new Date(new Date(shipment.lastUpdated).getTime() - 30 * 60000).toISOString()
    };
  };

  const environmentData = getTrackingEnvironmentData();
  const progressPercentage = getProgressPercentage();

  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700">
      <div className="mb-6">
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
          <span>Order Placed</span>
          <span>In Transit</span>
          <span>Delivered</span>
        </div>
        <div className="relative">
          <Progress 
            value={progressPercentage} 
            className="h-2" 
            indicatorClassName={
              shipment.status === 'delivered' ? 'bg-green-500' : 
              shipment.status === 'delayed' ? 'bg-red-500' : 
              'bg-blue-500'
            }
          />
          
          {shipment.status === 'in-transit' && (
            <div 
              className="absolute top-0 transform -translate-y-1/2"
              style={{ 
                left: `${progressPercentage}%`,
                transition: 'left 0.5s ease-in-out'
              }}
            >
              <div className="bg-blue-500 text-white p-1 rounded-full flex items-center justify-center animate-pulse">
                <Truck className="h-3 w-3" />
              </div>
            </div>
          )}
        </div>
      </div>
      
      <ShipmentEnvironmentData 
        environmentData={environmentData} 
      />
      
      <ShipmentProgress shipment={shipment} />
      
      <ShipmentTrackingHistory shipment={shipment} />
      
      <ShipmentDetailsSection shipment={shipment} />
    </div>
  );
};

export default ShipmentCardDetails;
