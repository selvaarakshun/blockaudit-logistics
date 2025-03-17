
import { Search, Plus } from 'lucide-react';

const ShipmentHeader = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Shipment Dashboard</h1>
        <p className="text-logistics-gray">Track and manage your blockchain-verified shipments</p>
      </div>
      
      <div className="flex gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-logistics-gray" />
          <input 
            type="text" 
            placeholder="Search shipments..."
            className="pl-9 pr-4 py-2 rounded-md border border-border bg-white dark:bg-logistics-dark shadow-subtle focus:outline-none focus:ring-2 focus:ring-logistics-blue focus:border-transparent w-full md:w-auto"
          />
        </div>
        
        <button className="btn-primary flex items-center gap-1">
          <Plus className="size-4" />
          <span>New Shipment</span>
        </button>
      </div>
    </div>
  );
};

export default ShipmentHeader;
