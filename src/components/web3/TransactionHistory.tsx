
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CircleDollarSign, ArrowUp, ArrowDown, Clock, CheckCircle, XCircle, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Mock transaction data
const transactions = [
  {
    id: 'tx1',
    type: 'outgoing',
    amount: '350.00',
    token: 'USDC',
    recipient: '0x1234...5678',
    timestamp: '2023-04-05T10:30:45Z',
    status: 'completed',
    hash: '0xabc...123',
  },
  {
    id: 'tx2',
    type: 'incoming',
    amount: '1,200.00',
    token: 'USDT',
    sender: '0x8765...4321',
    timestamp: '2023-04-04T14:20:10Z',
    status: 'completed',
    hash: '0xdef...456',
  },
  {
    id: 'tx3',
    type: 'outgoing',
    amount: '2,500.00',
    token: 'GuudzToken',
    recipient: '0x5678...9012',
    timestamp: '2023-04-03T09:15:30Z',
    status: 'pending',
    hash: '0xghi...789',
  },
  {
    id: 'tx4',
    type: 'outgoing',
    amount: '75.50',
    token: 'USDC',
    recipient: '0x3456...7890',
    timestamp: '2023-04-02T16:45:20Z',
    status: 'failed',
    hash: '0xjkl...012',
  },
  {
    id: 'tx5',
    type: 'incoming',
    amount: '500.00',
    token: 'GuudzToken',
    sender: '0x9012...3456',
    timestamp: '2023-04-01T11:05:40Z',
    status: 'completed',
    hash: '0xmno...345',
  },
];

const TransactionHistory = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  
  // Filter transactions based on search and filters
  const filteredTransactions = transactions.filter(tx => {
    // Search query filter
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = 
      tx.hash.toLowerCase().includes(searchLower) ||
      (tx.recipient && tx.recipient.toLowerCase().includes(searchLower)) ||
      (tx.sender && tx.sender.toLowerCase().includes(searchLower)) ||
      tx.token.toLowerCase().includes(searchLower);
    
    // Status filter
    const matchesStatus = statusFilter === 'all' || tx.status === statusFilter;
    
    // Type filter
    const matchesType = typeFilter === 'all' || tx.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });
  
  return (
    <Card className="bg-white dark:bg-logistics-dark/80 shadow-sm hover:shadow-md transition-shadow border-border rounded-xl">
      <CardHeader>
        <CardTitle>Transaction History</CardTitle>
        <CardDescription>View all your stablecoin transactions</CardDescription>
      </CardHeader>
      
      <div className="px-6 pb-2">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by hash or address"
              className="pl-9"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="incoming">Incoming</SelectItem>
                <SelectItem value="outgoing">Outgoing</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      
      <CardContent>
        <div className="rounded-lg border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-muted/50">
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Type</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Amount</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">From/To</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Date</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Hash</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredTransactions.length > 0 ? (
                  filteredTransactions.map((tx) => (
                    <tr 
                      key={tx.id} 
                      className={`
                        hover:bg-muted/30 transition-colors
                        ${tx.status === 'pending' ? 'transaction-pending' : ''}
                        ${tx.status === 'completed' ? 'transaction-success' : ''}
                        ${tx.status === 'failed' ? 'transaction-failed' : ''}
                      `}
                    >
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          {tx.type === 'outgoing' ? (
                            <ArrowUp className="h-4 w-4 text-red-500" />
                          ) : (
                            <ArrowDown className="h-4 w-4 text-green-500" />
                          )}
                          <span>{tx.type === 'outgoing' ? 'Sent' : 'Received'}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap font-medium">
                        <div className="flex items-center gap-1">
                          <span>{tx.amount}</span>
                          <span className="text-muted-foreground">{tx.token}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        {tx.type === 'outgoing' ? tx.recipient : tx.sender}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        {new Date(tx.timestamp).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <Badge
                          variant={
                            tx.status === 'completed' ? 'success' :
                            tx.status === 'pending' ? 'outline' : 'destructive'
                          }
                          className="flex items-center gap-1 w-fit"
                        >
                          {tx.status === 'completed' && <CheckCircle className="h-3 w-3" />}
                          {tx.status === 'pending' && <Clock className="h-3 w-3" />}
                          {tx.status === 'failed' && <XCircle className="h-3 w-3" />}
                          {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-mono">
                        <a 
                          href={`https://etherscan.io/tx/${tx.hash}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          {tx.hash}
                        </a>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
                      No transactions found matching your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionHistory;
