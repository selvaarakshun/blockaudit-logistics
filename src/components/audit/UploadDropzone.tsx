
import React, { useState } from 'react';
import { Upload } from 'lucide-react';

interface UploadDropzoneProps {
  onFilesAdded: (fileList: FileList) => void;
}

const UploadDropzone = ({ onFilesAdded }: UploadDropzoneProps) => {
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
      onFilesAdded(e.dataTransfer.files);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    
    if (e.target.files && e.target.files.length > 0) {
      onFilesAdded(e.target.files);
    }
  };

  return (
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
  );
};

export default UploadDropzone;
