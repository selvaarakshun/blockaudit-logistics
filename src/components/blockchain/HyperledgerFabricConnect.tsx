
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';
import { Loader2, Server, Database, Check } from 'lucide-react';
import { connectToFabric, availableFabricNetworks, invokeChaincode, queryChaincode } from '@/utils/hyperledgerFabricUtils';

const HyperledgerFabricConnect = () => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState<string>('');
  const [channelName, setChannelName] = useState('mychannel');
  const [orgName, setOrgName] = useState('Org1');
  
  const [chaincodeOperation, setChaincodeOperation] = useState<'query' | 'invoke'>('query');
  const [chaincodeName, setChaincodeName] = useState('documentcontract');
  const [functionName, setFunctionName] = useState('GetDocumentByID');
  const [functionArgs, setFunctionArgs] = useState('');
  
  const [isExecuting, setIsExecuting] = useState(false);
  const [result, setResult] = useState<any>(null);

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
      
      setIsConnected(true);
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
  
  const handleExecute = async () => {
    if (!isConnected) {
      toast({
        title: "Not Connected",
        description: "Please connect to a Fabric network first",
        variant: "destructive"
      });
      return;
    }
    
    if (!chaincodeName || !functionName) {
      toast({
        title: "Missing Information",
        description: "Please fill out all required fields",
        variant: "destructive"
      });
      return;
    }
    
    const args = functionArgs.split(',').map(arg => arg.trim()).filter(arg => arg);
    
    setIsExecuting(true);
    setResult(null);
    
    try {
      let response;
      
      if (chaincodeOperation === 'query') {
        response = await queryChaincode(chaincodeName, functionName, args);
      } else {
        response = await invokeChaincode(chaincodeName, functionName, args);
      }
      
      if (response.success) {
        setResult(response.result);
        toast({
          title: "Operation Successful",
          description: `${chaincodeOperation === 'query' ? 'Query' : 'Invocation'} completed successfully`,
        });
      } else {
        toast({
          title: "Operation Failed",
          description: response.error || "Unknown error occurred",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Operation Failed",
        description: "Failed to execute chaincode operation",
        variant: "destructive"
      });
    } finally {
      setIsExecuting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Server className="h-5 w-5 text-logistics-blue" />
          Hyperledger Fabric Connect
        </CardTitle>
        <CardDescription>
          Connect to Hyperledger Fabric networks and execute chaincode
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!isConnected ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="network" className="text-sm font-medium">Network</label>
              <Select value={selectedNetwork} onValueChange={setSelectedNetwork} disabled={isConnecting}>
                <SelectTrigger id="network">
                  <SelectValue placeholder="Select Fabric network" />
                </SelectTrigger>
                <SelectContent>
                  {availableFabricNetworks.map(network => (
                    <SelectItem key={network.id} value={network.id}>
                      {network.name} ({network.peerCount} peers)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="channel" className="text-sm font-medium">Channel Name</label>
              <Input
                id="channel"
                value={channelName}
                onChange={(e) => setChannelName(e.target.value)}
                disabled={isConnecting}
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="org" className="text-sm font-medium">Organization</label>
              <Input
                id="org"
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                disabled={isConnecting}
              />
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
                  Connect to Fabric
                </>
              )}
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-green-50 dark:bg-green-900/20 p-2 rounded-md flex items-center gap-2 text-green-600 dark:text-green-400">
              <Check className="h-4 w-4" />
              <span className="text-sm">Connected to {selectedNetwork} as {orgName}</span>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Operation Type</label>
              <div className="flex gap-2">
                <Button 
                  variant={chaincodeOperation === 'query' ? 'default' : 'outline'} 
                  onClick={() => setChaincodeOperation('query')}
                  size="sm"
                >
                  Query
                </Button>
                <Button 
                  variant={chaincodeOperation === 'invoke' ? 'default' : 'outline'} 
                  onClick={() => setChaincodeOperation('invoke')}
                  size="sm"
                >
                  Invoke
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="chaincode" className="text-sm font-medium">Chaincode Name</label>
              <Input
                id="chaincode"
                value={chaincodeName}
                onChange={(e) => setChaincodeName(e.target.value)}
                disabled={isExecuting}
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="function" className="text-sm font-medium">Function Name</label>
              <Input
                id="function"
                value={functionName}
                onChange={(e) => setFunctionName(e.target.value)}
                disabled={isExecuting}
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="args" className="text-sm font-medium">Arguments (comma separated)</label>
              <Input
                id="args"
                value={functionArgs}
                onChange={(e) => setFunctionArgs(e.target.value)}
                disabled={isExecuting}
                placeholder="e.g. arg1,arg2,arg3"
              />
            </div>
            
            <Button 
              onClick={handleExecute} 
              className="w-full" 
              disabled={isExecuting}
            >
              {isExecuting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Executing...
                </>
              ) : (
                <>
                  <Database className="mr-2 h-4 w-4" />
                  Execute Chaincode
                </>
              )}
            </Button>
            
            {result && (
              <div className="mt-4 p-4 bg-muted rounded-md overflow-x-auto">
                <h4 className="text-sm font-medium mb-2">Result:</h4>
                <pre className="text-xs">{JSON.stringify(result, null, 2)}</pre>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default HyperledgerFabricConnect;
