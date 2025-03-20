import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Package, ChevronRight, MapPin, Calendar, Tag, Truck } from 'lucide-react';
import BlockchainVerification from './blockchain/verification';

interface ShipmentCardProps {
  shipment: {
    id: string;
    trackingNumber: string;
    status: 'pending' | 'in-transit' | 'delivered' | 'delayed';
    origin: string;
    destination: string;
    estimatedDelivery: string;
    lastUpdated: string;
    items: number;
  };
  className?: string;
}

const ShipmentCard = ({ shipment, className }: ShipmentCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-logistics-warning/10 text-logistics-warning';
      case 'in-transit':
        return 'bg-logistics-blue/10 text-logistics-blue';
      case 'delivered':
        return 'bg-logistics-success/10 text-logistics-success';
      case 'delayed':
        return 'bg-logistics-error/10 text-logistics-error';
      default:
        return 'bg-gray-100 text-gray-500';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'in-transit':
        return 'In Transit';
      case 'delivered':
        return 'Delivered';
      case 'delayed':
        return 'Delayed';
      default:
        return status;
    }
  };

  return (
    <div 
      className={cn(
        "rounded-xl border border-border overflow-hidden transition-all hover:shadow-medium bg-white dark:bg-logistics-dark/50",
        className
      )}
    >
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center size-10 rounded-md bg-logistics-light-blue dark:bg-logistics-blue/10">
              <Package className="size-5 text-logistics-blue" />
            </div>
            <div>
              <h3 className="font-medium">{shipment.trackingNumber}</h3>
              <p className="text-sm text-logistics-gray">
                {formatDate(shipment.lastUpdated)}
              </p>
            </div>
          </div>
          <div className={cn(
            "px-3 py-1 rounded-full text-xs font-medium",
            getStatusColor(shipment.status)
          )}>
            {getStatusText(shipment.status)}
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3">
          <div className="flex items-center gap-2">
            <MapPin className="size-4 text-logistics-gray" />
            <div>
              <p className="text-xs text-logistics-gray">Origin</p>
              <p className="text-sm font-medium">{shipment.origin}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="size-4 text-logistics-gray" />
            <div>
              <p className="text-xs text-logistics-gray">Destination</p>
              <p className="text-sm font-medium">{shipment.destination}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="size-4 text-logistics-gray" />
            <div>
              <p className="text-xs text-logistics-gray">Estimated Delivery</p>
              <p className="text-sm font-medium">{formatDate(shipment.estimatedDelivery)}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Tag className="size-4 text-logistics-gray" />
            <div>
              <p className="text-xs text-logistics-gray">Items</p>
              <p className="text-sm font-medium">{shipment.items} {shipment.items === 1 ? 'Item' : 'Items'}</p>
            </div>
          </div>
        </div>

        <BlockchainVerification className="mt-4" status="verified" />

        <button 
          className="mt-4 w-full flex items-center justify-center gap-1 text-sm text-logistics-blue hover:underline"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? 'Hide Details' : 'View Details'}
          <ChevronRight className={cn(
            "size-4 transition-transform",
            isExpanded && "transform rotate-90"
          )} />
        </button>

        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-border animate-fade-in">
            <h4 className="text-sm font-medium mb-3">Shipment Timeline</h4>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="relative flex flex-col items-center">
                  <div className="size-4 rounded-full bg-logistics-success z-10"></div>
                  <div className="h-full w-0.5 bg-logistics-light-gray dark:bg-white/10 -mt-0.5"></div>
                </div>
                <div className="-mt-0.5">
                  <p className="text-sm font-medium">Order Placed</p>
                  <p className="text-xs text-logistics-gray">May 12, 2023 - 10:30 AM</p>
                  <p className="text-xs mt-1">Order has been received and is being processed.</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <div className="relative flex flex-col items-center">
                  <div className="size-4 rounded-full bg-logistics-success z-10"></div>
                  <div className="h-full w-0.5 bg-logistics-light-gray dark:bg-white/10 -mt-0.5"></div>
                </div>
                <div className="-mt-0.5">
                  <p className="text-sm font-medium">Package Prepared</p>
                  <p className="text-xs text-logistics-gray">May 13, 2023 - 2:15 PM</p>
                  <p className="text-xs mt-1">Your package has been prepared for shipping.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="relative flex flex-col items-center">
                  <div className="size-4 rounded-full bg-logistics-blue z-10"></div>
                  <div className="h-full w-0.5 bg-logistics-light-gray dark:bg-white/10 -mt-0.5"></div>
                </div>
                <div className="-mt-0.5">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium">In Transit</p>
                    <span className="bg-logistics-blue/10 text-logistics-blue text-xs px-2 py-0.5 rounded-full">Current</span>
                  </div>
                  <p className="text-xs text-logistics-gray">May 14, 2023 - 9:45 AM</p>
                  <p className="text-xs mt-1">Your package is on its way to {shipment.destination}.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="relative flex flex-col items-center">
                  <div className="size-4 rounded-full bg-logistics-light-gray dark:bg-white/20 z-10"></div>
                </div>
                <div className="-mt-0.5">
                  <p className="text-sm font-medium text-logistics-gray">Out for Delivery</p>
                  <p className="text-xs text-logistics-gray">Estimated: May 16, 2023</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShipmentCard;
