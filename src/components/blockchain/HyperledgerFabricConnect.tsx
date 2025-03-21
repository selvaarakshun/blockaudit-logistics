
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';
import { Loader2, Server, Database, Check } from 'lucide-react';
import { connectToFabric, availableFabricNetworks, invokeChaincode, queryChaincode } from '@/utils/hyperledgerFabricUtils';
import { availableChaincodes } from '@/utils/smartContractDeployer';

const HyperledgerFabricConnect = () => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState<string>('');
  const [channelName, setChannelName] = useState('mychannel');
  const [orgName, setOrgName] = useState('Org1');
  
  const [chaincodeName, setChaincodeName] = useState('documentcontract');
  const [selectedFunction, setSelectedFunction] = useState('');
  const [functionArgs, setFunctionArgs] = useState('');
  
  const [isExecuting, setIsExecuting] = useState(false);
  const [result, setResult] = useState<any>(null);

  // Get available functions for the selected chaincode
  const getAvailableFunctions = () => {
    const chaincode = availableChaincodes.find(cc => cc.chaincodeName === chaincodeName);
    return chaincode ? Object.keys(chaincode.functions) : [];
  };

  // Get function arguments based on selected function
  const getFunctionArgDescriptions = () => {
    const chaincode = availableChaincodes.find(cc => cc.chaincodeName === chaincodeName);
    if (!chaincode || !selectedFunction) return [];
    return chaincode.functions[selectedFunction]?.args || [];
  };

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
    
    if (!chaincodeName || !selectedFunction) {
      toast({
        title: "Missing Information",
        description: "Please select a chaincode function",
        variant: "destructive"
      });
      return;
    }
    
    const args = functionArgs.split(',').map(arg => arg.trim()).filter(arg => arg);
    
    setIsExecuting(true);
    setResult(null);
    
    try {
      let response;
      
      // For simplicity, we'll use invoke for mutations and query for reads
      const isQuery = selectedFunction.startsWith('Get') || selectedFunction.startsWith('Query');
      
      if (isQuery) {
        response = await queryChaincode(chaincodeName, selectedFunction, args);
      } else {
        response = await invokeChaincode(chaincodeName, selectedFunction, args);
      }
      
      if (response.success) {
        setResult(response.result);
        toast({
          title: "Operation Successful",
          description: `${isQuery ? 'Query' : 'Transaction'} completed successfully`,
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
        ) : (
          <div className="space-y-3">
            <div className="bg-green-50 dark:bg-green-900/20 p-2 rounded-md flex items-center gap-2 text-green-600 dark:text-green-400">
              <Check className="h-4 w-4" />
              <span className="text-sm">Connected to {selectedNetwork}</span>
            </div>
            
            <div>
              <label className="text-sm font-medium">Chaincode</label>
              <Select value={chaincodeName} onValueChange={setChaincodeName}>
                <SelectTrigger>
                  <SelectValue placeholder="Select chaincode" />
                </SelectTrigger>
                <SelectContent>
                  {availableChaincodes.map(cc => (
                    <SelectItem key={cc.chaincodeName} value={cc.chaincodeName}>
                      {cc.chaincodeName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium">Function</label>
              <Select value={selectedFunction} onValueChange={setSelectedFunction}>
                <SelectTrigger>
                  <SelectValue placeholder="Select function" />
                </SelectTrigger>
                <SelectContent>
                  {getAvailableFunctions().map(fn => (
                    <SelectItem key={fn} value={fn}>
                      {fn}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {selectedFunction && (
              <div>
                <label className="text-sm font-medium">
                  Arguments ({getFunctionArgDescriptions().join(', ')})
                </label>
                <Input
                  value={functionArgs}
                  onChange={(e) => setFunctionArgs(e.target.value)}
                  disabled={isExecuting}
                  placeholder="Enter comma-separated values"
                />
              </div>
            )}
            
            <Button 
              onClick={handleExecute} 
              className="w-full" 
              disabled={isExecuting || !selectedFunction}
            >
              {isExecuting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Executing...
                </>
              ) : (
                <>
                  <Database className="mr-2 h-4 w-4" />
                  Execute
                </>
              )}
            </Button>
            
            {result && (
              <div className="mt-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-md overflow-x-auto">
                <h4 className="text-sm font-medium mb-1">Result:</h4>
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
