
import { useState } from 'react';
import { Filter, SortAsc } from 'lucide-react';

interface ShipmentFilterProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const ShipmentFilter = ({ activeTab, setActiveTab }: ShipmentFilterProps) => {
  return (
    <div className="mt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
      <div className="flex items-center overflow-x-auto whitespace-nowrap gap-2 pb-2 md:pb-0">
        {['all', 'in-transit', 'pending', 'delivered', 'delayed'].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              activeTab === tab 
                ? 'bg-logistics-blue text-white' 
                : 'bg-white dark:bg-logistics-dark/80 border border-border hover:bg-logistics-light-gray dark:hover:bg-white/5'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1).replace('-', ' ')}
          </button>
        ))}
      </div>
      
      <div className="flex items-center gap-2">
        <button className="btn-ghost flex items-center gap-1 text-sm h-9">
          <Filter className="size-4" />
          <span>Filter</span>
        </button>
        <button className="btn-ghost flex items-center gap-1 text-sm h-9">
          <SortAsc className="size-4" />
          <span>Sort</span>
        </button>
      </div>
    </div>
  );
};

export default ShipmentFilter;
