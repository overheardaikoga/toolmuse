import React from 'react';
import type { ThemeData, PortfolioData, ImageSlots } from '../types';
interface PreviewProps {
  themeData: ThemeData;
  data: PortfolioData;
  images: ImageSlots;
  selectedSlot: string | null;
  onSelectSlot: (slot: string) => void;
  onUpdateText: (key: keyof PortfolioData, value: string) => void;
}

export const Preview: React.FC<PreviewProps> = ({ 
  themeData, 
  data, 
  images, 
  selectedSlot,
  onSelectSlot,
  onUpdateText
}) => {
  
  const handleBlur = (key: keyof PortfolioData, e: React.FocusEvent<HTMLElement>) => {
    const newVal = e.currentTarget.textContent;
    if (newVal !== null && newVal !== data[key]) {
      onUpdateText(key, newVal);
    }
  };

  const handleKeyDown = (key: keyof PortfolioData, e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.currentTarget.blur();
    }
  };

  return (
    <div 
      className="w-full max-w-5xl rounded-3xl p-10 lg:p-14 text-center transition-all duration-700 ease-in-out border overflow-hidden relative"
      style={{
        background: 'rgba(15, 5, 40, 0.4)',
        borderColor: 'rgba(255, 255, 255, 0.15)',
        boxShadow: 'none'
      }}
    >
      {/* Decorative Top Line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

      {/* Header Text - Editable */}
      <div className="relative group mb-2 inline-block">
        <h1 
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => handleBlur('headline', e)}
          onKeyDown={(e) => handleKeyDown('headline', e)}
          className="text-6xl font-bold tracking-tight text-white drop-shadow-2xl outline-none min-w-[200px] cursor-text decoration-white/20 hover:decoration-white/50"
          title="Click to edit"
        >
          {data.headline}
        </h1>
        {/* Helper icon */}
        <span className="absolute -right-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-30 text-white pointer-events-none transition-opacity">
          <span className="material-symbols-outlined text-xl">edit</span>
        </span>
      </div>
      
      <div className="block mb-12 relative group/sub">
        <p 
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => handleBlur('subline', e)}
          onKeyDown={(e) => handleKeyDown('subline', e)}
          className="inline-block text-xl font-light tracking-widest text-white/70 uppercase outline-none min-w-[100px] hover:text-white/90 transition-colors cursor-text border-b border-transparent hover:border-white/10 pb-1"
        >
          {data.subline}
        </p>
      </div>

      {/* Gallery Grid - ONE LINE, NO SCROLL, NO SHADOW */}
      <div className="w-full mb-12 flex justify-center px-2">
          <div className="flex w-full gap-4 justify-between items-center">
            {[1, 2, 3, 4, 5].map((num) => {
              const slotId = num.toString();
              const hasImage = !!images[slotId];
              const isSelected = selectedSlot === slotId;

              return (
                <div 
                  key={slotId}
                  onClick={() => onSelectSlot(slotId)}
                  className={`
                    relative flex-1 aspect-[2/3] rounded-lg overflow-hidden cursor-pointer
                    transition-all duration-300 ease-out border border-white/10
                    ${isSelected 
                      ? 'ring-1 ring-white scale-105 z-10 opacity-100' 
                      : 'bg-white/5 opacity-70 hover:opacity-100 hover:scale-105'
                    }
                  `}
                  style={{ boxShadow: 'none' }}
                >
                  {hasImage ? (
                    <img 
                      src={images[slotId]} 
                      alt={`Slot ${slotId}`} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-white/20 group-hover:text-white/50 transition-colors bg-gradient-to-br from-white/5 to-transparent">
                      <span className="material-symbols-outlined text-3xl mb-2 font-light">add</span>
                    </div>
                  )}
                  
                  {/* Hover Overlay */}
                  <div className={`absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none ${isSelected ? 'opacity-0' : ''}`} />
                </div>
              );
            })}
          </div>
      </div>

      {/* About Text - Bottom Section */}
      <div className="max-w-2xl mx-auto mb-10 group/about relative">
        <p 
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => handleBlur('about', e)}
          className="text-lg leading-relaxed text-white/60 outline-none hover:text-white/80 transition-colors cursor-text p-2 rounded hover:bg-white/5"
        >
          {data.about}
        </p>
      </div>

      {/* CTA Button */}
      <button 
        className="px-10 py-4 rounded-full font-bold text-sm tracking-widest uppercase hover:scale-105 active:scale-95 transition-all duration-300"
        style={{
          background: themeData.ctaGradient,
          color: themeData.ctaColor,
          boxShadow: themeData.ctaShadow
        }}
      >
        {data.cta}
      </button>
    </div>
  );
};