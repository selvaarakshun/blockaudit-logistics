
import { useState } from 'react';
import { Package, Calendar, ArrowRight, Clock, Box, ChevronDown, ChevronUp, MapPin, Truck, AlertCircle } from 'lucide-react';
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

  // Generate mock tracking events based on shipment status
  const getTrackingEvents = () => {
    const events = [
      {
        date: new Date(new Date(shipment.lastUpdated).getTime() - 86400000 * 3),
        location: shipment.origin,
        status: 'Order processed',
        description: 'Order has been processed and is ready for shipment'
      }
    ];
    
    if (['in-transit', 'delivered', 'delayed'].includes(shipment.status)) {
      events.push({
        date: new Date(new Date(shipment.lastUpdated).getTime() - 86400000 * 2),
        location: `${shipment.origin} Distribution Center`,
        status: 'Picked up by carrier',
        description: 'Package has been picked up by the carrier'
      });
      
      events.push({
        date: new Date(new Date(shipment.lastUpdated).getTime() - 86400000),
        location: 'Transit Hub',
        status: 'In transit',
        description: `Package is in transit to ${shipment.destination}`
      });
    }
    
    if (shipment.status === 'delayed') {
      events.push({
        date: new Date(shipment.lastUpdated),
        location: 'Transit Hub',
        status: 'Delayed',
        description: 'Package has been delayed due to weather conditions'
      });
    }
    
    if (shipment.status === 'delivered') {
      events.push({
        date: new Date(shipment.lastUpdated),
        location: shipment.destination,
        status: 'Delivered',
        description: 'Package has been delivered'
      });
    }
    
    return events.sort((a, b) => b.date.getTime() - a.date.getTime());
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
          <div className="mb-4">
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
          
          {/* Detailed Tracking Events */}
          <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
            <h4 className="font-medium text-sm mb-3">Tracking History</h4>
            <div className="space-y-4">
              {getTrackingEvents().map((event, index) => (
                <div key={index} className="relative pl-6 border-l-2 border-gray-200 dark:border-gray-700">
                  <div className="absolute -left-[5px] top-0 size-2.5 rounded-full bg-blue-600"></div>
                  <div className="mb-1">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {event.date.toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    {event.status === 'Delivered' && <Package className="h-4 w-4 text-green-600 mt-0.5" />}
                    {event.status === 'In transit' && <Truck className="h-4 w-4 text-blue-600 mt-0.5" />}
                    {event.status === 'Delayed' && <AlertCircle className="h-4 w-4 text-red-600 mt-0.5" />}
                    {event.status === 'Order processed' && <Box className="h-4 w-4 text-gray-600 mt-0.5" />}
                    {event.status === 'Picked up by carrier' && <Box className="h-4 w-4 text-gray-600 mt-0.5" />}
                    <div>
                      <p className="text-sm font-medium">
                        {event.status}
                      </p>
                      <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                        <MapPin className="h-3 w-3 mr-1" />
                        {event.location}
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {event.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Additional Shipment Details */}
          <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
            <h4 className="font-medium text-sm mb-3">Shipment Details</h4>
            <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm">
              <div>
                <span className="text-gray-500 dark:text-gray-400 text-xs">Shipping Method:</span>
                <p className="font-medium">{shipment.status === 'delayed' ? 'Express (Delayed)' : 'Express'}</p>
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400 text-xs">Service Type:</span>
                <p className="font-medium">International Air</p>
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400 text-xs">Weight:</span>
                <p className="font-medium">{(Math.random() * 20 + 1).toFixed(1)} kg</p>
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400 text-xs">Dimensions:</span>
                <p className="font-medium">{Math.floor(Math.random() * 50 + 10)}x{Math.floor(Math.random() * 40 + 10)}x{Math.floor(Math.random() * 30 + 10)} cm</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShipmentCard;
