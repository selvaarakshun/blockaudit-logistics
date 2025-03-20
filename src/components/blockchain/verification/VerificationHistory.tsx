
interface HistoryItem {
  action: string;
  timestamp: string;
  actor: string;
}

interface VerificationHistoryProps {
  history: HistoryItem[];
}

const VerificationHistory = ({ history }: VerificationHistoryProps) => {
  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="mt-3">
      <span className="text-xs text-logistics-gray block mb-2">Document History</span>
      <div className="space-y-2">
        {history.map((event, idx) => (
          <div key={idx} className="flex justify-between items-center text-xs">
            <span className="capitalize">{event.action.replace('_', ' ')}</span>
            <div className="flex flex-col items-end">
              <span className="text-logistics-gray">{formatTimestamp(event.timestamp)}</span>
              <span className="text-logistics-blue">{event.actor}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VerificationHistory;
