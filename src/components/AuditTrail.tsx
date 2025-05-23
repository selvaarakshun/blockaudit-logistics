
import { cn } from '@/lib/utils';
import AuditEventItem from './audit/event/AuditEventItem';
import { AuditEvent } from '@/types/audit';

interface AuditTrailComponentProps {
  events: AuditEvent[];
  className?: string;
}

const AuditTrailComponent = ({ events, className }: AuditTrailComponentProps) => {
  return (
    <div className={cn("space-y-4", className)}>
      {events.length === 0 ? (
        <div className="text-center py-8 text-logistics-gray">
          No audit events found.
        </div>
      ) : (
        events.map((event) => (
          <AuditEventItem key={event.id} event={event} />
        ))
      )}
    </div>
  );
};

export default AuditTrailComponent;
