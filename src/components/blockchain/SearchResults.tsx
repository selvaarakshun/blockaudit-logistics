
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Database, Key } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';

interface SearchResultsProps {
  query: string;
}

const SearchResults = ({ query }: SearchResultsProps) => {
  const [resultType, setResultType] = useState<'transaction' | 'block' | 'address' | 'notFound'>(
    query.startsWith('0x') && query.length === 66 ? 'transaction' :
    !isNaN(Number(query)) ? 'block' :
    query.startsWith('0x') && query.length === 42 ? 'address' : 'notFound'
  );
  
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [query]);

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-10 w-10 bg-logistics-light-blue dark:bg-logistics-blue/10 rounded-full mb-4"></div>
            <div className="h-4 w-64 bg-logistics-light-gray dark:bg-white/10 rounded mb-2"></div>
            <div className="h-4 w-40 bg-logistics-light-gray dark:bg-white/10 rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (resultType === 'notFound') {
    return (
      <Card>
        <CardContent className="flex flex-col items-center py-8">
          <div className="bg-logistics-light-gray dark:bg-white/5 rounded-full p-3 mb-4">
            <FileText className="h-6 w-6 text-logistics-gray" />
          </div>
          <h3 className="text-xl font-semibold mb-2">No results found</h3>
          <p className="text-logistics-gray text-center max-w-md">
            We couldn't find any transactions, blocks, or addresses matching "{query}"
          </p>
        </CardContent>
      </Card>
    );
  }

  if (resultType === 'transaction') {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-logistics-blue" />
            Transaction Found
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-logistics-gray mb-1">Transaction Hash</h3>
              <p className="font-mono text-sm bg-logistics-light-gray dark:bg-white/5 p-2 rounded-md overflow-x-auto">
                {query}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h3 className="text-sm font-medium text-logistics-gray mb-1">Block</h3>
                <p className="text-lg font-semibold">#4832671</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-logistics-gray mb-1">Value</h3>
                <p className="text-lg font-semibold">1.25 ETH</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-logistics-gray mb-1">Status</h3>
                <div className="flex items-center gap-1 text-logistics-success">
                  <div className="size-2 bg-logistics-success rounded-full"></div>
                  <span>Confirmed</span>
                </div>
              </div>
            </div>
            
            <Button>View Transaction Details</Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (resultType === 'block') {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5 text-logistics-blue" />
            Block Found
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h3 className="text-sm font-medium text-logistics-gray mb-1">Block Number</h3>
                <p className="text-lg font-semibold">#{query}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-logistics-gray mb-1">Transactions</h3>
                <p className="text-lg font-semibold">156</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-logistics-gray mb-1">Size</h3>
                <p className="text-lg font-semibold">42.3 KB</p>
              </div>
            </div>
            
            <Button>View Block Details</Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (resultType === 'address') {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="h-5 w-5 text-logistics-blue" />
            Address Found
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-logistics-gray mb-1">Address</h3>
              <p className="font-mono text-sm bg-logistics-light-gray dark:bg-white/5 p-2 rounded-md overflow-x-auto">
                {query}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h3 className="text-sm font-medium text-logistics-gray mb-1">Balance</h3>
                <p className="text-lg font-semibold">148.32 ETH</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-logistics-gray mb-1">Transactions</h3>
                <p className="text-lg font-semibold">328</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-logistics-gray mb-1">Last Activity</h3>
                <p className="text-lg font-semibold">2 hours ago</p>
              </div>
            </div>
            
            <Button>View Address Details</Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return null;
};

export default SearchResults;
