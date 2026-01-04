import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  themeColor: string;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, themeColor }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Content */}
      <div 
        className="relative z-10 w-full max-w-md rounded-2xl border border-white/10 bg-[#0F051A]/95 p-6 shadow-2xl backdrop-blur-xl transition-all"
        style={{ boxShadow: `0 0 40px ${themeColor}20`, borderColor: `${themeColor}40` }}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white tracking-tight">{title}</h3>
          <button 
            onClick={onClose}
            className="text-white/50 hover:text-white transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        
        <div className="space-y-4">
          {children}
        </div>
      </div>
    </div>
  );
};