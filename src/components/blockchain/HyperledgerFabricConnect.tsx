
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Server, Database, NetworkIcon, AlertCircle } from 'lucide-react';
import NetworkSelector from './fabric/NetworkSelector';
import ChaincodeExecutor from './fabric/ChaincodeExecutor';
import FabricNetworkStatus from './fabric/FabricNetworkStatus';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { availableFabricNetworks } from '@/utils/hyperledgerFabricUtils';

const HyperledgerFabricConnect = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState<string>('');
  const [networkDetails, setNetworkDetails] = useState<any>(null);
  const [showHelp, setShowHelp] = useState(false);

  const handleConnect = (connected: boolean, networkId?: string) => {
    setIsConnected(connected);
    
    if (connected && networkId) {
      setSelectedNetwork(networkId);
      
      // Get network details
      const network = availableFabricNetworks.find(n => n.id === networkId);
      if (network) {
        setNetworkDetails(network);
        toast({
          title: "Network Connected",
          description: `Successfully connected to ${network.name}`,
        });
      }
    } else {
      setSelectedNetwork('');
      setNetworkDetails(null);
    }
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setSelectedNetwork('');
    setNetworkDetails(null);
    toast({
      title: "Network Disconnected",
      description: "You have been disconnected from the Hyperledger Fabric network."
    });
  };

  const connectionGuide = (
    <div className="text-sm space-y-3 bg-gray-50 dark:bg-gray-900 p-3 rounded-md">
      <h3 className="font-medium text-blue-600">How to connect to Hyperledger Fabric</h3>
      <ol className="list-decimal list-inside space-y-2">
        <li>Select a Fabric network from the dropdown</li>
        <li>Enter the channel name (default: mychannel)</li>
        <li>Enter your organization name (default: Org1)</li>
        <li>Click Connect to establish connection</li>
        <li>Once connected, you can execute chaincode functions</li>
      </ol>
      <div className="pt-2">
        <p className="text-gray-600 dark:text-gray-400">
          For local development, make sure Hyperledger Fabric is running. Check our <span className="text-blue-600">documentation</span> for more details.
        </p>
      </div>
    </div>
  );

  return (
    <Card className="shadow-sm">
      <CardHeader className="bg-blue-50 dark:bg-blue-900/20 rounded-t-lg">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Server className="h-5 w-5 text-blue-500" />
            <CardTitle className="text-lg">Hyperledger Fabric</CardTitle>
          </div>
          <div className="flex gap-2">
            {isConnected && (
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs"
                onClick={handleDisconnect}
              >
                Disconnect
              </Button>
            )}
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-xs"
              onClick={() => setShowHelp(!showHelp)}
            >
              {showHelp ? "Hide Help" : "Help"}
            </Button>
          </div>
        </div>
        <CardDescription>
          Connect to Hyperledger Fabric and execute smart contracts
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        {showHelp && connectionGuide}
        
        {!isConnected ? (
          <NetworkSelector onConnect={handleConnect} />
        ) : (
          <div className="space-y-4">
            <FabricNetworkStatus network={networkDetails} />
            <ChaincodeExecutor networkId={selectedNetwork} />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default HyperledgerFabricConnect;
