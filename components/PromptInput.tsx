
import React from 'react';
import type { ChangeEvent } from 'react';

interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const PromptInput: React.FC<PromptInputProps> = ({ value, onChange }) => {
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <div>
      <label htmlFor="prompt" className="block text-sm font-medium text-gray-300 mb-2">
        Your Prompt
      </label>
      <textarea
        id="prompt"
        rows={4}
        className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-gray-200 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors placeholder-slate-500"
        placeholder="e.g., add a party hat on the dog"
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};
