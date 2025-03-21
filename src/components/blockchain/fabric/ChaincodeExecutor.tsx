
import { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Database, Loader2 } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { invokeChaincode, queryChaincode } from '@/utils/hyperledgerFabricUtils';
import { availableChaincodes } from '@/utils/smartContractDeployer';

interface ChaincodeExecutorProps {
  networkId: string;
}

const ChaincodeExecutor = ({ networkId }: ChaincodeExecutorProps) => {
  const [chaincodeName, setChaincodeName] = useState('documentcontract');
  const [selectedFunction, setSelectedFunction] = useState('');
  const [functionArgs, setFunctionArgs] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [recentFunctions, setRecentFunctions] = useState<string[]>([]);

  // Add function to recent list when successfully executed
  useEffect(() => {
    if (result && selectedFunction && !recentFunctions.includes(selectedFunction)) {
      setRecentFunctions(prev => [selectedFunction, ...prev].slice(0, 3));
    }
  }, [result, selectedFunction]);

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

  const handleExecute = async () => {
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

  const handleSelectRecentFunction = (fn: string) => {
    setSelectedFunction(fn);
    // Clear arguments when switching functions
    setFunctionArgs('');
    setResult(null);
  };

  return (
    <div className="space-y-3">
      <div className="bg-green-50 dark:bg-green-900/20 p-2 rounded-md flex items-center gap-2 text-green-600 dark:text-green-400">
        <Check className="h-4 w-4" />
        <span className="text-sm">Connected to {networkId}</span>
      </div>
      
      {recentFunctions.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <span className="text-xs text-gray-500">Recent:</span>
          {recentFunctions.map(fn => (
            <Badge 
              key={fn} 
              variant="outline" 
              className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              onClick={() => handleSelectRecentFunction(fn)}
            >
              {fn}
            </Badge>
          ))}
        </div>
      )}
      
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
  );
};

export default ChaincodeExecutor;
