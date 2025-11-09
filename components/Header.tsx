
import React from 'react';
import { SparklesIcon } from './Icons';

export const Header: React.FC = () => {
  return (
    <header className="text-center">
      <div className="flex items-center justify-center gap-4">
        <SparklesIcon />
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-500">
          Gemini Image Editor
        </h1>
      </div>
      <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-400">
        Upload an image, describe your edit, and let Gemini bring your vision to life.
      </p>
    </header>
  );
};
