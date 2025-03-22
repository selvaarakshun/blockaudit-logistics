
import { CrossChainTransaction } from '@/utils/interoperabilityUtils';
import CreditInsuranceMetrics from './CreditInsuranceMetrics';
import TransferForm from './TransferForm';

interface AssetTransferProps {
  onTransactionCreated?: (transaction: CrossChainTransaction) => void;
}

const AssetTransfer = ({ onTransactionCreated }: AssetTransferProps) => {
  return (
    <div className="space-y-4">
      {/* Credit and Insurance Metrics */}
      <CreditInsuranceMetrics />
      
      {/* Transfer Form */}
      <TransferForm onTransactionCreated={onTransactionCreated} />
    </div>
  );
};

export default AssetTransfer;
