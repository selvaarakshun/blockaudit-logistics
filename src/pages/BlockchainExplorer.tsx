
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Database, Clock, ChevronRight, Shield, BookOpen, CheckCircle } from 'lucide-react';
import BlockDetails from '@/components/blockchain/BlockDetails';
import TransactionsList from '@/components/blockchain/TransactionsList';
import BlockchainVerification from '@/components/BlockchainVerification';
import SearchResults from '@/components/blockchain/SearchResults';
import SmartContractForm from '@/components/blockchain/SmartContractForm';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { toast } from '@/components/ui/use-toast';
import { ISO28000Compliance, WCOCompliance } from '@/utils/smartContractUtils';

const BlockchainExplorer = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [activeTab, setActiveTab] = useState('transactions');
  const [showStandards, setShowStandards] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setHasSearched(true);
      toast({
        title: "Search Results",
        description: `Showing results for "${searchQuery}"`,
      });
    }
  };
  
  const handleVerifyStandards = async () => {
    setIsChecking(true);
    
    try {
      const [isoResult, wcoResult] = await Promise.all([
        ISO28000Compliance.verifySecurityManagement("SHP-12345"),
        WCOCompliance.verifySAFEFramework({})
      ]);
      
      setShowStandards(true);
      
      toast({
        title: "Standards Verification Complete",
        description: "Your shipment complies with international standards.",
      });
    } catch (error) {
      toast({
        title: "Verification Failed",
        description: "Could not verify compliance with international standards.",
        variant: "destructive"
      });
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container py-6 space-y-8 mt-16 flex-grow">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold">GuudzChain Explorer</h1>
          <p className="text-logistics-gray">
            Search for transactions, blocks, and addresses on the blockchain. Register and verify logistics documents following international standards.
          </p>
        </div>

        <Card className="border-border">
          <CardHeader className="pb-0">
            <CardTitle className="text-xl">Search the Blockchain</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="flex items-center gap-2 mt-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-logistics-gray" />
                <Input
                  type="text" 
                  placeholder="Search by transaction hash, block number, or address..."
                  className="pl-9 pr-4"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button type="submit">
                Search
              </Button>
            </form>
          </CardContent>
        </Card>

        {hasSearched && <SearchResults query={searchQuery} />}
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Tabs 
              defaultValue="transactions" 
              value={activeTab} 
              onValueChange={setActiveTab} 
              className="w-full"
            >
              <TabsList className="grid grid-cols-4 w-full">
                <TabsTrigger value="transactions">Transactions</TabsTrigger>
                <TabsTrigger value="blocks">Blocks</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
                <TabsTrigger value="statistics">Statistics</TabsTrigger>
              </TabsList>
              
              <TabsContent value="transactions" className="space-y-4 mt-4">
                <TransactionsList />
              </TabsContent>
              
              <TabsContent value="blocks" className="space-y-4 mt-4">
                <BlockDetails />
              </TabsContent>
              
              <TabsContent value="documents" className="space-y-4 mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Registered Logistics Documents</CardTitle>
                    <CardDescription>
                      View and verify logistics documents registered on the blockchain
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {['BOL-987654', 'INV-123456', 'COO-345678'].map((docId, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h4 className="font-medium">{docId}</h4>
                              <p className="text-sm text-logistics-gray">
                                {index === 0 ? 'Bill of Lading' : index === 1 ? 'Commercial Invoice' : 'Certificate of Origin'}
                              </p>
                            </div>
                            <span className="text-xs text-logistics-gray">
                              {new Date(Date.now() - 86400000 * (index + 1)).toLocaleDateString()}
                            </span>
                          </div>
                          <BlockchainVerification 
                            docId={docId}
                            txHash={`0x${Math.random().toString(16).substring(2, 10)}${Math.random().toString(16).substring(2, 10)}`}
                            timestamp={new Date(Date.now() - 86400000 * (index + 1)).toISOString()}
                          />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="statistics" className="space-y-4 mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Blockchain Statistics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex flex-col gap-2 p-4 border rounded-lg">
                        <span className="text-logistics-gray text-sm">Total Transactions</span>
                        <span className="text-2xl font-bold">5,832,945</span>
                      </div>
                      <div className="flex flex-col gap-2 p-4 border rounded-lg">
                        <span className="text-logistics-gray text-sm">Latest Block</span>
                        <span className="text-2xl font-bold">#4,832,672</span>
                      </div>
                      <div className="flex flex-col gap-2 p-4 border rounded-lg">
                        <span className="text-logistics-gray text-sm">Avg Block Time</span>
                        <span className="text-2xl font-bold">15.2s</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="flex flex-col md:flex-row gap-4 mt-4">
                  <Card className="w-full md:w-2/3">
                    <CardHeader>
                      <CardTitle>Transaction Volume (24h)</CardTitle>
                    </CardHeader>
                    <CardContent className="h-64 flex items-center justify-center">
                      <div className="text-logistics-gray">Transaction chart visualization would be displayed here</div>
                    </CardContent>
                  </Card>
                  
                  <Card className="w-full md:w-1/3">
                    <CardHeader>
                      <CardTitle>Recent Verified Blocks</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center justify-between py-2 border-b last:border-none">
                          <div className="flex items-center gap-2">
                            <Database className="h-4 w-4 text-logistics-blue" />
                            <span className="font-medium">Block #{4832672 - i}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-logistics-gray">
                            <Clock className="h-3 w-3" />
                            <span>{i * 15}s ago</span>
                            <ChevronRight className="h-4 w-4" />
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="space-y-6">
            <SmartContractForm 
              onSuccess={(hash) => {
                setActiveTab('documents');
              }}
            />
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-logistics-blue" />
                  International Standards
                </CardTitle>
                <CardDescription>
                  Verify compliance with international logistics standards
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={handleVerifyStandards} 
                  className="w-full mb-4"
                  disabled={isChecking}
                >
                  {isChecking ? 'Verifying...' : 'Verify Standards Compliance'}
                </Button>
                
                {showStandards && (
                  <div className="space-y-4 mt-2">
                    <div className="border rounded-lg p-3">
                      <div className="flex items-center mb-2">
                        <BookOpen className="h-4 w-4 text-logistics-success mr-2" />
                        <h4 className="font-medium">ISO 28000</h4>
                      </div>
                      <p className="text-xs text-logistics-gray mb-2">
                        Supply Chain Security Management Systems
                      </p>
                      <div className="flex items-center text-xs text-logistics-success">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        <span>Compliant</span>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg p-3">
                      <div className="flex items-center mb-2">
                        <BookOpen className="h-4 w-4 text-logistics-success mr-2" />
                        <h4 className="font-medium">WCO SAFE Framework</h4>
                      </div>
                      <p className="text-xs text-logistics-gray mb-2">
                        World Customs Organization Standards
                      </p>
                      <div className="flex items-center text-xs text-logistics-success">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        <span>Compliant</span>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default BlockchainExplorer;
