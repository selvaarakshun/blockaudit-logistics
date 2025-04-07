
import { Shipment } from '@/types/shipment';

interface ShipmentProgressProps {
  shipment: Shipment;
}

const ShipmentProgress = ({ shipment }: ShipmentProgressProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
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
  );
};

export default ShipmentProgress;
