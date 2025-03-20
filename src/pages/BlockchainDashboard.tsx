
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TransactionsList from '@/components/blockchain/TransactionsList';
import BlockDetails from '@/components/blockchain/BlockDetails';
import DocumentSearch from '@/components/blockchain/DocumentSearch';
import RegisteredDocuments from '@/components/blockchain/RegisteredDocuments';
import BlockchainStatistics from '@/components/blockchain/BlockchainStatistics';
import { Database, FileText, Blocks, BarChart3 } from 'lucide-react';

const BlockchainDashboard = () => {
  const [documentId, setDocumentId] = useState('');

  const handleDocumentSearch = (docId: string) => {
    setDocumentId(docId);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container py-6 space-y-8 mt-16 flex-grow">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold">Blockchain Dashboard</h1>
          <p className="text-logistics-gray">
            Monitor real-time blockchain activity, transactions, and document verifications
          </p>
        </div>

        {/* Statistics Overview */}
        <BlockchainStatistics />
        
        {/* Main Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content Area - 2/3 width on large screens */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="transactions" className="w-full">
              <TabsList className="grid grid-cols-4 w-full">
                <TabsTrigger value="transactions" className="flex items-center gap-2">
                  <Database className="h-4 w-4" />
                  <span className="hidden sm:inline">Transactions</span>
                </TabsTrigger>
                <TabsTrigger value="blocks" className="flex items-center gap-2">
                  <Blocks className="h-4 w-4" />
                  <span className="hidden sm:inline">Blocks</span>
                </TabsTrigger>
                <TabsTrigger value="documents" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span className="hidden sm:inline">Documents</span>
                </TabsTrigger>
                <TabsTrigger value="analytics" className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  <span className="hidden sm:inline">Analytics</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="transactions" className="space-y-4 mt-4">
                <TransactionsList />
              </TabsContent>
              
              <TabsContent value="blocks" className="space-y-4 mt-4">
                <BlockDetails />
              </TabsContent>
              
              <TabsContent value="documents" className="space-y-4 mt-4">
                <Card>
                  <CardContent className="pt-6">
                    <RegisteredDocuments filteredDocId={documentId} />
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="analytics" className="space-y-4 mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Blockchain Analytics</CardTitle>
                    <CardDescription>Analysis of blockchain activity over time</CardDescription>
                  </CardHeader>
                  <CardContent className="h-64 flex items-center justify-center">
                    <div className="text-logistics-gray">Analytics visualizations would be displayed here</div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Sidebar - 1/3 width on large screens */}
          <div className="space-y-6">
            <DocumentSearch onSearch={handleDocumentSearch} />
            
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-start gap-3 pb-3 border-b last:border-none last:pb-0">
                      <div className="bg-logistics-blue/10 rounded-full p-2">
                        {i % 3 === 0 ? (
                          <Database className="h-4 w-4 text-logistics-blue" />
                        ) : i % 3 === 1 ? (
                          <FileText className="h-4 w-4 text-logistics-blue" />
                        ) : (
                          <Blocks className="h-4 w-4 text-logistics-blue" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-sm">
                          {i % 3 === 0
                            ? "New transaction verified"
                            : i % 3 === 1
                            ? "Document BOL-45678 registered"
                            : "Block #4832672 mined"}
                        </p>
                        <p className="text-xs text-logistics-gray">
                          {i * 5} minutes ago
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Network Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-logistics-gray">Network</span>
                    <span className="text-sm font-medium flex items-center gap-1">
                      <span className="size-2 bg-logistics-success rounded-full"></span>
                      Operational
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-logistics-gray">Response Time</span>
                    <span className="text-sm font-medium">214ms</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-logistics-gray">Active Validators</span>
                    <span className="text-sm font-medium">276</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-logistics-gray">Current TPS</span>
                    <span className="text-sm font-medium">127.5</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default BlockchainDashboard;
