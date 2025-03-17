
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { ShieldCheck, Clock, CheckCircle, AlertCircle } from 'lucide-react';

type BlockchainVerificationStatus = 'loading' | 'verified' | 'unverified';

interface BlockchainVerificationProps {
  txHash?: string;
  timestamp?: string;
  status?: BlockchainVerificationStatus;
  className?: string;
}

const BlockchainVerification = ({
  txHash = '0x7f9a82a53b1a4372765c4463c3cc1de7b4c5e6c17799fbca3fb48f04b343f9c1',
  timestamp = '2023-05-14T09:23:45Z',
  status = 'verified',
  className
}: BlockchainVerificationProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const truncateHash = (hash: string) => {
    return `${hash.substring(0, 6)}...${hash.substring(hash.length - 4)}`;
  };

  return (
    <div 
      className={cn(
        "rounded-lg border border-border p-3 transition-all", 
        isExpanded ? "bg-white dark:bg-logistics-dark" : "bg-white/50 dark:bg-white/5",
        className
      )}
    >
      <div 
        className="flex items-center justify-between cursor-pointer select-none"
        onClick={handleToggle}
      >
        <div className="flex items-center gap-2">
          {status === 'loading' && (
            <div className="flex items-center justify-center size-6 bg-logistics-light-blue dark:bg-logistics-blue/10 rounded-full animate-pulse">
              <Clock className="size-3.5 text-logistics-blue" />
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

      {isExpanded && (
        <div className="mt-3 pt-3 border-t border-border animate-fade-in">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs text-logistics-gray">Transaction Hash</span>
              <span className="text-xs font-mono bg-logistics-light-gray dark:bg-white/5 rounded px-1.5 py-0.5">
                {truncateHash(txHash)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-logistics-gray">Block Number</span>
              <span className="text-xs font-mono">#4,832,651</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-logistics-gray">Consensus</span>
              <span className="text-xs font-medium text-logistics-success flex items-center gap-1">
                <CheckCircle className="size-3" />
                50 Confirmations
              </span>
            </div>
          </div>
          <a 
            href="#"
            className="mt-3 text-xs text-logistics-blue hover:underline block text-center"
            onClick={(e) => e.stopPropagation()}
          >
            View on Blockchain Explorer
          </a>
        </div>
      )}
    </div>
  );
};

export default BlockchainVerification;
