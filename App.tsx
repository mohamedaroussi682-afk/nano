
import React, { useState, useCallback } from 'react';
import { editImageWithGemini } from './services/geminiService';
import { ImagePreview } from './components/ImagePreview';
import { PromptInput } from './components/PromptInput';
import { ActionButton } from './components/ActionButton';
import { Header } from './components/Header';
import { MagicWandIcon, DownloadIcon, AlertIcon } from './components/Icons';
import type { ImageFile } from './types';

const App: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<ImageFile | null>(null);
  const [editedImageUrl, setEditedImageUrl] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [modelMessage, setModelMessage] = useState<string | null>(null);

  const handleImageUpload = (file: File) => {
    setOriginalImage({
      file: file,
      url: URL.createObjectURL(file),
    });
    setEditedImageUrl(null);
    setError(null);
    setModelMessage(null);
  };

  const handleEdit = useCallback(async () => {
    if (!originalImage || !prompt) {
      setError('Please upload an image and provide a prompt.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setEditedImageUrl(null);
    setModelMessage(null);

    try {
      const result = await editImageWithGemini(originalImage.file, prompt);
      if (result.imageUrl) {
        setEditedImageUrl(result.imageUrl);
      }
      if (result.text) {
          setModelMessage(result.text);
      }
    } catch (e) {
      console.error(e);
      setError('Failed to edit image. Please check the console for details.');
    } finally {
      setIsLoading(false);
    }
  }, [originalImage, prompt]);

  const handleDownload = () => {
    if (!editedImageUrl) return;
    const link = document.createElement('a');
    link.href = editedImageUrl;
    link.download = `edited_${originalImage?.file.name ?? 'image.png'}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-gray-200 flex flex-col p-4 sm:p-6 lg:p-8">
      <Header />
      <main className="flex-grow container mx-auto max-w-7xl mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Image Previews */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <ImagePreview
              title="Original Image"
              imageUrl={originalImage?.url}
              onImageUpload={handleImageUpload}
              isLoading={false}
            />
            <ImagePreview
              title="Edited Image"
              imageUrl={editedImageUrl}
              isLoading={isLoading}
              loadingMessage="Gemini is working its magic..."
            />
          </div>

          {/* Controls */}
          <div className="lg:col-span-4 bg-slate-800/50 rounded-xl p-6 shadow-2xl h-fit">
            <h2 className="text-xl font-bold text-cyan-400 mb-4">Controls</h2>
            <div className="space-y-6">
              <PromptInput value={prompt} onChange={setPrompt} />
              <ActionButton
                onClick={handleEdit}
                disabled={!originalImage || !prompt || isLoading}
                isLoading={isLoading}
                text="Edit with Gemini"
                icon={<MagicWandIcon />}
                className="w-full bg-cyan-600 hover:bg-cyan-700 disabled:bg-cyan-800/50"
              />
              <ActionButton
                onClick={handleDownload}
                disabled={!editedImageUrl}
                text="Download Image"
                icon={<DownloadIcon />}
                className="w-full bg-slate-600 hover:bg-slate-700 disabled:bg-slate-800/50"
              />
              {error && (
                <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg flex items-center gap-3">
                  <AlertIcon />
                  <span className="text-sm">{error}</span>
                </div>
              )}
              {modelMessage && (
                <div className="bg-blue-900/50 border border-blue-700 text-blue-300 px-4 py-3 rounded-lg text-sm">
                    <p className="font-semibold mb-1">Message from Gemini:</p>
                    <p>{modelMessage}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
