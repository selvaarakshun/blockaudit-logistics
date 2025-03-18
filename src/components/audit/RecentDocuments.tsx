
import { FileText, FileDown, Eye, Upload } from 'lucide-react';
import { useState } from 'react';
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";

interface Document {
  name: string;
  id: string;
  date: string;
  fileType: 'pdf' | 'csv' | 'json';
}

const RecentDocuments = () => {
  const [recentDocuments, setRecentDocuments] = useState<Document[]>([
    { name: 'Bill of Lading', id: 'BOL-12345', date: '2023-05-14', fileType: 'pdf' },
    { name: 'Customs Declaration', id: 'CDF-98765', date: '2023-05-13', fileType: 'csv' },
    { name: 'Certificate of Origin', id: 'COO-54321', date: '2023-05-12', fileType: 'json' }
  ]);
  const [uploading, setUploading] = useState(false);

  const handleDownload = (doc: Document) => {
    toast({
      title: "Download Started",
      description: `Downloading ${doc.name} (${doc.id})`,
    });
    
    // Create a sample file based on the document type
    setTimeout(() => {
      const fileContent = doc.fileType === 'json' 
        ? JSON.stringify({ id: doc.id, name: doc.name, date: doc.date }) 
        : doc.fileType === 'csv'
          ? `id,name,date\n${doc.id},${doc.name},${doc.date}`
          : `Sample ${doc.name} content for ${doc.id}`;
      
      const blob = new Blob([fileContent], { type: `application/${doc.fileType}` });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${doc.name}-${doc.id}.${doc.fileType}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast({
        title: "Download Complete",
        description: `${doc.name} (${doc.id}) has been downloaded.`,
      });
    }, 1000);
  };

  const handleView = (doc: Document) => {
    toast({
      title: "Opening Document",
      description: `Viewing ${doc.name} (${doc.id})`,
    });
    
    setTimeout(() => {
      toast({
        title: "Document Preview",
        description: `This is a preview of ${doc.name} (${doc.id}). In a real app, this would open a document preview.`,
      });
    }, 500);
  };
  
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const file = e.target.files[0];
    setUploading(true);
    
    // Simulate upload
    setTimeout(() => {
      const newDoc: Document = {
        name: file.name.split('.')[0],
        id: `DOC-${Math.floor(Math.random() * 100000)}`,
        date: new Date().toISOString().split('T')[0],
        fileType: (file.name.split('.').pop() as 'pdf' | 'csv' | 'json') || 'pdf'
      };
      
      setRecentDocuments([newDoc, ...recentDocuments]);
      setUploading(false);
      
      toast({
        title: "Upload Complete",
        description: `${file.name} has been uploaded successfully.`,
      });
      
      // Reset the input
      e.target.value = '';
    }, 1500);
  };

  return (
    <div className="bg-white dark:bg-logistics-dark/50 rounded-xl border border-border overflow-hidden">
      <div className="px-4 py-3 border-b border-border">
        <h3 className="font-medium">Recent Documents</h3>
      </div>
      <div className="p-4">
        <div className="mb-4">
          <label htmlFor="upload-document" className="w-full">
            <div className={`btn-primary w-full flex items-center justify-center gap-1 cursor-pointer ${uploading ? 'opacity-80 cursor-wait' : ''}`}>
              <Upload className="size-4" />
              <span>{uploading ? 'Uploading...' : 'Upload Document'}</span>
            </div>
            <input 
              type="file" 
              id="upload-document"
              className="hidden"
              accept=".pdf,.csv,.json" 
              onChange={handleUpload}
              disabled={uploading}
            />
          </label>
        </div>
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
