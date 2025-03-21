
import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2, Server } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { connectToFabric, availableFabricNetworks } from '@/utils/hyperledgerFabricUtils';

interface NetworkSelectorProps {
  onConnect: (isConnected: boolean) => void;
}

const NetworkSelector = ({ onConnect }: NetworkSelectorProps) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState<string>('');
  const [channelName, setChannelName] = useState('mychannel');
  const [orgName, setOrgName] = useState('Org1');
  
  const handleConnect = async () => {
    if (!selectedNetwork || !channelName || !orgName) {
      toast({
        title: "Missing Information",
        description: "Please fill out all required fields",
        variant: "destructive"
      });
      return;
    }
    
    setIsConnecting(true);
    
    try {
      const connection = await connectToFabric(channelName, selectedNetwork, orgName);
      
      onConnect(true);
      toast({
        title: "Connection Successful",
        description: `Connected to ${selectedNetwork} as ${orgName}`,
      });
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: "Failed to connect to Hyperledger Fabric network",
        variant: "destructive"
      });
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className="space-y-3">
      <div>
        <label className="text-sm font-medium">Network</label>
        <Select value={selectedNetwork} onValueChange={setSelectedNetwork} disabled={isConnecting}>
          <SelectTrigger>
            <SelectValue placeholder="Select Fabric network" />
          </SelectTrigger>
          <SelectContent>
            {availableFabricNetworks.map(network => (
              <SelectItem key={network.id} value={network.id}>
                {network.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-sm font-medium">Channel</label>
          <Input
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
            disabled={isConnecting}
          />
        </div>
        
        <div>
          <label className="text-sm font-medium">Organization</label>
          <Input
            value={orgName}
            onChange={(e) => setOrgName(e.target.value)}
            disabled={isConnecting}
          />
        </div>
      </div>
      
      <Button 
        onClick={handleConnect} 
        className="w-full" 
        disabled={isConnecting}
      >
        {isConnecting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Connecting...
          </>
        ) : (
          <>
            <Server className="mr-2 h-4 w-4" />
            Connect
          </>
        )}
      </Button>
    </div>
  );
};

export default NetworkSelector;
