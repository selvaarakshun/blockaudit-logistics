
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FileText, Upload, CheckCircle, XCircle, AlertTriangle, Database, Shield } from 'lucide-react';
import { verifyDocumentOnChain, getDocumentHistory, ISO28000Compliance, WCOCompliance } from '@/utils/smartContractUtils';
import { toast } from '@/components/ui/use-toast';

// Mock document data
const documents = [
  {
    id: 'doc1',
    name: 'Bill of Lading',
    type: 'billOfLading',
    issuer: 'Carrier Inc.',
    date: '2023-04-05',
    hash: '0xabc123...',
    verified: true,
    ipfsHash: 'QmW1KZgzFgMrFhkBeDh5xqXa2SndT7ckA3Z',
  },
  {
    id: 'doc2',
    name: 'Commercial Invoice',
    type: 'invoice',
    issuer: 'Supplier Co.',
    date: '2023-04-03',
    hash: '0xdef456...',
    verified: true,
    ipfsHash: 'QmT8KZgzFgMrFhkBeDh5xqXa4SndT7ckA3Z',
  },
  {
    id: 'doc3',
    name: 'Certificate of Origin',
    type: 'certificate',
    issuer: 'Chamber of Commerce',
    date: '2023-04-02',
    hash: '0xghi789...',
    verified: true,
    ipfsHash: 'QmR5KZgzFgMrFhkBeDh5xqXa7SndT7ckA3Z',
  },
  {
    id: 'doc4',
    name: 'Customs Declaration',
    type: 'customsDeclaration',
    issuer: 'Customs Authority',
    date: '2023-04-04',
    hash: '0xjkl012...',
    verified: false,
    ipfsHash: 'QmP2KZgzFgMrFhkBeDh5xqXa3SndT7ckA3Z',
  },
];

const AuditCompliance = () => {
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<{ success: boolean; message: string } | null>(null);
  const [hashToVerify, setHashToVerify] = useState('');
  
  const handleVerifyDocument = async (documentId: string) => {
    setSelectedDocument(documentId);
    setIsVerifying(true);
    setVerificationResult(null);
    
    try {
      const document = documents.find(doc => doc.id === documentId);
      if (!document) throw new Error('Document not found');
      
      // Simulate blockchain verification
      const isVerified = await verifyDocumentOnChain(document.hash);
      
      setTimeout(() => {
        setIsVerifying(false);
        setVerificationResult({ 
          success: isVerified, 
          message: isVerified 
            ? 'Document verified successfully on the blockchain' 
            : 'Document verification failed' 
        });
        
        toast({
          title: isVerified ? "Document Verified" : "Verification Failed",
          description: isVerified 
            ? `${document.name} has been verified on the blockchain.` 
            : `Could not verify ${document.name}. Hash mismatch detected.`,
          variant: isVerified ? "default" : "destructive",
        });
      }, 1500);
    } catch (error) {
      setIsVerifying(false);
      setVerificationResult({ success: false, message: 'Error verifying document' });
      
      toast({
        title: "Verification Error",
        description: "An error occurred during document verification.",
        variant: "destructive",
      });
    }
  };
  
  const handleManualVerification = async () => {
    if (!hashToVerify) {
      toast({
        title: "Input Required",
        description: "Please enter a document hash to verify",
        variant: "destructive",
      });
      return;
    }
    
    setIsVerifying(true);
    setVerificationResult(null);
    
    try {
      // Simulate blockchain verification
      const isVerified = await verifyDocumentOnChain(hashToVerify);
      
      setTimeout(() => {
        setIsVerifying(false);
        setVerificationResult({ 
          success: isVerified, 
          message: isVerified 
            ? 'Document hash verified successfully on the blockchain' 
            : 'Document verification failed. Hash not found on the blockchain.' 
        });
        
        toast({
          title: isVerified ? "Hash Verified" : "Verification Failed",
          description: isVerified 
            ? `The provided hash has been verified on the blockchain.` 
            : `Could not verify the provided hash on the blockchain.`,
          variant: isVerified ? "default" : "destructive",
        });
      }, 1500);
    } catch (error) {
      setIsVerifying(false);
      setVerificationResult({ success: false, message: 'Error verifying hash' });
      
      toast({
        title: "Verification Error",
        description: "An error occurred during hash verification.",
        variant: "destructive",
      });
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-white dark:bg-logistics-dark/80 shadow-sm hover:shadow-md transition-shadow border-border rounded-xl">
          <CardHeader>
            <CardTitle>Blockchain Document Verification</CardTitle>
            <CardDescription>Verify documents stored on IPFS and the blockchain</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {documents.map((document) => (
                <div key={document.id} className="audit-doc-card">
                  <div className={`flex items-center justify-center h-10 w-10 rounded-lg ${
                    document.verified ? 'bg-green-100 text-green-600 dark:bg-green-900/20' : 'bg-amber-100 text-amber-600 dark:bg-amber-900/20'
                  }`}>
                    <FileText className="h-5 w-5" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h3 className="font-medium">{document.name}</h3>
                      <span className="text-xs text-muted-foreground">{document.date}</span>
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-xs text-muted-foreground">Issuer: {document.issuer}</span>
                      <div className="flex items-center gap-1">
                        <span className="blockchain-badge">
                          {document.verified ? (
                            <span className="flex items-center gap-1">
                              <CheckCircle className="h-3 w-3" />
                              Verified
                            </span>
                          ) : (
                            <span className="flex items-center gap-1">
                              <AlertTriangle className="h-3 w-3" />
                              Unverified
                            </span>
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="ml-2"
                    onClick={() => handleVerifyDocument(document.id)}
                    disabled={isVerifying && selectedDocument === document.id}
                  >
                    {isVerifying && selectedDocument === document.id ? (
                      <>Verifying...</>
                    ) : (
                      <>Verify</>
                    )}
                  </Button>
                </div>
              ))}
              
              {selectedDocument && verificationResult && (
                <div className={`mt-4 p-4 rounded-lg ${
                  verificationResult.success ? 'bg-green-50 text-green-600 dark:bg-green-900/20' : 'bg-red-50 text-red-600 dark:bg-red-900/20'
                }`}>
                  <div className="flex items-center gap-2">
                    {verificationResult.success ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      <XCircle className="h-5 w-5" />
                    )}
                    <span>{verificationResult.message}</span>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white dark:bg-logistics-dark/80 shadow-sm hover:shadow-md transition-shadow border-border rounded-xl">
          <CardHeader>
            <CardTitle>Manual Hash Verification</CardTitle>
            <CardDescription>Verify any document hash on the blockchain</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label htmlFor="document-hash" className="block text-sm font-medium mb-1">
                  Document Hash
                </label>
                <div className="flex gap-2">
                  <Input
                    id="document-hash"
                    placeholder="Enter document hash (0x...)"
                    value={hashToVerify}
                    onChange={(e) => setHashToVerify(e.target.value)}
                  />
                  <Button
                    onClick={handleManualVerification}
                    disabled={isVerifying || !hashToVerify}
                  >
                    Verify
                  </Button>
                </div>
              </div>
              
              <div className="mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-start gap-3">
                    <Upload className="h-5 w-5 text-blue-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-700 dark:text-blue-300">Upload Document</h4>
                      <p className="text-xs text-blue-600 dark:text-blue-400">
                        Upload a document to IPFS and register on the blockchain
                      </p>
                      <Button size="sm" className="mt-2" variant="outline">
                        Upload
                      </Button>
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-purple-50 dark:bg-purple-900/20 flex items-start gap-3">
                    <Database className="h-5 w-5 text-purple-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-purple-700 dark:text-purple-300">Generate Proof</h4>
                      <p className="text-xs text-purple-600 dark:text-purple-400">
                        Create a cryptographic proof for an existing document
                      </p>
                      <Button size="sm" className="mt-2" variant="outline">
                        Generate
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 p-4 rounded-lg bg-muted/30">
                <h4 className="font-medium mb-2">How Verification Works</h4>
                <p className="text-sm text-muted-foreground">
                  Documents are hashed and stored on IPFS, with the hash recorded on the blockchain. 
                  Verification checks if the document's hash matches the on-chain record, ensuring 
                  document integrity and authenticity.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="bg-white dark:bg-logistics-dark/80 shadow-sm hover:shadow-md transition-shadow border-border rounded-xl">
        <CardHeader>
          <CardTitle>Compliance Standards</CardTitle>
          <CardDescription>International trade and logistics compliance verification</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="iso28000">
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="iso28000">ISO 28000</TabsTrigger>
              <TabsTrigger value="wco">WCO SAFE Framework</TabsTrigger>
            </TabsList>
            
            <TabsContent value="iso28000" className="space-y-4">
              <div className="flex items-start gap-3 p-4 rounded-lg bg-green-50 dark:bg-green-900/20">
                <Shield className="h-5 w-5 text-green-500 mt-1" />
                <div>
                  <h3 className="font-medium text-green-700 dark:text-green-300">
                    ISO 28000 Compliance
                  </h3>
                  <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                    Supply chain security management systems standard status
                  </p>
                  
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Security management policy verified</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Risk assessment completed</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Security controls validated</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Monitoring procedures in place</span>
                    </div>
                  </div>
                  
                  <Button className="mt-4" variant="outline" size="sm">
                    Download Compliance Report
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="wco" className="space-y-4">
              <div className="flex items-start gap-3 p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                <Shield className="h-5 w-5 text-blue-500 mt-1" />
                <div>
                  <h3 className="font-medium text-blue-700 dark:text-blue-300">
                    WCO SAFE Framework Compliance
                  </h3>
                  <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
                    World Customs Organization standards status
                  </p>
                  
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-500" />
                      <span className="text-sm">AEO status verified</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-500" />
                      <span className="text-sm">Advance electronic information provided</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-500" />
                      <span className="text-sm">Risk management applied</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-500" />
                      <span className="text-sm">Outbound inspection completed</span>
                    </div>
                  </div>
                  
                  <Button className="mt-4" variant="outline" size="sm">
                    Download Compliance Report
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuditCompliance;
