import React from 'react';
import type { ModalType, PortfolioData, ThemeKey } from '../types';
import { THEMES } from '../constants';

interface ModalsProps {
  type: ModalType;
  onClose: () => void;
  data: PortfolioData;
  onUpdateText: (key: keyof PortfolioData, value: string) => void;
  onUpdateCTA: (value: string) => void;
  onClearImage: (type: 'current' | 'all') => void;
  onThemeChange: (theme: ThemeKey) => void;
  selectedSlot: string | null;
}

export const Modals: React.FC<ModalsProps> = ({ 
  type, 
  onClose, 
  data, 
  onUpdateText, 
  onUpdateCTA, 
  onClearImage,
  onThemeChange,
  selectedSlot
}) => {
  if (!type) return null;

  const ModalWrapper: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div 
        className="w-[320px] rounded-2xl p-6 shadow-2xl border border-white/20 bg-[rgba(15,5,40,0.9)] backdrop-blur-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <button onClick={onClose} className="text-white/50 hover:text-white transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <div className="flex flex-col gap-3">
          {children}
        </div>
      </div>
    </div>
  );

  const PromptButton: React.FC<{ label: string; onClick: () => void; variant?: 'default' | 'danger' | 'cancel' }> = ({ label, onClick, variant = 'default' }) => {
    let bgClass = "bg-white/10 hover:bg-white/20 text-white";
    if (variant === 'danger') bgClass = "bg-red-500/20 hover:bg-red-500/40 text-red-100 border border-red-500/30";
    if (variant === 'cancel') bgClass = "bg-gray-700/50 hover:bg-gray-700 text-gray-300";

    return (
        <button 
          onClick={onClick}
          className={`w-full py-3 rounded-xl font-medium transition-all active:scale-95 text-left px-4 ${bgClass}`}
        >
          {label}
        </button>
    );
  };

  if (type === 'text') {
    return (
      <ModalWrapper title="Edit Text">
        <PromptButton 
            label="Headline" 
            onClick={() => {
                const val = prompt("Enter Headline:", data.headline);
                if(val) onUpdateText('headline', val);
            }} 
        />
        <PromptButton 
            label="Subline" 
            onClick={() => {
                const val = prompt("Enter Subline:", data.subline);
                if(val) onUpdateText('subline', val);
            }} 
        />
        <PromptButton 
            label="About Text" 
            onClick={() => {
                const val = prompt("Enter About Text:", data.about);
                if(val) onUpdateText('about', val);
            }} 
        />
      </ModalWrapper>
    );
  }

  if (type === 'action') {
    return (
      <ModalWrapper title="Customer Action">
        <PromptButton label="Contact Me" onClick={() => onUpdateCTA("Contact Me")} />
        <PromptButton label="Hire Me" onClick={() => onUpdateCTA("Hire Me")} />
        <PromptButton label="Get Quote" onClick={() => onUpdateCTA("Get Quote")} />
        <PromptButton label="Custom..." onClick={() => {
             const val = prompt("Enter Custom CTA:", data.cta);
             if(val) onUpdateCTA(val);
        }} />
      </ModalWrapper>
    );
  }

  if (type === 'accent') {
     return (
      <ModalWrapper title="Accent Colors">
         {(Object.keys(THEMES) as ThemeKey[]).map(key => (
             <PromptButton 
                key={key} 
                label={THEMES[key].name} 
                onClick={() => {
                    onThemeChange(key);
                    onClose();
                }} 
             />
         ))}
      </ModalWrapper>
    );
  }

  if (type === 'clear') {
    return (
      <ModalWrapper title="Remove Photo">
        <p className="text-sm text-white/60 mb-2">Manage your gallery images.</p>
        <PromptButton 
            label={selectedSlot ? `Clear Current (Slot ${selectedSlot})` : "Select a slot first"} 
            onClick={() => onClearImage('current')} 
            variant={selectedSlot ? 'danger' : 'cancel'}
        />
        <PromptButton label="Clear All Photos" onClick={() => onClearImage('all')} variant="danger" />
        <PromptButton label="Cancel" onClick={onClose} variant="cancel" />
      </ModalWrapper>
    );
  }

  return null;
};