
import { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import AuditTrailComponent from '@/components/AuditTrail';
import TimeframeSelector from './TimeframeSelector';
import AuditToolbar from './AuditToolbar';
import { AuditEvent } from '@/types/audit';
import { toast } from "@/components/ui/use-toast";
import { useAuditEvents } from '@/hooks/use-audit-events';

const AuditContent = () => {
  const [timeframe, setTimeframe] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { events, filteredEvents, filterEvents, loading, loadMore } = useAuditEvents();
  
  useEffect(() => {
    filterEvents(timeframe, searchQuery);
  }, [timeframe, searchQuery, filterEvents]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleLoadMore = () => {
    loadMore();
  };

  return (
    <motion.div 
      className="lg:col-span-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <AuditToolbar onSearch={handleSearch} />
      <TimeframeSelector timeframe={timeframe} setTimeframe={setTimeframe} />
      <AuditTrailComponent events={filteredEvents.length > 0 ? filteredEvents : events} />
      
      <div className="mt-8 flex items-center justify-center">
        <motion.button 
          className="btn-secondary flex items-center gap-1 rounded-xl shadow-subtle"
          onClick={handleLoadMore}
          disabled={loading}
          whileHover={{ y: -3 }}
          whileTap={{ y: 1 }}
        >
          <RefreshCw className={`size-4 ${loading ? 'animate-spin' : ''}`} />
          <span>{loading ? 'Loading...' : 'Load More Events'}</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default AuditContent;
