
import React, { useState, useEffect } from 'react';
import { Palette, ChevronDown, Check } from 'lucide-react';
import { THEMES } from '../constants';


export const ThemeToggle: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<Theme>('aurora');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme) {
      setCurrentTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
  }, []);

  const handleThemeChange = (theme: Theme) => {
    setCurrentTheme(theme);
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-full border border-black/10 bg-white/50 backdrop-blur-sm hover:bg-white/80 transition-all duration-300"
      >
        <Palette className="w-4 h-4 theme-accent-text" />
        <span className="text-sm font-medium capitalize">{currentTheme}</span>
        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-black/5 overflow-hidden z-50">
            <div className="p-2 space-y-1">
              {THEMES.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => handleThemeChange(theme.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm transition-colors duration-200 ${
                    currentTheme === theme.id 
                      ? 'bg-black/5 theme-accent-text font-semibold' 
                      : 'hover:bg-black/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: theme.color }}
                    />
                    <span className="capitalize">{theme.label}</span>
                  </div>
                  {currentTheme === theme.id && <Check className="w-4 h-4" />}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
