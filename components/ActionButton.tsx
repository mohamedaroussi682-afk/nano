
import React from 'react';
import type { ReactNode } from 'react';

interface ActionButtonProps {
  onClick: () => void;
  disabled: boolean;
  isLoading?: boolean;
  text: string;
  icon?: ReactNode;
  className?: string;
}

export const ActionButton: React.FC<ActionButtonProps> = ({ onClick, disabled, isLoading, text, icon, className }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-cyan-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {isLoading ? (
        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      ) : (
        <>
          {icon && <span className="mr-2 h-5 w-5">{icon}</span>}
          {text}
        </>
      )}
    </button>
  );
};
