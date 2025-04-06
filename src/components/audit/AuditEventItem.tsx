
import { useState } from 'react';
import { Shield, AlertCircle, File, User, Clock, Download, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import BlockchainVerification from '../blockchain/verification';
import { AuditEvent } from '@/types/audit';
import { toast } from "@/components/ui/use-toast";

interface AuditEventItemProps {
  event: AuditEvent;
}

const AuditEventItem = ({ event }: AuditEventItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleEventExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'document':
        return <File className="size-4" />;
      case 'user':
        return <User className="size-4" />;
      case 'system':
        return <Clock className="size-4" />;
      default:
        return <AlertCircle className="size-4" />;
    }
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'document':
        return 'bg-logistics-blue/10 text-logistics-blue';
      case 'user':
        return 'bg-logistics-indigo/10 text-logistics-indigo';
      case 'system':
        return 'bg-logistics-gray/10 text-logistics-gray';
      default:
        return 'bg-logistics-gray/10 text-logistics-gray';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatActionText = (action: string) => {
    return action.charAt(0).toUpperCase() + action.slice(1);
  };

  const handleDownloadEvidence = () => {
    toast({
      title: "Download Started",
      description: `Downloading evidence for ${event.action}`,
    });
  };

  const handleViewDetails = () => {
    toast({
      title: "Full Details",
      description: `Viewing full details for ${event.action}`,
    });
  };

  return (
    <motion.div 
      className="rounded-2xl border border-border overflow-hidden bg-white dark:bg-logistics-dark/50 transition-all hover:shadow-medium"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div 
        className="p-4 cursor-pointer"
        onClick={toggleEventExpanded}
      >
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className={cn(
              "flex items-center justify-center size-10 rounded-xl",
              getEventTypeColor(event.type)
            )}>
              {getEventIcon(event.type)}
            </div>
            <div>
              <h3 className="font-medium">{formatActionText(event.action)}</h3>
              <p className="text-sm text-logistics-gray">{formatDate(event.timestamp)}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {event.verified ? (
              <div className="flex items-center gap-1 text-xs text-logistics-success bg-logistics-success/10 px-2 py-1 rounded-full">
                <Shield className="size-3" />
                <span>Verified</span>
              </div>
            ) : (
              <div className="flex items-center gap-1 text-xs text-logistics-warning bg-logistics-warning/10 px-2 py-1 rounded-full">
                <AlertCircle className="size-3" />
                <span>Pending</span>
              </div>
            )}
            {isExpanded ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
          </div>
        </div>
        
        <div className="mt-3 flex justify-between items-center">
          <span className="text-sm">
            <span className="text-logistics-gray">By</span> {event.user}
          </span>
        </div>

        <p className="mt-2 text-sm">{event.details}</p>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div 
            className="px-4 pb-4 pt-2 border-t border-border mt-2"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <BlockchainVerification 
              status={event.verified ? 'verified' : 'loading'} 
              txHash={event.hash || '0x7f9a82a53b1a4372765c4463c3cc1de7b4c5e6c17799fbca3fb48f04b343f9c1'}
              timestamp={event.timestamp}
            />

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <motion.button 
                className="btn-secondary text-xs h-8 flex items-center gap-1 rounded-xl"
                onClick={handleDownloadEvidence}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Download className="size-3" />
                <span>Download Evidence</span>
              </motion.button>
              <motion.button 
                className="btn-ghost text-xs h-8 rounded-xl"
                onClick={handleViewDetails}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Full Details
              </motion.button>
              {event.hash && (
                <motion.a 
                  href={`/blockchain-explorer?hash=${event.hash}`}
                  className="btn-ghost text-xs h-8 flex items-center gap-1 text-logistics-blue rounded-xl"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ExternalLink className="size-3" />
                  <span>View on Blockchain</span>
                </motion.a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AuditEventItem;
