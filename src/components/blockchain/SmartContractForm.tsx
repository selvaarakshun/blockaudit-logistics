
import { useState } from 'react';
import { registerDocumentOnChain } from '@/utils/smartContractUtils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';
import { FileCheck, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface SmartContractFormProps {
  onSuccess?: (hash: string) => void;
}

const SmartContractForm = ({ onSuccess }: SmartContractFormProps) => {
  const [loading, setLoading] = useState(false);
  const [docType, setDocType] = useState<'billOfLading' | 'invoice' | 'certificate' | 'customsDeclaration'>('billOfLading');
  const [docId, setDocId] = useState('');
  const [issuer, setIssuer] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!docId || !issuer) {
      toast({
        title: "Missing Information",
        description: "Please fill out all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    setLoading(true);
    
    try {
      const hash = await registerDocumentOnChain({
        docId,
        docType,
        issuer,
        issuedAt: new Date().toISOString(),
        signers: [{ 
          name: issuer, 
          signature: `sig_${Math.random().toString(16).substring(2)}`, 
          timestamp: new Date().toISOString() 
        }]
      });
      
      toast({
        title: "Document Registered",
        description: `Document successfully registered on blockchain with hash: ${hash.substring(0, 10)}...`,
      });
      
      if (onSuccess) {
        onSuccess(hash);
      }
      
      // Reset form
      setDocId('');
      setIssuer('');
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: "Failed to register document on blockchain. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Register Document on Blockchain</CardTitle>
        <CardDescription>
          Create a smart contract for your logistics document following international standards
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="docId" className="text-sm font-medium">Document ID</label>
            <Input
              id="docId"
              placeholder="Enter document ID (e.g., BOL123456)"
              value={docId}
              onChange={(e) => setDocId(e.target.value)}
              disabled={loading}
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="docType" className="text-sm font-medium">Document Type</label>
            <Select
              value={docType}
              onValueChange={(value: any) => setDocType(value)}
              disabled={loading}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select document type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="billOfLading">Bill of Lading</SelectItem>
                <SelectItem value="invoice">Commercial Invoice</SelectItem>
                <SelectItem value="certificate">Certificate of Origin</SelectItem>
                <SelectItem value="customsDeclaration">Customs Declaration</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="issuer" className="text-sm font-medium">Issuer / Authority</label>
            <Input
              id="issuer"
              placeholder="Enter issuing organization"
              value={issuer}
              onChange={(e) => setIssuer(e.target.value)}
              disabled={loading}
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full" 
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Registering...
              </>
            ) : (
              <>
                <FileCheck className="mr-2 h-4 w-4" />
                Register on Blockchain
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default SmartContractForm;
