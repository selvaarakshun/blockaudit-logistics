
import { ArrowRightLeft } from 'lucide-react';
import { CrossChainTransaction } from '@/utils/interoperabilityUtils';

interface TransactionsListProps {
  transactions: CrossChainTransaction[];
}

const TransactionsList = ({ transactions }: TransactionsListProps) => {
  if (transactions.length === 0) {
    return (
      <div className="p-3 border rounded-lg text-sm text-gray-500">
        No recent transactions found
      </div>
    );
  }

  return (
    <div>
      <h3 className="font-medium mb-2">Recent Cross-Chain Transactions</h3>
      <div className="space-y-2">
        {transactions.map(transaction => (
          <div key={transaction.id} className="border rounded-lg p-3 hover:border-blue-200 transition-colors">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-medium">{transaction.assetType}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                transaction.status === 'completed' 
                  ? 'bg-green-100 text-green-800' 
                  : transaction.status === 'pending'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
              }`}>
                {transaction.status}
              </span>
            </div>
            <div className="flex items-center text-sm text-gray-500 gap-1">
              <span>{transaction.sourceChain}</span>
              <ArrowRightLeft className="h-3 w-3" />
              <span>{transaction.targetChain}</span>
            </div>
            <div className="text-xs text-gray-400 mt-1">
              {new Date(transaction.timestamp).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionsList;
