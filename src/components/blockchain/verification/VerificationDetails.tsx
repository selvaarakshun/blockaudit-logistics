
import { CheckCircle } from 'lucide-react';

interface VerificationDetailsProps {
  txHash: string;
}

const VerificationDetails = ({ txHash }: VerificationDetailsProps) => {
  const truncateHash = (hash: string) => {
    return `${hash.substring(0, 6)}...${hash.substring(hash.length - 4)}`;
  };

  return (
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
  );
};

export default VerificationDetails;
