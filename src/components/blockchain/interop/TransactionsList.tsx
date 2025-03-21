
import { useState, useEffect } from 'react';
import { ArrowRightLeft, RefreshCw, ExternalLink, Filter } from 'lucide-react';
import { CrossChainTransaction } from '@/utils/interoperabilityUtils';
import { getStoredTransactions } from '@/utils/transactionsData';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface TransactionsListProps {
  transactions?: CrossChainTransaction[];
  limit?: number;
}

const TransactionsList = ({ transactions: propTransactions, limit }: TransactionsListProps) => {
  const [transactions, setTransactions] = useState<CrossChainTransaction[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Use transactions from props if provided, otherwise get from storage
    if (propTransactions) {
      setTransactions(limit ? propTransactions.slice(0, limit) : propTransactions);
      setLoading(false);
    } else {
      loadTransactions();
    }
  }, [propTransactions, limit]);

  const loadTransactions = () => {
    setLoading(true);
    // Small delay to simulate loading
    setTimeout(() => {
      const storedTransactions = getStoredTransactions();
      setTransactions(limit ? storedTransactions.slice(0, limit) : storedTransactions);
      setLoading(false);
    }, 500);
  };

  const refreshTransactions = () => {
    loadTransactions();
  };

  const handleViewTransaction = (txId: string) => {
    // In a real app, this would navigate to a transaction details page
    console.log(`Viewing transaction details for: ${txId}`);
    window.alert(`Viewing transaction ${txId} details. In a full implementation, this would open a transaction details page.`);
  };

  const filteredTransactions = statusFilter === 'all' 
    ? transactions 
    : transactions.filter(tx => tx.status === statusFilter);

  if (loading) {
    return (
      <div className="p-3 border rounded-lg text-sm text-gray-500 flex justify-center items-center h-32">
        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
        Loading transactions...
      </div>
    );
  }

  if (filteredTransactions.length === 0) {
    return (
      <div className="p-3 border rounded-lg text-sm text-gray-500">
        {statusFilter !== 'all' ? 
          `No transactions with "${statusFilter}" status found` : 
          "No recent transactions found"}
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-medium">Recent Cross-Chain Transactions</h3>
        <div className="flex gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="h-8 w-32">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
            </SelectContent>
          </Select>
          <Button 
            variant="outline" 
            size="sm" 
            className="h-8"
            onClick={refreshTransactions}
          >
            <RefreshCw className="h-3 w-3 mr-1" />
            Refresh
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        {filteredTransactions.map(transaction => (
          <div 
            key={transaction.id} 
            className="border rounded-lg p-3 hover:border-blue-200 transition-colors cursor-pointer"
            onClick={() => handleViewTransaction(transaction.id)}
          >
            <div className="flex items-center justify-between gap-2 mb-1">
              <div className="flex items-center gap-2">
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
              <span className="text-xs text-gray-500">
                {transaction.amount ? `${transaction.amount} units` : 'N/A'}
              </span>
            </div>
            <div className="flex items-center text-sm text-gray-500 gap-1">
              <span className="font-medium">{transaction.sourceChain}</span>
              <ArrowRightLeft className="h-3 w-3" />
              <span className="font-medium">{transaction.targetChain}</span>
            </div>
            <div className="flex justify-between mt-1">
              <div className="text-xs text-gray-400">
                {new Date(transaction.timestamp).toLocaleString()}
              </div>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <ExternalLink className="h-3 w-3" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionsList;
