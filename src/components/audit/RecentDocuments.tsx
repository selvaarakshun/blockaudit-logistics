
import { FileText, FileDown, Eye } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";

interface Document {
  name: string;
  id: string;
  date: string;
}

const RecentDocuments = () => {
  const recentDocuments: Document[] = [
    { name: 'Bill of Lading', id: 'BOL-12345', date: '2023-05-14' },
    { name: 'Customs Declaration', id: 'CDF-98765', date: '2023-05-13' },
    { name: 'Certificate of Origin', id: 'COO-54321', date: '2023-05-12' }
  ];

  const handleDownload = (doc: Document) => {
    toast({
      title: "Download Started",
      description: `Downloading ${doc.name} (${doc.id})`,
    });
  };

  const handleView = (doc: Document) => {
    toast({
      title: "Opening Document",
      description: `Viewing ${doc.name} (${doc.id})`,
    });
  };

  return (
    <div className="bg-white dark:bg-logistics-dark/50 rounded-xl border border-border overflow-hidden">
      <div className="px-4 py-3 border-b border-border">
        <h3 className="font-medium">Recent Documents</h3>
      </div>
      <div className="p-4">
        <div className="space-y-3">
          {recentDocuments.map((doc, index) => (
            <div 
              key={index}
              className="p-3 rounded-md border border-border bg-white dark:bg-logistics-dark hover:shadow-subtle transition-all"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <FileText className="size-4 text-logistics-blue" />
                  <span className="font-medium">{doc.name}</span>
                </div>
                <span className="text-xs text-logistics-gray">{doc.date}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-logistics-gray">{doc.id}</span>
                <div className="flex items-center gap-2">
                  <button 
                    className="text-logistics-blue hover:text-logistics-blue/80"
                    onClick={() => handleView(doc)}
                    title="View Document"
                  >
                    <Eye className="size-4" />
                  </button>
                  <button 
                    className="text-logistics-blue hover:text-logistics-blue/80"
                    onClick={() => handleDownload(doc)}
                    title="Download Document"
                  >
                    <FileDown className="size-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentDocuments;
