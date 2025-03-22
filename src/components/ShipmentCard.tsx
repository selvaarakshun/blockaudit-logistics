
import { useState } from 'react';
import { Package, Calendar, ArrowRight, Clock, Box, ChevronDown, ChevronUp } from 'lucide-react';
import { Shipment } from '@/pages/Dashboard';
import { Progress } from '@/components/ui/progress';

interface ShipmentCardProps {
  shipment: Shipment;
}

const ShipmentCard = ({ shipment }: ShipmentCardProps) => {
  const [showTrackingDetails, setShowTrackingDetails] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const statusColors = {
    'pending': 'bg-amber-100 text-amber-800 border-amber-200',
    'in-transit': 'bg-blue-100 text-blue-800 border-blue-200',
    'delivered': 'bg-green-100 text-green-800 border-green-200',
    'delayed': 'bg-red-100 text-red-800 border-red-200'
  };

  const getProgressPercentage = () => {
    switch (shipment.status) {
      case 'pending': return 25;
      case 'in-transit': return 60;
      case 'delivered': return 100;
      case 'delayed': return 60;
      default: return 0;
    }
  };

  const getStepStatus = (step: number) => {
    const stepMap = {
      'pending': 1,
      'in-transit': 2,
      'delivered': 3,
      'delayed': 2
    };
    
    const currentStep = stepMap[shipment.status];
    
    if (step < currentStep) return 'completed';
    if (step === currentStep) return 'current';
    return 'upcoming';
  };

  return (
    <div className="bg-white dark:bg-gray-800/50 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all duration-200 overflow-hidden">
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400 mb-1 block">{shipment.trackingNumber}</span>
            <h3 className="text-lg font-semibold">
              {shipment.shipmentName || `Shipment to ${shipment.destination}`}
            </h3>
          </div>
          <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${statusColors[shipment.status]}`}>
            {shipment.status.replace('-', ' ')}
          </span>
        </div>
        
        <div className="flex items-center mb-4 text-sm">
          <div className="font-medium">{shipment.origin}</div>
          <ArrowRight className="mx-2 h-3 w-3 text-gray-500" />
          <div className="font-medium">{shipment.destination}</div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-3">
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
            <Calendar className="h-4 w-4" />
            <span className="text-sm">
              Delivery: {formatDate(shipment.estimatedDelivery)}
            </span>
          </div>
          
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
            <Box className="h-4 w-4" />
            <span className="text-sm">
              {shipment.items} {shipment.items === 1 ? 'item' : 'items'}
            </span>
          </div>
        </div>
      </div>
      
      <div className="p-3 bg-gray-50 dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-xs">
          <Clock className="h-3 w-3" />
          <span>Updated: {formatDate(shipment.lastUpdated)}</span>
        </div>
        <button 
          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium transition-colors flex items-center gap-1"
          onClick={() => setShowTrackingDetails(!showTrackingDetails)}
        >
          Track Details
          {showTrackingDetails ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
      </div>
      
      {showTrackingDetails && (
        <div className="p-4 bg-gray-50 dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700">
          <div className="mb-3">
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
              <span>Order Placed</span>
              <span>In Transit</span>
              <span>Delivered</span>
            </div>
            <Progress value={getProgressPercentage()} className="h-2" />
          </div>
          
          <div className="space-y-3 mt-4">
            <div className={`flex gap-3 items-start ${getStepStatus(1) === 'completed' ? 'text-green-600' : getStepStatus(1) === 'current' ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`size-6 rounded-full flex items-center justify-center ${
                getStepStatus(1) === 'completed' ? 'bg-green-100' : 
                getStepStatus(1) === 'current' ? 'bg-blue-100' : 
                'bg-gray-100'
              }`}>
                <span className="text-xs font-medium">1</span>
              </div>
              <div>
                <p className="text-sm font-medium">Order Processed</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {getStepStatus(1) !== 'upcoming' ? formatDate(shipment.lastUpdated) : 'Pending'}
                </p>
              </div>
            </div>
            
            <div className={`flex gap-3 items-start ${getStepStatus(2) === 'completed' ? 'text-green-600' : getStepStatus(2) === 'current' ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`size-6 rounded-full flex items-center justify-center ${
                getStepStatus(2) === 'completed' ? 'bg-green-100' : 
                getStepStatus(2) === 'current' ? 'bg-blue-100' : 
                'bg-gray-100'
              }`}>
                <span className="text-xs font-medium">2</span>
              </div>
              <div>
                <p className="text-sm font-medium">In Transit</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {getStepStatus(2) !== 'upcoming' ? 'Shipment on the way' : 'Pending'}
                </p>
              </div>
            </div>
            
            <div className={`flex gap-3 items-start ${getStepStatus(3) === 'completed' ? 'text-green-600' : getStepStatus(3) === 'current' ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`size-6 rounded-full flex items-center justify-center ${
                getStepStatus(3) === 'completed' ? 'bg-green-100' : 
                getStepStatus(3) === 'current' ? 'bg-blue-100' : 
                'bg-gray-100'
              }`}>
                <span className="text-xs font-medium">3</span>
              </div>
              <div>
                <p className="text-sm font-medium">Delivered</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {getStepStatus(3) === 'completed' ? formatDate(shipment.estimatedDelivery) : 'Expected: ' + formatDate(shipment.estimatedDelivery)}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShipmentCard;
