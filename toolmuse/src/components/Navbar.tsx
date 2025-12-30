
import React from 'react';
import { ThemeToggle } from './ThemeToggle';
import { Zap, Menu } from 'lucide-react';

export const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between pointer-events-none">
      <div className="flex items-center gap-3 bg-white/70 backdrop-blur-md px-4 py-2 rounded-full border border-black/5 shadow-sm pointer-events-auto">
        <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white">
          <Zap className="w-5 h-5" />
        </div>
        <span className="font-bold text-lg tracking-tight">ToolMuse</span>
      </div>

      <div className="flex items-center gap-4 pointer-events-auto">
        <ThemeToggle />
        <button className="p-3 bg-white/70 backdrop-blur-md rounded-full border border-black/5 shadow-sm hover:bg-white transition-all">
          <Menu className="w-5 h-5" />
        </button>
      </div>
    </nav>
  );
};
