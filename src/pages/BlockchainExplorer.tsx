import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlockDetails from '@/components/blockchain/BlockDetails';
import TransactionsList from '@/components/blockchain/TransactionsList';
import SearchResults from '@/components/blockchain/SearchResults';
import SmartContractForm from '@/components/blockchain/SmartContractForm';
import BlockchainSearch from '@/components/blockchain/BlockchainSearch';
import DocumentSearch from '@/components/blockchain/DocumentSearch';
import RegisteredDocuments from '@/components/blockchain/RegisteredDocuments';
import BlockchainStatistics from '@/components/blockchain/BlockchainStatistics';
import StandardsComplianceCard from '@/components/blockchain/StandardsComplianceCard';

const BlockchainExplorer = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [activeTab, setActiveTab] = useState('transactions');
  const [documentId, setDocumentId] = useState('');
  const [hasDocumentSearch, setHasDocumentSearch] = useState(false);
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setHasSearched(true);
    setHasDocumentSearch(false); // Reset document search when doing regular search
  };

  const handleDocumentSearch = (docId: string) => {
    setDocumentId(docId);
    setHasDocumentSearch(true);
    setHasSearched(false); // Reset regular search when doing document search
    setActiveTab('documents'); // Switch to documents tab
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container py-6 space-y-8 mt-16 flex-grow">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold">GuudzChain Explorer</h1>
          <p className="text-logistics-gray">
            Search for transactions, blocks, addresses on the blockchain, or find registered logistics documents by ID.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BlockchainSearch onSearch={handleSearch} />
          <DocumentSearch onSearch={handleDocumentSearch} />
        </div>

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
                {hasDocumentSearch ? (
                  <Card>
                    <CardContent className="pt-6">
                      <RegisteredDocuments filteredDocId={documentId} />
                    </CardContent>
                  </Card>
                ) : (
                  <RegisteredDocuments />
                )}
              </TabsContent>
              
              <TabsContent value="statistics" className="space-y-4 mt-4">
                <BlockchainStatistics />
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="space-y-6">
            <SmartContractForm 
              onSuccess={(hash) => {
                setActiveTab('documents');
              }}
            />
            
            <StandardsComplianceCard />
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default BlockchainExplorer;
