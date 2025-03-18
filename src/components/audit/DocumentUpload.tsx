
import { useState } from 'react';
import { toast } from "@/components/ui/use-toast";
import UploadDropzone from './UploadDropzone';
import FileUploadItem, { UploadedFile } from './FileUploadItem';
import { uploadFile } from '@/services/uploadService';

const DocumentUpload = () => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  
  const handleFiles = (fileList: FileList) => {
    const newFiles: UploadedFile[] = Array.from(fileList).map(file => ({
      id: `file-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      name: file.name,
      size: file.size,
      progress: 0,
      status: 'uploading'
    }));
    
    setFiles(prev => [...prev, ...newFiles]);
    
    // Start the upload process for each file
    newFiles.forEach(file => {
      uploadFile(file, (updatedFile) => {
        setFiles(prev => {
          const fileIndex = prev.findIndex(f => f.id === file.id);
          if (fileIndex === -1) return prev;
          
          const updatedFiles = [...prev];
          updatedFiles[fileIndex] = updatedFile;
          
          return updatedFiles;
        });
      });
    });
  };
  
  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(file => file.id !== id));
    toast({
      description: "File removed from upload list.",
    });
  };

  return (
    <div className="bg-white dark:bg-logistics-dark/50 rounded-xl border border-border overflow-hidden">
      <div className="px-4 py-3 border-b border-border">
        <h3 className="font-medium">Upload Documents</h3>
      </div>
      <div className="p-4">
        <UploadDropzone onFilesAdded={handleFiles} />
        
        {files.length > 0 && (
          <div className="mt-4 space-y-3">
            <h4 className="text-sm font-medium">Uploads ({files.length})</h4>
            {files.map(file => (
              <FileUploadItem
                key={file.id}
                file={file}
                onRemove={removeFile}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentUpload;
