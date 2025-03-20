
import { useState } from 'react';
import { cn } from '@/lib/utils';
import VerificationHeader from './VerificationHeader';
import VerificationDetails from './VerificationDetails';
import VerificationActions from './VerificationActions';
import VerificationHistory from './VerificationHistory';
import { verifyDocumentOnChain, getDocumentHistory } from '@/utils/smartContractUtils';
import { toast } from '@/components/ui/use-toast';

export type BlockchainVerificationStatus = 'loading' | 'verified' | 'unverified';

export interface BlockchainVerificationProps {
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
      <VerificationHeader 
        status={status}
        timestamp={timestamp}
        onClick={handleToggle}
      />

      {isExpanded && (
        <div className="mt-3 pt-3 border-t border-border animate-fade-in">
          <VerificationDetails txHash={txHash} />
          
          {history.length > 0 && (
            <VerificationHistory history={history} />
          )}
          
          <VerificationActions 
            onVerify={handleVerifyNow}
            onViewExplorer={handleViewOnExplorer}
            isVerifying={isVerifying}
          />
        </div>
      )}
    </div>
  );
};

export default BlockchainVerification;
