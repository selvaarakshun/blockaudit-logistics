
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Network, ArrowLeftRight, FileText, Plus, BarChart } from 'lucide-react';
import TransactionsList from './interop/TransactionsList';
import NetworksList from './interop/NetworksList';
import AssetTransfer from './interop/AssetTransfer';
import DocumentVerifier from './interop/DocumentVerifier';
import { getStoredTransactions, addTransaction } from '@/utils/transactionsData';
import { CrossChainTransaction } from '@/utils/interoperabilityUtils';
import BlockchainAnimation from './BlockchainAnimation';

const InteroperabilityDashboard = () => {
  const [transactions, setTransactions] = useState<CrossChainTransaction[]>([]);
  const [activeTab, setActiveTab] = useState('transactions');
  const [showAnimation, setShowAnimation] = useState(true);
  const [selectedNetwork, setSelectedNetwork] = useState<string>('');

  useEffect(() => {
    const storedTransactions = getStoredTransactions();
    setTransactions(storedTransactions);
  }, []);

  const handleNewTransaction = (transaction: CrossChainTransaction) => {
    const updatedTransactions = addTransaction(transaction);
    setTransactions(updatedTransactions);
  };

  return (
    <Card className="relative">
      {showAnimation && (
        <div className="absolute inset-0 overflow-hidden" style={{ zIndex: -1 }}>
          <BlockchainAnimation />
        </div>
      )}
      
      <CardHeader className={showAnimation ? "bg-gray-900/90 text-white" : "bg-white dark:bg-gray-800"}>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Network className="h-5 w-5 text-blue-500" />
            <CardTitle>Cross-Chain Interoperability</CardTitle>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAnimation(!showAnimation)}
            className={showAnimation ? "text-white hover:bg-white/20" : ""}
          >
            {showAnimation ? "Hide Animation" : "Show Animation"}
          </Button>
        </div>
        <CardDescription className={showAnimation ? "text-gray-300" : ""}>
          Transfer assets and verify documents across multiple blockchain networks
        </CardDescription>
      </CardHeader>
      
      <CardContent className={`p-4 ${showAnimation ? "bg-gray-900/90 text-white" : ""}`}>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="transactions" className="flex items-center gap-2">
              <ArrowLeftRight className="h-4 w-4" />
              <span>Transactions</span>
            </TabsTrigger>
            <TabsTrigger value="networks" className="flex items-center gap-2">
              <Network className="h-4 w-4" />
              <span>Networks</span>
            </TabsTrigger>
            <TabsTrigger value="transfer" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              <span>New Transfer</span>
            </TabsTrigger>
            <TabsTrigger value="documents" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span>Documents</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="transactions" className="mt-0">
            <TransactionsList transactions={transactions} />
          </TabsContent>
          
          <TabsContent value="networks" className="mt-0">
            <NetworksList 
              selectedNetwork={selectedNetwork} 
              setSelectedNetwork={setSelectedNetwork} 
            />
          </TabsContent>
          
          <TabsContent value="transfer" className="mt-0">
            <AssetTransfer 
              onTransactionCreated={handleNewTransaction} 
            />
          </TabsContent>
          
          <TabsContent value="documents" className="mt-0">
            <DocumentVerifier />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default InteroperabilityDashboard;
