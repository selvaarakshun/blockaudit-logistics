
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { ShieldCheck, Clock, CheckCircle, AlertCircle, ExternalLink } from 'lucide-react';
import { verifyDocumentOnChain, getDocumentHistory } from '@/utils/smartContractUtils';
import { toast } from '@/components/ui/use-toast';

type BlockchainVerificationStatus = 'loading' | 'verified' | 'unverified';

interface BlockchainVerificationProps {
  txHash?: string;
  timestamp?: string;
  status?: BlockchainVerificationStatus;
  className?: string;
  docId?: string;
  onVerify?: (verified: boolean) => void;
}

const BlockchainVerification = ({
  txHash = '0x7f9a82a53b1a4372765c4463c3cc1de7b4c5e6c17799fbca3fb48f04b343f9c1',
  timestamp = '2023-05-14T09:23:45Z',
  status: initialStatus = 'verified',
  className,
  docId,
  onVerify
}: BlockchainVerificationProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [status, setStatus] = useState<BlockchainVerificationStatus>(initialStatus);
  const [history, setHistory] = useState<Array<{ action: string; timestamp: string; actor: string }>>([]);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
    
    // Fetch document history when expanding
    if (!isExpanded && docId && history.length === 0) {
      fetchDocumentHistory();
    }
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
  
  const fetchDocumentHistory = async () => {
    if (!docId) return;
    
    try {
      const historyData = await getDocumentHistory(docId);
      setHistory(historyData);
    } catch (error) {
      console.error("Failed to fetch document history:", error);
    }
  };
  
  const handleVerifyNow = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!txHash || isVerifying) return;
    
    setIsVerifying(true);
    setStatus('loading');
    
    try {
      const isVerified = await verifyDocumentOnChain(txHash);
      setStatus(isVerified ? 'verified' : 'unverified');
      
      if (onVerify) {
        onVerify(isVerified);
      }
      
      toast({
        title: isVerified ? "Document Verified" : "Verification Failed",
        description: isVerified 
          ? "The document has been successfully verified on the blockchain." 
          : "We couldn't verify this document. Please check the hash and try again.",
        variant: isVerified ? "default" : "destructive"
      });
    } catch (error) {
      setStatus('unverified');
      toast({
        title: "Verification Error",
        description: "An error occurred during verification. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsVerifying(false);
    }
  };
  
  const handleViewOnExplorer = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Open a new tab with the blockchain explorer
    window.open(`https://explorer.guudzchain.com/tx/${txHash}`, '_blank');
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
            
            {history.length > 0 && (
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
            )}
          </div>
          
          <div className="flex justify-between mt-3">
            <button 
              onClick={handleVerifyNow}
              className="text-xs text-logistics-blue hover:underline flex items-center"
              disabled={isVerifying}
            >
              {isVerifying ? 'Verifying...' : 'Verify Now'}
            </button>
            <button 
              onClick={handleViewOnExplorer}
              className="text-xs text-logistics-blue hover:underline flex items-center gap-1"
            >
              View on Explorer
              <ExternalLink className="size-3" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlockchainVerification;
