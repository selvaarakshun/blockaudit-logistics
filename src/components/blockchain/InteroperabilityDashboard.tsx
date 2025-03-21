
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Network } from 'lucide-react';
import NetworksList from './interop/NetworksList';
import AssetTransfer from './interop/AssetTransfer';
import DocumentVerifier from './interop/DocumentVerifier';

const InteroperabilityDashboard = () => {
  const [activeTab, setActiveTab] = useState('networks');
  const [selectedNetwork, setSelectedNetwork] = useState<string>('');

  return (
    <Card className="shadow-sm">
      <CardHeader className="bg-gray-50 dark:bg-gray-900 rounded-t-lg">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Network className="h-5 w-5 text-blue-500" />
          Blockchain Interoperability
        </CardTitle>
        <CardDescription>
          Transfer assets between different blockchain networks
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 w-full mb-4">
            <TabsTrigger value="networks">Networks</TabsTrigger>
            <TabsTrigger value="transfer">Cross-Chain Transfer</TabsTrigger>
            <TabsTrigger value="verify">Verify Document</TabsTrigger>
          </TabsList>
          
          <TabsContent value="networks">
            <NetworksList 
              selectedNetwork={selectedNetwork} 
              setSelectedNetwork={setSelectedNetwork} 
            />
          </TabsContent>
          
          <TabsContent value="transfer">
            <AssetTransfer />
          </TabsContent>
          
          <TabsContent value="verify">
            <DocumentVerifier />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default InteroperabilityDashboard;
