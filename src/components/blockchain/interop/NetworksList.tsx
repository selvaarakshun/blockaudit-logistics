
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, Network } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { connectToNetwork, availableNetworks, recentCrossChainTransactions } from '@/utils/interoperabilityUtils';
import TransactionsList from './TransactionsList';

interface NetworksListProps {
  selectedNetwork: string;
  setSelectedNetwork: (network: string) => void;
}

const NetworksList = ({ selectedNetwork, setSelectedNetwork }: NetworksListProps) => {
  const [isConnecting, setIsConnecting] = useState(false);

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

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {availableNetworks.map(network => (
          <div key={network.id} className="border rounded-lg p-3 hover:border-blue-300 transition-colors">
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
      
      <TransactionsList transactions={recentCrossChainTransactions.slice(0, 2)} />
    </div>
  );
};

export default NetworksList;
