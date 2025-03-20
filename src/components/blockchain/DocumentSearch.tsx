
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface DocumentSearchProps {
  onSearch: (docId: string) => void;
}

const DocumentSearch = ({ onSearch }: DocumentSearchProps) => {
  const [docId, setDocId] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (docId.trim()) {
      onSearch(docId.trim());
      toast({
        title: "Document Search",
        description: `Searching for document ID: ${docId}`,
      });
    }
  };

  return (
    <Card className="border-border">
      <CardHeader className="pb-0">
        <CardTitle className="text-xl flex items-center gap-2">
          <FileText className="h-5 w-5 text-logistics-blue" />
          Search by Document ID
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSearch} className="flex items-center gap-2 mt-4">
          <div className="relative flex-1">
            <Input
              type="text" 
              placeholder="Enter document ID (e.g. BOL-123456, INV-789012)"
              value={docId}
              onChange={(e) => setDocId(e.target.value)}
              className="pl-4 pr-4"
            />
          </div>
          <Button type="submit" variant="outline">
            Find Document
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default DocumentSearch;
