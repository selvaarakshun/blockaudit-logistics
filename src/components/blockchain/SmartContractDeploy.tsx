
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/components/ui/use-toast';
import { Code, Loader2, ExternalLink } from 'lucide-react';
import { LogisticsSmartContractSource, HyperledgerDocumentChaincode } from '@/utils/smartContracts/LogisticsSmartContract';
import { deploySolidityContract, deployFabricChaincode } from '@/utils/smartContractDeployer';

const SmartContractDeploy = () => {
  const [activeTab, setActiveTab] = useState('ethereum');
  
  // Ethereum deployment state
  const [ethContractName, setEthContractName] = useState('LogisticsDocument');
  const [isDeployingEth, setIsDeployingEth] = useState(false);
  const [ethDeploymentResult, setEthDeploymentResult] = useState<{
    success: boolean;
    contractAddress?: string;
    txHash?: string;
    error?: string;
  } | null>(null);
  
  // Hyperledger Fabric deployment state
  const [chaincodeName, setChaincodeName] = useState('documentcontract');
  const [channelName, setChannelName] = useState('mychannel');
  const [chaincodeVersion, setChaincodeVersion] = useState('1.0');
  const [isDeployingFabric, setIsDeployingFabric] = useState(false);
  const [fabricDeploymentResult, setFabricDeploymentResult] = useState<{
    success: boolean;
    contractAddress?: string;
    txHash?: string;
    error?: string;
  } | null>(null);

  const handleDeployEthereum = async () => {
    setIsDeployingEth(true);
    setEthDeploymentResult(null);
    
    try {
      const result = await deploySolidityContract();
      setEthDeploymentResult(result);
      
      if (result.success) {
        toast({
          title: "Contract Deployed",
          description: `${ethContractName} contract successfully deployed to address: ${result.contractAddress?.substring(0, 10)}...`,
        });
      } else {
        toast({
          title: "Deployment Failed",
          description: result.error || "Unknown error occurred",
          variant: "destructive"
        });
      }
    } catch (error) {
      setEthDeploymentResult({
        success: false,
        error: error instanceof Error ? error.message : String(error)
      });
      
      toast({
        title: "Deployment Failed",
        description: "An error occurred during contract deployment",
        variant: "destructive"
      });
    } finally {
      setIsDeployingEth(false);
    }
  };
  
  const handleDeployFabric = async () => {
    if (!chaincodeName || !channelName || !chaincodeVersion) {
      toast({
        title: "Missing Information",
        description: "Please fill out all required fields",
        variant: "destructive"
      });
      return;
    }
    
    setIsDeployingFabric(true);
    setFabricDeploymentResult(null);
    
    try {
      const result = await deployFabricChaincode(chaincodeName, channelName, chaincodeVersion);
      setFabricDeploymentResult(result);
      
      if (result.success) {
        toast({
          title: "Chaincode Deployed",
          description: `${chaincodeName} chaincode successfully deployed to channel: ${channelName}`,
        });
      } else {
        toast({
          title: "Deployment Failed",
          description: result.error || "Unknown error occurred",
          variant: "destructive"
        });
      }
    } catch (error) {
      setFabricDeploymentResult({
        success: false,
        error: error instanceof Error ? error.message : String(error)
      });
      
      toast({
        title: "Deployment Failed",
        description: "An error occurred during chaincode deployment",
        variant: "destructive"
      });
    } finally {
      setIsDeployingFabric(false);
    }
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="bg-gray-50 dark:bg-gray-900 rounded-t-lg">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Code className="h-5 w-5 text-blue-500" />
          Deploy Smart Contracts
        </CardTitle>
        <CardDescription>
          Deploy contracts to Ethereum or Hyperledger Fabric networks
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 w-full mb-4">
            <TabsTrigger value="ethereum">Ethereum Contract</TabsTrigger>
            <TabsTrigger value="hyperledger">Hyperledger Chaincode</TabsTrigger>
          </TabsList>
          
          <TabsContent value="ethereum" className="space-y-3">
            <div>
              <label className="text-sm font-medium">Contract Name</label>
              <Input
                value={ethContractName}
                onChange={(e) => setEthContractName(e.target.value)}
                disabled={isDeployingEth}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium">Contract Source Code</label>
              <div className="mt-1 border rounded-md bg-gray-50 dark:bg-gray-800">
                <pre className="p-3 text-xs overflow-auto max-h-64">
                  {LogisticsSmartContractSource}
                </pre>
              </div>
            </div>
            
            <Button 
              onClick={handleDeployEthereum} 
              className="w-full" 
              disabled={isDeployingEth}
            >
              {isDeployingEth ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deploying...
                </>
              ) : (
                <>
                  <Code className="mr-2 h-4 w-4" />
                  Deploy to Ethereum
                </>
              )}
            </Button>
            
            {ethDeploymentResult && ethDeploymentResult.success && (
              <div className="mt-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <h4 className="text-sm font-medium text-green-800 dark:text-green-300 mb-1">Deployment Successful</h4>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <span className="text-gray-500 dark:text-gray-400">Contract Address:</span>
                  <span className="col-span-2 font-mono">{ethDeploymentResult.contractAddress}</span>
                  
                  <span className="text-gray-500 dark:text-gray-400">Transaction Hash:</span>
                  <span className="col-span-2 font-mono truncate">{ethDeploymentResult.txHash}</span>
                </div>
                <Button size="sm" variant="link" className="mt-1 h-6 p-0">
                  <ExternalLink className="h-3 w-3 mr-1" />
                  View on Etherscan
                </Button>
              </div>
            )}
            
            {ethDeploymentResult && !ethDeploymentResult.success && (
              <div className="mt-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <h4 className="text-sm font-medium text-red-800 dark:text-red-300">Deployment Failed</h4>
                <p className="text-xs text-red-700 dark:text-red-200 mt-1">{ethDeploymentResult.error}</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="hyperledger" className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium">Chaincode Name</label>
                <Input
                  value={chaincodeName}
                  onChange={(e) => setChaincodeName(e.target.value)}
                  disabled={isDeployingFabric}
                />
              </div>
              
              <div>
                <label className="text-sm font-medium">Channel Name</label>
                <Input
                  value={channelName}
                  onChange={(e) => setChannelName(e.target.value)}
                  disabled={isDeployingFabric}
                />
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium">Chaincode Version</label>
              <Select 
                value={chaincodeVersion} 
                onValueChange={setChaincodeVersion}
                disabled={isDeployingFabric}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select version" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1.0">1.0</SelectItem>
                  <SelectItem value="1.1">1.1</SelectItem>
                  <SelectItem value="2.0">2.0</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium">Chaincode Source</label>
              <div className="mt-1 border rounded-md bg-gray-50 dark:bg-gray-800">
                <pre className="p-3 text-xs overflow-auto max-h-64">
                  {HyperledgerDocumentChaincode}
                </pre>
              </div>
            </div>
            
            <Button 
              onClick={handleDeployFabric} 
              className="w-full" 
              disabled={isDeployingFabric}
            >
              {isDeployingFabric ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deploying...
                </>
              ) : (
                <>
                  <Code className="mr-2 h-4 w-4" />
                  Deploy to Hyperledger
                </>
              )}
            </Button>
            
            {fabricDeploymentResult && fabricDeploymentResult.success && (
              <div className="mt-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <h4 className="text-sm font-medium text-green-800 dark:text-green-300 mb-1">Deployment Successful</h4>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <span className="text-gray-500 dark:text-gray-400">Channel:</span>
                  <span className="col-span-2 font-mono">{channelName}</span>
                  
                  <span className="text-gray-500 dark:text-gray-400">Chaincode ID:</span>
                  <span className="col-span-2 font-mono">{fabricDeploymentResult.contractAddress}</span>
                </div>
              </div>
            )}
            
            {fabricDeploymentResult && !fabricDeploymentResult.success && (
              <div className="mt-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <h4 className="text-sm font-medium text-red-800 dark:text-red-300">Deployment Failed</h4>
                <p className="text-xs text-red-700 dark:text-red-200 mt-1">{fabricDeploymentResult.error}</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default SmartContractDeploy;
