import React from 'react';
import type { ModalType } from '../types';

interface SidebarProps {
  onOpenModal: (type: ModalType) => void;
  onUpload: () => void;
  selectedSlot: string | null;
}

export const Sidebar: React.FC<SidebarProps> = ({ onOpenModal, onUpload, selectedSlot }) => {
  return (
    <aside className="w-[300px] p-8 flex flex-col gap-6 border-r border-white/5 bg-[#080410] z-40 relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-[200px] bg-purple-900/10 blur-[80px] pointer-events-none" />

      <div>
        <h3 className="text-xs font-bold text-white/40 tracking-widest uppercase mb-6 pl-2">Tools</h3>
        <div className="flex flex-col gap-3">
          
          <div className="relative group">
            <button 
              onClick={onUpload}
              className="w-full flex items-center gap-4 h-[56px] px-5 rounded-2xl bg-white/5 hover:bg-white/10 hover:shadow-lg hover:shadow-purple-500/10 transition-all text-white font-medium group text-left border border-white/5"
            >
              <div className="size-8 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-300 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-xl">upload_file</span>
              </div>
              <span>Upload Assets</span>
            </button>
            
            {/* Helper bucket icon for clearing */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (!selectedSlot) {
                   alert("Please select an image on the canvas first to clear it.");
                   return;
                }
                onOpenModal('clear');
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/10 hover:text-red-400 transition-colors p-2"
              title="Clear selected image"
            >
              <span className="material-symbols-outlined text-lg">delete</span>
            </button>
          </div>

          <button 
            onClick={() => onOpenModal('text')}
            className="w-full flex items-center gap-4 h-[56px] px-5 rounded-2xl bg-white/5 hover:bg-white/10 hover:shadow-lg hover:shadow-cyan-500/10 transition-all text-white font-medium group text-left border border-white/5"
          >
            <div className="size-8 rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-300 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-xl">edit_note</span>
            </div>
            <span>Edit Content</span>
          </button>

          <button 
            onClick={() => onOpenModal('action')}
            className="w-full flex items-center gap-4 h-[56px] px-5 rounded-2xl bg-white/5 hover:bg-white/10 hover:shadow-lg hover:shadow-yellow-500/10 transition-all text-white font-medium group text-left border border-white/5"
          >
            <div className="size-8 rounded-lg bg-yellow-500/20 flex items-center justify-center text-yellow-300 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-xl">bolt</span>
            </div>
            <span>Action Button</span>
          </button>

        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-xs font-bold text-white/40 tracking-widest uppercase mb-4 pl-2">Style</h3>
        <button 
            onClick={() => onOpenModal('accent')}
            className="w-full flex items-center gap-4 h-[56px] px-5 rounded-2xl bg-gradient-to-r from-white/5 to-transparent hover:from-white/10 transition-all text-white/80 font-medium group text-left border border-white/5"
          >
            <div className="size-8 rounded-full border border-white/20 flex items-center justify-center">
              <span className="block size-3 rounded-full bg-gradient-to-tr from-purple-400 to-cyan-400" />
            </div>
            <span>Accent Colors</span>
          </button>
      </div>

      <div className="mt-auto pt-6 border-t border-white/5 text-[10px] text-white/20 text-center tracking-wider">
        RETROFUTUR SYSTEM V2.0
      </div>
    </aside>
  );
};