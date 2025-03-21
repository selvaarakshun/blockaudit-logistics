
import { useState } from 'react';
import { Search, Plus } from 'lucide-react';
import NewShipmentDialog from './NewShipmentDialog';
import { ShipmentFormValues } from './shipment-schema';

interface ShipmentHeaderProps {
  onNewShipment: (shipmentData: ShipmentFormValues) => void;
}

const ShipmentHeader = ({ onNewShipment }: ShipmentHeaderProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  return (
    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4 bg-white dark:bg-gray-800/50 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Shipment Dashboard</h1>
        <p className="text-gray-500 dark:text-gray-400">Track and manage your blockchain-verified shipments</p>
      </div>
      
      <div className="flex gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search shipments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 pr-4 py-2 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full md:w-64 transition-all"
          />
        </div>
        
        <button 
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 py-2 rounded-md shadow-sm flex items-center gap-1 transition-all hover:shadow-md"
          onClick={() => setDialogOpen(true)}
        >
          <Plus className="size-4" />
          <span>New Shipment</span>
        </button>
      </div>
      
      <NewShipmentDialog 
        open={dialogOpen} 
        onOpenChange={setDialogOpen} 
        onNewShipment={onNewShipment}
      />
    </div>
  );
};

export default ShipmentHeader;
