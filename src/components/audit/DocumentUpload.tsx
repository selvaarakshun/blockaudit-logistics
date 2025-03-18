
import { useState } from 'react';
import { Upload, X, CheckCircle, AlertCircle } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";
import { Progress } from "@/components/ui/progress";

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  progress: number;
  status: 'uploading' | 'success' | 'error';
  error?: string;
}

const DocumentUpload = () => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };
  
  const handleFiles = (fileList: FileList) => {
    const newFiles: UploadedFile[] = Array.from(fileList).map(file => ({
      id: `file-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      name: file.name,
      size: file.size,
      progress: 0,
      status: 'uploading'
    }));
    
    setFiles(prev => [...prev, ...newFiles]);
    
    // Simulate upload progress for each file
    newFiles.forEach(file => {
      const intervalId = setInterval(() => {
        setFiles(prev => {
          const fileIndex = prev.findIndex(f => f.id === file.id);
          if (fileIndex === -1) return prev;
          
          const updatedFiles = [...prev];
          const currentFile = updatedFiles[fileIndex];
          
          // Randomly simulate some errors
          if (currentFile.progress > 80 && Math.random() < 0.1 && currentFile.status === 'uploading') {
            clearInterval(intervalId);
            updatedFiles[fileIndex] = {
              ...currentFile,
              status: 'error',
              error: 'Upload failed. Server error.'
            };
            
            toast({
              title: "Upload Failed",
              description: `Failed to upload ${currentFile.name}. Please try again.`,
              variant: "destructive"
            });
            
            return updatedFiles;
          }
          
          if (currentFile.progress >= 100) {
            clearInterval(intervalId);
            updatedFiles[fileIndex] = {
              ...currentFile,
              progress: 100,
              status: 'success'
            };
            
            toast({
              title: "Upload Complete",
              description: `${currentFile.name} has been uploaded successfully.`,
            });
            
            return updatedFiles;
          }
          
          updatedFiles[fileIndex] = {
            ...currentFile,
            progress: Math.min(currentFile.progress + Math.random() * 10, 100)
          };
          
          return updatedFiles;
        });
      }, 300);
    });
  };
  
  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(file => file.id !== id));
    toast({
      description: "File removed from upload list.",
    });
  };
  
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="bg-white dark:bg-logistics-dark/50 rounded-xl border border-border overflow-hidden">
      <div className="px-4 py-3 border-b border-border">
        <h3 className="font-medium">Upload Documents</h3>
      </div>
      <div className="p-4">
        <div 
          className={`border-2 border-dashed rounded-lg p-6 text-center ${
            dragActive ? 'border-logistics-blue bg-logistics-blue/5' : 'border-border'
          }`}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
        >
          <Upload className="size-12 mx-auto text-logistics-gray mb-4" />
          <p className="text-sm mb-2">Drag and drop files here or</p>
          <label className="btn-secondary cursor-pointer inline-block">
            <span>Browse Files</span>
            <input 
              type="file" 
              multiple 
              className="hidden" 
              onChange={handleChange}
              accept=".pdf,.csv,.json,.txt,.doc,.docx"
            />
          </label>
          <p className="text-xs text-logistics-gray mt-2">
            Supported formats: PDF, CSV, JSON, TXT, DOC, DOCX
          </p>
        </div>
        
        {files.length > 0 && (
          <div className="mt-4 space-y-3">
            <h4 className="text-sm font-medium">Uploads ({files.length})</h4>
            {files.map(file => (
              <div key={file.id} className="border rounded-md p-3">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1 pr-4">
                    <div className="flex justify-between">
                      <div className="text-sm font-medium truncate max-w-[200px]">{file.name}</div>
                      <div className="text-xs text-logistics-gray">{formatFileSize(file.size)}</div>
                    </div>
                    <Progress 
                      value={file.progress} 
                      className="h-2 mt-2"
                      indicatorClassName={file.status === 'error' ? 'bg-red-500' : undefined}
                    />
                  </div>
                  <button 
                    className="text-logistics-gray hover:text-logistics-blue"
                    onClick={() => removeFile(file.id)}
                  >
                    <X className="size-4" />
                  </button>
                </div>
                <div className="flex items-center text-xs">
                  {file.status === 'uploading' && (
                    <span className="text-logistics-blue">Uploading: {file.progress.toFixed(0)}%</span>
                  )}
                  {file.status === 'success' && (
                    <span className="text-green-600 flex items-center gap-1">
                      <CheckCircle className="size-3" />
                      Upload complete
                    </span>
                  )}
                  {file.status === 'error' && (
                    <span className="text-red-500 flex items-center gap-1">
                      <AlertCircle className="size-3" />
                      {file.error || 'Upload failed'}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentUpload;
