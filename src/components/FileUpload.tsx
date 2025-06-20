
import React, { useRef, useState } from 'react';
import { Upload, File, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  selectedFile: File | null;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect, selectedFile }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setDragOver(false);
    
    const file = event.dataTransfer.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (event: React.DragEvent) => {
    event.preventDefault();
    setDragOver(false);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const removeFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    // Reset by calling with null - we'll handle this in the parent
  };

  return (
    <div className="space-y-4">
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-all cursor-pointer ${
          dragOver
            ? 'border-blue-500 bg-blue-500/10'
            : selectedFile
            ? 'border-green-500 bg-green-500/10'
            : 'border-slate-600 hover:border-slate-500'
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileSelect}
          className="hidden"
          accept="*/*"
        />
        
        {selectedFile ? (
          <div className="space-y-3">
            <File className="w-12 h-12 mx-auto text-green-400" />
            <div>
              <p className="text-white font-medium">{selectedFile.name}</p>
              <p className="text-slate-400 text-sm">{formatFileSize(selectedFile.size)}</p>
            </div>
            <Badge variant="secondary" className="bg-green-500/20 text-green-400">
              File Selected
            </Badge>
          </div>
        ) : (
          <div className="space-y-3">
            <Upload className="w-12 h-12 mx-auto text-slate-400" />
            <div>
              <p className="text-white font-medium">Drop your file here</p>
              <p className="text-slate-400 text-sm">or click to browse</p>
            </div>
            <p className="text-slate-500 text-xs">Supports all file types</p>
          </div>
        )}
      </div>

      {selectedFile && (
        <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
          <div className="flex items-center gap-3">
            <File className="w-4 h-4 text-blue-400" />
            <div>
              <p className="text-white text-sm font-medium">{selectedFile.name}</p>
              <p className="text-slate-400 text-xs">{formatFileSize(selectedFile.size)}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={removeFile}
            className="text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
