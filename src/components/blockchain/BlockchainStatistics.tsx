
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Database, Clock, ChevronRight } from 'lucide-react';

const BlockchainStatistics = () => {
  return (
    <>
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
    </>
  );
};

export default BlockchainStatistics;
