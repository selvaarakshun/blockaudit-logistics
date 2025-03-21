
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { Check, GitBranch, Loader2 } from 'lucide-react';
import { verifyDocumentAcrossChains } from '@/utils/interoperabilityUtils';

const DocumentVerifier = () => {
  const [documentHash, setDocumentHash] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResults, setVerificationResults] = useState<Record<string, boolean> | null>(null);
  
  const handleVerifyDocument = async () => {
    if (!documentHash) {
      toast({
        title: "Missing Hash",
        description: "Please enter a document hash to verify",
        variant: "destructive"
      });
      return;
    }
    
    setIsVerifying(true);
    setVerificationResults(null);
    
    try {
      const results = await verifyDocumentAcrossChains(documentHash);
      setVerificationResults(results);
      
      const verifiedCount = Object.values(results).filter(Boolean).length;
      
      toast({
        title: "Verification Complete",
        description: `Document verified on ${verifiedCount} out of ${Object.keys(results).length} chains`,
      });
    } catch (error) {
      toast({
        title: "Verification Failed",
        description: "Failed to verify document across chains",
        variant: "destructive"
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const getExampleHash = () => {
    const examples = [
      '0x7a5c4bdc7f51bdbcb9c4e9fc4842a8e08c32856a8d8f0d3d4da54ae99a8f6e01',
      'QmT5NvUtoM5n8Pw8yX4dHEJ7iMeYLMRYPABKxQ9Xpn7qrF',
      'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
    ];
    return examples[Math.floor(Math.random() * examples.length)];
  };

  return (
    <div className="space-y-3">
      <div>
        <label className="text-sm font-medium">Document Hash</label>
        <div className="mt-1 relative">
          <Input
            value={documentHash}
            onChange={(e) => setDocumentHash(e.target.value)}
            placeholder="Enter document hash to verify across chains"
          />
          <button 
            className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-blue-500 hover:text-blue-700"
            onClick={() => setDocumentHash(getExampleHash())}
          >
            Example
          </button>
        </div>
      </div>
      
      <Button 
        onClick={handleVerifyDocument} 
        className="w-full" 
        disabled={isVerifying || !documentHash}
      >
        {isVerifying ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Verifying...
          </>
        ) : (
          <>
            <GitBranch className="mr-2 h-4 w-4" />
            Verify Across Chains
          </>
        )}
      </Button>
      
      {verificationResults && (
        <div className="space-y-2">
          <h3 className="font-medium text-sm">Verification Results:</h3>
          {Object.entries(verificationResults).map(([chain, verified]) => (
            <div key={chain} className="flex items-center justify-between border rounded p-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <span className="text-sm">{chain}</span>
              <span className={`flex items-center gap-1 text-sm ${
                verified 
                  ? 'text-green-600' 
                  : 'text-red-600'
              }`}>
                {verified ? (
                  <>
                    <Check className="h-4 w-4" />
                    Verified
                  </>
                ) : (
                  'Not Found'
                )}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DocumentVerifier;
