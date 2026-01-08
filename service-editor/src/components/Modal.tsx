
import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white border border-slate-200 rounded-[32px] p-10 w-full max-w-lg shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)]"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-2xl font-black tracking-tight text-slate-900 uppercase text-xs tracking-[0.3em]">{title}</h3>
          <button onClick={onClose} className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-all">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
