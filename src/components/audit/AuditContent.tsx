
import { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import AuditTrailComponent from '@/components/AuditTrail';
import TimeframeSelector from './TimeframeSelector';
import AuditToolbar from './AuditToolbar';
import { AuditEvent } from '@/types/audit';
import { toast } from "@/components/ui/use-toast";

const AuditContent = () => {
  const [timeframe, setTimeframe] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredEvents, setFilteredEvents] = useState<AuditEvent[]>([]);
  const [loading, setLoading] = useState(false);
  
  const auditEvents: AuditEvent[] = [
    {
      id: '1',
      type: 'document' as const,
      action: 'document uploaded',
      timestamp: '2023-05-14T15:30:45Z',
      user: 'John Doe',
      details: 'Bill of Lading #BOL-12345 uploaded and verified on blockchain',
      verified: true,
      hash: '0x7f9a82a53b1a4372765c4463c3cc1de7b4c5e6c17799fbca3fb48f04b343f9c1'
    },
    {
      id: '2',
      type: 'user' as const,
      action: 'access granted',
      timestamp: '2023-05-14T12:15:22Z',
      user: 'Jane Smith',
      details: 'Access granted to Shipment SHP-87654321 for auditor review',
      verified: true,
      hash: '0x3a5b7c9d0f2e4a6c8b0d2f4e6a8c0d2f4e6a8c0d2f4e6a8c0d2f4e6a8c0d2f4'
    },
    {
      id: '3',
      type: 'system' as const,
      action: 'compliance check completed',
      timestamp: '2023-05-13T09:42:18Z',
      user: 'System',
      details: 'Automated compliance check passed for Shipment SHP-12345678',
      verified: true,
      hash: '0x1d3f5b7c9e1f3d5b7c9e1f3d5b7c9e1f3d5b7c9e1f3d5b7c9e1f3d5b7c9e1f3'
    },
    {
      id: '4',
      type: 'document' as const,
      action: 'document signed',
      timestamp: '2023-05-13T08:12:55Z',
      user: 'Robert Johnson',
      details: 'Customs Declaration Form #CDF-98765 digitally signed',
      verified: false
    },
    {
      id: '5',
      type: 'system' as const,
      action: 'blockchain verification',
      timestamp: '2023-05-12T14:25:33Z',
      user: 'System',
      details: 'Package location verified via IoT sensor data for Shipment SHP-34567890',
      verified: true,
      hash: '0x9e8d7c6b5a4f3e2d1c0b9a8f7e6d5c4b3a2f1e0d9c8b7a6f5e4d3c2b1a0f9e8d'
    }
  ];

  useEffect(() => {
    filterEvents();
  }, [timeframe, searchQuery]);

  const filterEvents = () => {
    let filtered = [...auditEvents];
    
    // Filter by timeframe
    if (timeframe !== 'all') {
      const now = new Date();
      let startDate = new Date();
      
      if (timeframe === 'today') {
        startDate.setHours(0, 0, 0, 0);
      } else if (timeframe === 'this week') {
        const day = now.getDay() || 7;
        startDate.setDate(now.getDate() - day + 1);
        startDate.setHours(0, 0, 0, 0);
      } else if (timeframe === 'this month') {
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      }
      
      filtered = filtered.filter(event => new Date(event.timestamp) >= startDate);
    }
    
    // Filter by search query
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(event => 
        event.action.toLowerCase().includes(query) ||
        event.user.toLowerCase().includes(query) ||
        event.details.toLowerCase().includes(query)
      );
    }
    
    setFilteredEvents(filtered);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleLoadMore = () => {
    setLoading(true);
    // Simulate loading more data
    setTimeout(() => {
      toast({
        title: "No more audit events",
        description: "All available audit events have been loaded.",
      });
      setLoading(false);
    }, 1000);
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
      <AuditTrailComponent events={filteredEvents.length > 0 ? filteredEvents : auditEvents} />
      
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
