
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Server } from 'lucide-react';
import NetworkSelector from './fabric/NetworkSelector';
import ChaincodeExecutor from './fabric/ChaincodeExecutor';

const HyperledgerFabricConnect = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState<string>('');

  const handleConnect = (connected: boolean) => {
    setIsConnected(connected);
    setSelectedNetwork(connected ? 'network1' : ''); // Assuming 'network1' is the selected network
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="bg-gray-50 dark:bg-gray-900 rounded-t-lg">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Server className="h-5 w-5 text-blue-500" />
          Hyperledger Fabric
        </CardTitle>
        <CardDescription>
          Connect to Hyperledger Fabric and execute smart contracts
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        {!isConnected ? (
          <NetworkSelector onConnect={handleConnect} />
        ) : (
          <ChaincodeExecutor networkId={selectedNetwork} />
        )}
      </CardContent>
    </Card>
  );
};

export default HyperledgerFabricConnect;
