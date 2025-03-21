
import { Package, Calendar, ArrowRight, Clock, Box } from 'lucide-react';
import { Shipment } from '@/pages/Dashboard';

interface ShipmentCardProps {
  shipment: Shipment;
}

const ShipmentCard = ({ shipment }: ShipmentCardProps) => {
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
        <button className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium transition-colors">
          Track Details
        </button>
      </div>
    </div>
  );
};

export default ShipmentCard;
