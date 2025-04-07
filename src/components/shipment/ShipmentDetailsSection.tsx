
import { Shipment } from '@/types/shipment';

interface ShipmentDetailsSectionProps {
  shipment: Shipment;
}

const ShipmentDetailsSection = ({ shipment }: ShipmentDetailsSectionProps) => {
  return (
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
  );
};

export default ShipmentDetailsSection;
