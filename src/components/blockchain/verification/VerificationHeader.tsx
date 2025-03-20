
import { ShieldCheck, Clock, AlertCircle } from 'lucide-react';
import { BlockchainVerificationStatus } from './BlockchainVerification';

interface VerificationHeaderProps {
  status: BlockchainVerificationStatus;
  timestamp: string;
  onClick: () => void;
}

const VerificationHeader = ({ status, timestamp, onClick }: VerificationHeaderProps) => {
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
    <div 
      className="flex items-center justify-between cursor-pointer select-none"
      onClick={onClick}
    >
      <div className="flex items-center gap-2">
        {status === 'loading' && (
          <div className="flex items-center justify-center size-6 bg-logistics-light-blue dark:bg-logistics-blue/10 rounded-full">
            <Clock className="size-3.5 text-logistics-blue animate-spin" />
          </div>
        )}
        {status === 'verified' && (
          <div className="flex items-center justify-center size-6 bg-logistics-success/10 rounded-full">
            <ShieldCheck className="size-3.5 text-logistics-success" />
          </div>
        )}
        {status === 'unverified' && (
          <div className="flex items-center justify-center size-6 bg-logistics-warning/10 rounded-full">
            <AlertCircle className="size-3.5 text-logistics-warning" />
          </div>
        )}
        <span className="text-sm font-medium">
          {status === 'loading' && 'Verifying on blockchain...'}
          {status === 'verified' && 'Blockchain Verified'}
          {status === 'unverified' && 'Verification Failed'}
        </span>
      </div>
      <span className="text-xs text-logistics-gray">
        {formatTimestamp(timestamp)}
      </span>
    </div>
  );
};

export default VerificationHeader;
