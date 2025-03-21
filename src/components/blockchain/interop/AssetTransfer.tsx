import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { ArrowRightLeft, Loader2 } from 'lucide-react';
import { transferAsset, availableNetworks, getCrossChainFeeEstimate, CrossChainTransaction } from '@/utils/interoperabilityUtils';

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
    <div className="space-y-3">
      <div>
        <label className="text-sm font-medium">Source Network</label>
        <Select 
          value={sourceNetwork} 
          onValueChange={(value) => {
            setSourceNetwork(value);
            updateFeeEstimate();
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
            updateFeeEstimate();
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
            updateFeeEstimate();
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
        <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-md text-sm">
          <div className="flex justify-between">
            <span>Estimated fee:</span>
            <span className="font-medium">{feeEstimate.fee} {feeEstimate.currency}</span>
          </div>
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>Estimated time:</span>
            <span>{feeEstimate.estimatedTime}</span>
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
