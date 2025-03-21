
import { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { ArrowRightLeft, Loader2, Shield, Star, BarChart3 } from 'lucide-react';
import { 
  transferAsset, 
  availableNetworks, 
  getCrossChainFeeEstimate, 
  CrossChainTransaction 
} from '@/utils/interoperabilityUtils';
import { 
  getCreditScore, 
  getAvailablePolicies 
} from '@/utils/insuranceCreditUtils';
import { Card, CardContent } from '@/components/ui/card';

interface AssetTransferProps {
  onTransactionCreated?: (transaction: CrossChainTransaction) => void;
}

const AssetTransfer = ({ onTransactionCreated }: AssetTransferProps) => {
  const [sourceNetwork, setSourceNetwork] = useState('guudzchain');
  const [targetNetwork, setTargetNetwork] = useState('');
  const [assetType, setAssetType] = useState('document');
  const [assetId, setAssetId] = useState('');
  const [amount, setAmount] = useState('');
  const [isTransferring, setIsTransferring] = useState(false);
  const [feeEstimate, setFeeEstimate] = useState<{ fee: string; currency: string; estimatedTime: string } | null>(null);
  const [creditScore, setCreditScore] = useState<{ score: number; riskLevel: string } | null>(null);
  const [hasInsurance, setHasInsurance] = useState<boolean | null>(null);
  const [isLoadingMetrics, setIsLoadingMetrics] = useState(false);

  useEffect(() => {
    // Load credit score and insurance availability on component mount
    const loadEntityMetrics = async () => {
      setIsLoadingMetrics(true);
      try {
        // Get credit score for the entity
        const score = await getCreditScore('entity1');
        setCreditScore({ 
          score: score.score,
          riskLevel: score.riskLevel
        });
        
        // Check if there are active insurance policies
        const policies = getAvailablePolicies();
        const activePolicies = policies.filter(policy => policy.status === 'active');
        setHasInsurance(activePolicies.length > 0);
      } catch (error) {
        console.error('Error loading entity metrics:', error);
      } finally {
        setIsLoadingMetrics(false);
      }
    };
    
    loadEntityMetrics();
  }, []);

  useEffect(() => {
    // Update fee estimate when transfer parameters change
    if (sourceNetwork && targetNetwork && assetType) {
      updateFeeEstimate();
    }
  }, [sourceNetwork, targetNetwork, assetType]);

  const updateFeeEstimate = async () => {
    if (sourceNetwork && targetNetwork && assetType) {
      try {
        const estimate = await getCrossChainFeeEstimate(sourceNetwork, targetNetwork, assetType);
        setFeeEstimate(estimate);
      } catch (error) {
        setFeeEstimate(null);
      }
    } else {
      setFeeEstimate(null);
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
      
      // Call the callback if provided
      if (onTransactionCreated) {
        onTransactionCreated(result);
      }
      
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

  return (
    <div className="space-y-4">
      {/* Credit and Insurance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-2">
        <Card className="bg-white/50 dark:bg-logistics-dark/50 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="size-10 bg-logistics-light-blue/30 dark:bg-logistics-blue/20 rounded-full flex items-center justify-center">
                <Star className="size-5 text-logistics-blue" />
              </div>
              <div>
                <h4 className="text-sm font-medium">Credit Score</h4>
                {isLoadingMetrics ? (
                  <div className="text-sm text-gray-400">Loading...</div>
                ) : creditScore ? (
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-semibold">{creditScore.score}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      creditScore.riskLevel === 'low' ? 'bg-green-100 text-green-600' : 
                      creditScore.riskLevel === 'medium' ? 'bg-yellow-100 text-yellow-600' : 
                      'bg-red-100 text-red-600'
                    }`}>
                      {creditScore.riskLevel.toUpperCase()}
                    </span>
                  </div>
                ) : (
                  <div className="text-sm text-gray-400">Not available</div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/50 dark:bg-logistics-dark/50 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="size-10 bg-logistics-light-blue/30 dark:bg-logistics-blue/20 rounded-full flex items-center justify-center">
                <Shield className="size-5 text-logistics-blue" />
              </div>
              <div>
                <h4 className="text-sm font-medium">Insurance Status</h4>
                {isLoadingMetrics ? (
                  <div className="text-sm text-gray-400">Loading...</div>
                ) : hasInsurance !== null ? (
                  <div className="flex items-center gap-2">
                    <span className={`text-sm px-2 py-0.5 rounded-full ${
                      hasInsurance ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                    }`}>
                      {hasInsurance ? 'ACTIVE COVERAGE' : 'NO COVERAGE'}
                    </span>
                  </div>
                ) : (
                  <div className="text-sm text-gray-400">Not available</div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <label className="text-sm font-medium">Source Network</label>
        <Select 
          value={sourceNetwork} 
          onValueChange={(value) => {
            setSourceNetwork(value);
          }}
        >
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
        <Select 
          value={targetNetwork} 
          onValueChange={(value) => {
            setTargetNetwork(value);
          }}
        >
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
        <Select 
          value={assetType} 
          onValueChange={(value) => {
            setAssetType(value);
          }}
        >
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
      
      {feeEstimate && (
        <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md text-sm">
          <div className="flex justify-between items-center">
            <span className="font-medium">Transfer Details</span>
            <BarChart3 className="size-4 text-blue-500" />
          </div>
          <div className="mt-2 space-y-1">
            <div className="flex justify-between">
              <span>Estimated fee:</span>
              <span className="font-medium">{feeEstimate.fee} {feeEstimate.currency}</span>
            </div>
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>Estimated time:</span>
              <span>{feeEstimate.estimatedTime}</span>
            </div>
          </div>
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
    </div>
  );
};

export default AssetTransfer;
