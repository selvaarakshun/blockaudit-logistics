
import { useState } from 'react';
import ShipmentCard from '@/components/shipment/ShipmentCard';
import ShipmentFilter from '@/components/dashboard/ShipmentFilter';
import { useShipments } from '@/context/ShipmentContext';

const ShipmentList = () => {
  const [activeTab, setActiveTab] = useState('all');
  const { shipments } = useShipments();
  
  return (
    <>
      <ShipmentFilter activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="grid md:grid-cols-2 gap-6">
        {shipments.length > 0 ? (
          shipments
            .filter(shipment => activeTab === 'all' || shipment.status === activeTab)
            .map((shipment) => (
              <ShipmentCard key={shipment.id} shipment={shipment} />
            ))
        ) : (
          <div className="col-span-2 text-center py-10 border border-dashed rounded-lg border-gray-300 bg-white dark:bg-gray-800/50">
            <div className="mb-3">
              <span className="bg-blue-100 text-blue-800 p-2 rounded-full inline-block">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-package-open">
                  <path d="M20.91 8.84 8.56 2.23a1.93 1.93 0 0 0-1.81 0L3.1 4.13a2.12 2.12 0 0 0-.05 3.69l12.22 6.93a2 2 0 0 0 1.94 0L21 12.51a2.12 2.12 0 0 0-.09-3.67Z"/>
                  <path d="m3.09 8.84 12.35-6.61a1.93 1.93 0 0 1 1.81 0l3.65 1.9a2.12 2.12 0 0 1 .1 3.69L8.73 14.75a2 2 0 0 1-1.94 0L3 12.51a2.12 2.12 0 0 1 .09-3.67Z"/>
                  <line x1="12" y1="22" x2="12" y2="13"/>
                  <path d="M20 13.5v3.37a2.06 2.06 0 0 1-1.11 1.83l-6 3.08a1.93 1.93 0 0 1-1.78 0l-6-3.08A2.06 2.06 0 0 1 4 16.87V13.5"/>
                </svg>
              </span>
            </div>
            <h3 className="text-lg font-medium mb-1">No Shipments Found</h3>
            <p className="text-gray-500 mb-4">Create your first shipment to get started</p>
          </div>
        )}
      </div>
    </>
  );
};

export default ShipmentList;
