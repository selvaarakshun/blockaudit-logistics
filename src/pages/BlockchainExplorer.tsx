
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Database, FileText, Clock, ChevronRight } from 'lucide-react';
import BlockDetails from '@/components/blockchain/BlockDetails';
import TransactionsList from '@/components/blockchain/TransactionsList';
import BlockchainVerification from '@/components/BlockchainVerification';
import SearchResults from '@/components/blockchain/SearchResults';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const BlockchainExplorer = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setHasSearched(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container py-6 space-y-8 mt-16 flex-grow">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold">GuudzChain Explorer</h1>
          <p className="text-logistics-gray">
            Search for transactions, blocks, and addresses on the blockchain
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

        <Tabs defaultValue="transactions" className="w-full">
          <TabsList className="grid grid-cols-3 w-full max-w-md">
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="blocks">Blocks</TabsTrigger>
            <TabsTrigger value="statistics">Statistics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="transactions" className="space-y-4 mt-4">
            <TransactionsList />
          </TabsContent>
          
          <TabsContent value="blocks" className="space-y-4 mt-4">
            <BlockDetails />
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
      
      <Footer />
    </div>
  );
};

export default BlockchainExplorer;
