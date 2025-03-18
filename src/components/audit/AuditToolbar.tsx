
import { useState } from 'react';
import { Search, Filter, Calendar, X } from 'lucide-react';

interface AuditToolbarProps {
  onSearch: (query: string) => void;
}

const AuditToolbar = ({ onSearch }: AuditToolbarProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery('');
    onSearch('');
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
      <h1 className="text-2xl md:text-3xl font-bold">Audit Trail</h1>
      
      <div className="flex items-center gap-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-logistics-gray" />
          <input 
            type="text" 
            placeholder="Search audit events..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="pl-9 pr-9 py-2 rounded-md border border-border bg-white dark:bg-logistics-dark/80 shadow-subtle focus:outline-none focus:ring-2 focus:ring-logistics-blue focus:border-transparent w-full sm:w-auto"
          />
          {searchQuery && (
            <button 
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-logistics-gray hover:text-logistics-blue"
            >
              <X className="size-4" />
            </button>
          )}
        </div>
        
        <button 
          className={`btn-ghost flex items-center gap-1 h-9 ${showFilters ? 'text-logistics-blue' : ''}`}
          onClick={toggleFilters}
        >
          <Filter className="size-4" />
        </button>
        
        <button className="btn-ghost flex items-center gap-1 h-9">
          <Calendar className="size-4" />
        </button>
      </div>

      {showFilters && (
        <div className="w-full mt-4 p-4 bg-white dark:bg-logistics-dark/80 rounded-md border border-border shadow-subtle animate-in fade-in">
          <div className="text-sm font-medium mb-2">Filter Audit Events</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-logistics-gray mb-1 block">Event Type</label>
              <select className="w-full p-2 rounded-md border border-border bg-white dark:bg-logistics-dark/50">
                <option value="">All Types</option>
                <option value="document">Document</option>
                <option value="user">User</option>
                <option value="system">System</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-logistics-gray mb-1 block">Verification Status</label>
              <select className="w-full p-2 rounded-md border border-border bg-white dark:bg-logistics-dark/50">
                <option value="">All Statuses</option>
                <option value="verified">Verified</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuditToolbar;
