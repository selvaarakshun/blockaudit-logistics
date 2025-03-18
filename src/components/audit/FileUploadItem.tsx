
import React from 'react';
import { X, CheckCircle, AlertCircle } from 'lucide-react';
import { Progress } from "@/components/ui/progress";

export interface UploadedFile {
  id: string;
  name: string;
  size: number;
  progress: number;
  status: 'uploading' | 'success' | 'error';
  error?: string;
}

interface FileUploadItemProps {
  file: UploadedFile;
  onRemove: (id: string) => void;
}

const FileUploadItem = ({ file, onRemove }: FileUploadItemProps) => {
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="border rounded-md p-3">
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
          onClick={() => onRemove(file.id)}
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
  );
};

export default FileUploadItem;
