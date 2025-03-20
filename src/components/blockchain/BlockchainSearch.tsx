
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface BlockchainSearchProps {
  onSearch: (query: string) => void;
}

const BlockchainSearch = ({ onSearch }: BlockchainSearchProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
      toast({
        title: "Search Results",
        description: `Showing results for "${searchQuery}"`,
      });
    }
  };

  return (
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
  );
};

export default BlockchainSearch;
