
import { Search, Filter, Calendar } from 'lucide-react';

const AuditToolbar = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
      <h1 className="text-2xl md:text-3xl font-bold">Audit Trail</h1>
      
      <div className="flex items-center gap-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-logistics-gray" />
          <input 
            type="text" 
            placeholder="Search audit events..."
            className="pl-9 pr-4 py-2 rounded-md border border-border bg-white dark:bg-logistics-dark/80 shadow-subtle focus:outline-none focus:ring-2 focus:ring-logistics-blue focus:border-transparent w-full sm:w-auto"
          />
        </div>
        
        <button className="btn-ghost flex items-center gap-1 h-9">
          <Filter className="size-4" />
        </button>
        
        <button className="btn-ghost flex items-center gap-1 h-9">
          <Calendar className="size-4" />
        </button>
      </div>
    </div>
  );
};

export default AuditToolbar;
