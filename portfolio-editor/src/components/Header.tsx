import React, { useState, useEffect, useRef } from 'react';
import type { ThemeKey, ThemeData } from '../types';
import { THEMES } from '../constants';

interface HeaderProps {
  currentTheme: ThemeKey;
  themeData: ThemeData;
  onThemeChange: (theme: ThemeKey) => void;
  onSave: () => void;
  onPublish: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  currentTheme, 
  themeData, 
  onThemeChange, 
  onSave, 
  onPublish 
}) => {
  const [showThemePanel, setShowThemePanel] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        setShowThemePanel(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="flex items-center justify-between px-8 h-[80px] z-50 bg-[#0a0019] border-b border-white/5 relative">
      
      {/* Brand */}
      <div className="flex items-center gap-3 text-white">
        <div 
          className="size-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 transition-all duration-500"
          style={{ 
            boxShadow: `0 0 20px ${themeData.color}40` 
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={themeData.color} strokeWidth="2">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" />
            <path d="M2 17L12 22L22 17" />
            <path d="M2 12L12 17L22 12" />
          </svg>
        </div>
        <h2 className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
          RetroFutur<span className="font-light text-white/40">Portfolio</span>
        </h2>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        <button 
          onClick={onSave}
          className="h-10 px-6 rounded-full font-medium text-sm bg-white/5 hover:bg-white/10 transition-all text-white border border-white/10"
        >
          Save Draft
        </button>
        
        <button 
          onClick={onPublish}
          className="h-10 px-8 rounded-full font-bold text-sm hover:brightness-110 hover:scale-105 transition-all shadow-lg"
          style={{ 
            background: themeData.color,
            color: '#fff',
            boxShadow: themeData.glow
          }}
        >
          Publish
        </button>

        {/* Theme Toggle */}
        <div className="relative" ref={panelRef}>
          <button 
            onClick={() => setShowThemePanel(!showThemePanel)}
            className="h-10 w-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all border border-white/10"
          >
            <span className="material-symbols-outlined text-xl">palette</span>
          </button>

          {showThemePanel && (
            <div className="absolute top-full right-0 mt-4 w-[240px] p-4 rounded-2xl bg-[#150a25] border border-white/10 grid grid-cols-5 gap-3 shadow-2xl">
              {(Object.keys(THEMES) as ThemeKey[]).map((themeKey) => {
                const theme = THEMES[themeKey];
                return (
                  <button
                    key={themeKey}
                    onClick={() => {
                      onThemeChange(themeKey);
                      setShowThemePanel(false);
                    }}
                    className={`w-9 h-9 rounded-full border-2 transition-transform hover:scale-110 ${currentTheme === themeKey ? 'border-white scale-110' : 'border-transparent'}`}
                    style={{ background: theme.color }}
                    title={theme.name}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};