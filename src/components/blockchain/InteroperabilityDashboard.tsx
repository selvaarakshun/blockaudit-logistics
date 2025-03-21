
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/components/ui/use-toast';
import { Network, ArrowRightLeft, GitBranch, Check, Loader2 } from 'lucide-react';
import { 
  availableNetworks, 
  connectToNetwork, 
  transferAsset, 
  verifyDocumentAcrossChains,
  recentCrossChainTransactions
} from '@/utils/interoperabilityUtils';

const InteroperabilityDashboard = () => {
  const [activeTab, setActiveTab] = useState('networks');
  const [isConnecting, setIsConnecting] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState<string>('');
  
  // Asset transfer state
  const [sourceNetwork, setSourceNetwork] = useState('guudzchain');
  const [targetNetwork, setTargetNetwork] = useState('');
  const [assetType, setAssetType] = useState('document');
  const [assetId, setAssetId] = useState('');
  const [amount, setAmount] = useState('');
  const [isTransferring, setIsTransferring] = useState(false);
  
  // Document verification state
  const [documentHash, setDocumentHash] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResults, setVerificationResults] = useState<Record<string, boolean> | null>(null);

  const handleConnectNetwork = async () => {
    if (!selectedNetwork) {
      toast({
        title: "Select Network",
        description: "Please select a network to connect",
        variant: "destructive"
      });
      return;
    }
    
    setIsConnecting(true);
    
    try {
      const network = await connectToNetwork(selectedNetwork);
      
      if (network) {
        toast({
          title: "Connection Successful",
          description: `Connected to ${network.name}`,
        });
      } else {
        toast({
          title: "Connection Failed",
          description: "Failed to connect to the selected network",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: "An error occurred while connecting to the network",
        variant: "destructive"
      });
    } finally {
      setIsConnecting(false);
    }
  };
  
  const handleTransferAsset = async () => {
    if (!sourceNetwork || !targetNetwork || !assetType || !assetId) {
      toast({
        title: "Missing Information",
        description: "Please fill out all required fields",
        variant: "destructive"
      });
      return;
    }
    
    setIsTransferring(true);
    
    try {
      const result = await transferAsset(
        sourceNetwork,
        targetNetwork,
        assetType,
        assetId,
        amount || undefined
      );
      
      toast({
        title: "Transfer Successful",
        description: `Asset transferred from ${sourceNetwork} to ${targetNetwork}`,
      });
      
      // Reset form
      setAssetId('');
      setAmount('');
    } catch (error) {
      toast({
        title: "Transfer Failed",
        description: "Failed to transfer asset between chains",
        variant: "destructive"
      });
    } finally {
      setIsTransferring(false);
    }
  };
  
  const handleVerifyDocument = async () => {
    if (!documentHash) {
      toast({
        title: "Missing Hash",
        description: "Please enter a document hash to verify",
        variant: "destructive"
      });
      return;
    }
    
    setIsVerifying(true);
    setVerificationResults(null);
    
    try {
      const results = await verifyDocumentAcrossChains(documentHash);
      setVerificationResults(results);
      
      const verifiedCount = Object.values(results).filter(Boolean).length;
      
      toast({
        title: "Verification Complete",
        description: `Document verified on ${verifiedCount} out of ${Object.keys(results).length} chains`,
      });
    } catch (error) {
      toast({
        title: "Verification Failed",
        description: "Failed to verify document across chains",
        variant: "destructive"
      });
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="bg-gray-50 dark:bg-gray-900 rounded-t-lg">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Network className="h-5 w-5 text-blue-500" />
          Blockchain Interoperability
        </CardTitle>
        <CardDescription>
          Transfer assets between different blockchain networks
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 w-full mb-4">
            <TabsTrigger value="networks">Networks</TabsTrigger>
            <TabsTrigger value="transfer">Cross-Chain Transfer</TabsTrigger>
            <TabsTrigger value="verify">Verify Document</TabsTrigger>
          </TabsList>
          
          <TabsContent value="networks" className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {availableNetworks.map(network => (
                <div key={network.id} className="border rounded-lg p-3">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">{network.name}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      network.isConnected 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400'
                    }`}>
                      {network.isConnected ? 'Connected' : 'Disconnected'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mb-2">Type: {network.type}</p>
                  
                  {!network.isConnected && (
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => setSelectedNetwork(network.id)}
                      className="w-full"
                    >
                      Select
                    </Button>
                  )}
                </div>
              ))}
            </div>
            
            {selectedNetwork && (
              <div className="p-3 border rounded-lg">
                <h3 className="font-medium mb-2">
                  Connect to {availableNetworks.find(n => n.id === selectedNetwork)?.name}
                </h3>
                <Button 
                  onClick={handleConnectNetwork} 
                  disabled={isConnecting}
                  className="w-full"
                >
                  {isConnecting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Connecting...
                    </>
                  ) : (
                    <>
                      <Network className="mr-2 h-4 w-4" />
                      Connect
                    </>
                  )}
                </Button>
              </div>
            )}
            
            <div>
              <h3 className="font-medium mb-2">Recent Cross-Chain Transactions</h3>
              <div className="space-y-2">
                {recentCrossChainTransactions.slice(0, 2).map(transaction => (
                  <div key={transaction.id} className="border rounded-lg p-3">
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
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="transfer" className="space-y-3">
            <div>
              <label className="text-sm font-medium">Source Network</label>
              <Select value={sourceNetwork} onValueChange={setSourceNetwork}>
                <SelectTrigger>
                  <SelectValue placeholder="Select source network" />
                </SelectTrigger>
                <SelectContent>
                  {availableNetworks.filter(n => n.isConnected).map(network => (
                    <SelectItem key={network.id} value={network.id}>
                      {network.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium">Target Network</label>
              <Select value={targetNetwork} onValueChange={setTargetNetwork}>
                <SelectTrigger>
                  <SelectValue placeholder="Select target network" />
                </SelectTrigger>
                <SelectContent>
                  {availableNetworks.map(network => (
                    <SelectItem key={network.id} value={network.id} disabled={network.id === sourceNetwork}>
                      {network.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium">Asset Type</label>
              <Select value={assetType} onValueChange={setAssetType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select asset type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="document">Document</SelectItem>
                  <SelectItem value="token">Token</SelectItem>
                  <SelectItem value="nft">NFT</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium">Asset ID / Hash</label>
              <Input
                value={assetId}
                onChange={(e) => setAssetId(e.target.value)}
                placeholder="Enter asset ID or document hash"
              />
            </div>
            
            {assetType === 'token' && (
              <div>
                <label className="text-sm font-medium">Amount</label>
                <Input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount to transfer"
                />
              </div>
            )}
            
            <Button 
              onClick={handleTransferAsset} 
              className="w-full" 
              disabled={isTransferring || !sourceNetwork || !targetNetwork}
            >
              {isTransferring ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Transferring...
                </>
              ) : (
                <>
                  <ArrowRightLeft className="mr-2 h-4 w-4" />
                  Transfer Asset
                </>
              )}
            </Button>
          </TabsContent>
          
          <TabsContent value="verify" className="space-y-3">
            <div>
              <label className="text-sm font-medium">Document Hash</label>
              <Input
                value={documentHash}
                onChange={(e) => setDocumentHash(e.target.value)}
                placeholder="Enter document hash to verify across chains"
              />
            </div>
            
            <Button 
              onClick={handleVerifyDocument} 
              className="w-full" 
              disabled={isVerifying || !documentHash}
            >
              {isVerifying ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                <>
                  <GitBranch className="mr-2 h-4 w-4" />
                  Verify Across Chains
                </>
              )}
            </Button>
            
            {verificationResults && (
              <div className="space-y-2">
                <h3 className="font-medium text-sm">Verification Results:</h3>
                {Object.entries(verificationResults).map(([chain, verified]) => (
                  <div key={chain} className="flex items-center justify-between border rounded p-2">
                    <span className="text-sm">{chain}</span>
                    <span className={`flex items-center gap-1 text-sm ${
                      verified 
                        ? 'text-green-600' 
                        : 'text-red-600'
                    }`}>
                      {verified ? (
                        <>
                          <Check className="h-4 w-4" />
                          Verified
                        </>
                      ) : (
                        'Not Found'
                      )}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default InteroperabilityDashboard;
