
import React, { useCallback, useState } from 'react';
import { UploadIcon } from './Icons';
import type { DragEvent, ChangeEvent } from 'react';

interface ImagePreviewProps {
  title: string;
  imageUrl: string | null;
  isLoading: boolean;
  loadingMessage?: string;
  onImageUpload?: (file: File) => void;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({ title, imageUrl, isLoading, loadingMessage, onImageUpload }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImageUpload?.(e.target.files[0]);
    }
  };

  const handleDrop = useCallback((e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onImageUpload?.(e.dataTransfer.files[0]);
    }
  }, [onImageUpload]);

  const handleDragOver = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragEnter = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  return (
    <div className="bg-slate-800/50 rounded-xl p-4 flex flex-col shadow-lg aspect-square">
      <h3 className="text-lg font-semibold text-center text-gray-400 mb-4">{title}</h3>
      <div className="flex-grow flex items-center justify-center relative w-full h-full min-h-0">
        {imageUrl ? (
          <img src={imageUrl} alt={title} className="max-w-full max-h-full object-contain rounded-lg" />
        ) : onImageUpload ? (
          <label 
            className={`w-full h-full flex flex-col items-center justify-center border-2 border-dashed rounded-lg cursor-pointer transition-colors ${isDragging ? 'border-cyan-400 bg-slate-700/50' : 'border-slate-600 hover:border-cyan-500 hover:bg-slate-800'}`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
          >
            <UploadIcon />
            <span className="mt-2 text-sm text-gray-400">Drag & drop or click to upload</span>
            <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
          </label>
        ) : null}
        
        {isLoading && (
          <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm flex flex-col items-center justify-center rounded-lg">
            <div className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
            {loadingMessage && <p className="mt-4 text-cyan-300">{loadingMessage}</p>}
          </div>
        )}
      </div>
    </div>
  );
};
