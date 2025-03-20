
import { ExternalLink } from 'lucide-react';

interface VerificationActionsProps {
  onVerify: (e: React.MouseEvent) => void;
  onViewExplorer: (e: React.MouseEvent) => void;
  isVerifying: boolean;
}

const VerificationActions = ({ 
  onVerify, 
  onViewExplorer, 
  isVerifying 
}: VerificationActionsProps) => {
  return (
    <div className="flex justify-between mt-3">
      <button 
        onClick={onVerify}
        className="text-xs text-logistics-blue hover:underline flex items-center"
        disabled={isVerifying}
      >
        {isVerifying ? 'Verifying...' : 'Verify Now'}
      </button>
      <button 
        onClick={onViewExplorer}
        className="text-xs text-logistics-blue hover:underline flex items-center gap-1"
      >
        View on Explorer
        <ExternalLink className="size-3" />
      </button>
    </div>
  );
};

export default VerificationActions;
