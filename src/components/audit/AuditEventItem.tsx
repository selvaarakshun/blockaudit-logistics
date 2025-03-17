import { useState } from 'react';
import { Shield, AlertCircle, File, User, Clock, Download } from 'lucide-react';
import { cn } from '@/lib/utils';
import BlockchainVerification from '../BlockchainVerification';
import { AuditEvent } from '@/types/audit';

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

  return (
    <div 
      className="rounded-lg border border-border overflow-hidden bg-white dark:bg-logistics-dark/50 transition-all hover:shadow-subtle"
    >
      <div 
        className="p-4 cursor-pointer"
        onClick={toggleEventExpanded}
      >
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className={cn(
              "flex items-center justify-center size-10 rounded-md",
              getEventTypeColor(event.type)
            )}>
              {getEventIcon(event.type)}
            </div>
            <div>
              <h3 className="font-medium">{formatActionText(event.action)}</h3>
              <p className="text-sm text-logistics-gray">{formatDate(event.timestamp)}</p>
            </div>
          </div>
          <div className="flex items-center">
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
          </div>
        </div>
        
        <div className="mt-3 flex justify-between items-center">
          <span className="text-sm">
            <span className="text-logistics-gray">By</span> {event.user}
          </span>
        </div>

        <p className="mt-2 text-sm">{event.details}</p>
      </div>

      {isExpanded && (
        <div className="px-4 pb-4 pt-2 border-t border-border mt-2 animate-fade-in">
          <BlockchainVerification 
            status={event.verified ? 'verified' : 'loading'} 
            txHash={event.hash || '0x7f9a82a53b1a4372765c4463c3cc1de7b4c5e6c17799fbca3fb48f04b343f9c1'}
            timestamp={event.timestamp}
          />

          <div className="mt-4 flex items-center gap-2">
            <button className="btn-secondary text-xs h-8 flex items-center gap-1">
              <Download className="size-3" />
              <span>Download Evidence</span>
            </button>
            <button className="btn-ghost text-xs h-8">View Full Details</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuditEventItem;
