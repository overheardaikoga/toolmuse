import React, { useState, useEffect, useRef } from 'react';
import type { ThemeKey, PortfolioData, ImageSlots, ModalType } from './types';
import { THEMES, DEFAULT_DATA } from './constants';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Preview } from './components/Preview';
import { Modals } from './components/Modals';

const App: React.FC = () => {
  // --- State ---
  const [currentTheme, setCurrentTheme] = useState<ThemeKey>('aurora');
  const [data, setData] = useState<PortfolioData>(DEFAULT_DATA);
  const [images, setImages] = useState<ImageSlots>({});
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  
  // Ref for file input
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- Effects ---

  // Load from LocalStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('hs-theme') as ThemeKey;
    if (savedTheme && THEMES[savedTheme]) {
      setCurrentTheme(savedTheme);
    }

    const savedHeadline = localStorage.getItem('portfolio-text-headline');
    const savedSubline = localStorage.getItem('portfolio-text-subline');
    const savedAbout = localStorage.getItem('portfolio-text-about');
    const savedCTA = localStorage.getItem('portfolio-cta');

    setData(prev => ({
      ...prev,
      headline: savedHeadline || prev.headline,
      subline: savedSubline || prev.subline,
      about: savedAbout || prev.about,
      cta: savedCTA || prev.cta,
    }));

    const loadedImages: ImageSlots = {};
    for (let i = 1; i <= 5; i++) {
      const savedImg = localStorage.getItem(`portfolio-image-${i}`);
      if (savedImg) {
        loadedImages[i.toString()] = savedImg;
      }
    }
    setImages(loadedImages);
  }, []);

  // --- Handlers ---

  const handleThemeChange = (theme: ThemeKey) => {
    setCurrentTheme(theme);
    localStorage.setItem('hs-theme', theme);
  };

  const handleSaveDraft = () => {
    localStorage.setItem('portfolio-text-headline', data.headline);
    localStorage.setItem('portfolio-text-subline', data.subline);
    localStorage.setItem('portfolio-text-about', data.about);
    localStorage.setItem('portfolio-cta', data.cta);
    
    alert("Draft Saved Successfully!");
  };

  const handlePublish = () => {
    const message = {
      type: 'editor-message',
      editorId: 'portfolio',
      version: '1.0',
      payload: {
        status: 'success',
        preview: data.headline,
        link: 'https://portfolio-editor-ivory.vercel.app',
      },
    };
    const target = window.opener ?? window.parent;
    if (!target) {
      console.warn('No opener or parent to send message');
      return;
    }
    target.postMessage(message, '*');
  };

  const handleTextUpdate = (key: keyof PortfolioData, value: string) => {
    setData(prev => ({ ...prev, [key]: value }));
    localStorage.setItem(`portfolio-text-${key}`, value);
    setActiveModal(null);
  };

  const handleCTAUpdate = (value: string) => {
    setData(prev => ({ ...prev, cta: value }));
    localStorage.setItem('portfolio-cta', value);
    setActiveModal(null);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file: File) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        if (!base64) return;

        // Find first empty slot
        let targetSlot = null;
        for (let i = 1; i <= 5; i++) {
          if (!images[i.toString()]) {
            targetSlot = i.toString();
            break;
          }
        }

        // If full, replace first slot
        if (!targetSlot) targetSlot = "1";

        setImages(prev => ({ ...prev, [targetSlot as string]: base64 }));
        localStorage.setItem(`portfolio-image-${targetSlot}`, base64);
      };
      reader.readAsDataURL(file);
    });

    // Reset input
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleClearImage = (type: 'current' | 'all') => {
    if (type === 'current' && selectedSlot) {
      const newImages = { ...images };
      delete newImages[selectedSlot];
      setImages(newImages);
      localStorage.removeItem(`portfolio-image-${selectedSlot}`);
      setSelectedSlot(null);
    } else if (type === 'all') {
      setImages({});
      for (let i = 1; i <= 5; i++) {
        localStorage.removeItem(`portfolio-image-${i}`);
      }
      setSelectedSlot(null);
    }
    setActiveModal(null);
  };

  const activeThemeData = THEMES[currentTheme];

  return (
    <div 
      className="min-h-screen flex flex-col text-white transition-all duration-700 ease-in-out"
      style={{ background: activeThemeData.bg }}
    >
      <Header 
        currentTheme={currentTheme} 
        onThemeChange={handleThemeChange} 
        onSave={handleSaveDraft}
        onPublish={handlePublish}
        themeData={activeThemeData}
      />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
          onOpenModal={setActiveModal} 
          onUpload={handleUploadClick}
          selectedSlot={selectedSlot}
        />

        <main className="flex-1 overflow-y-auto relative p-8 flex items-center justify-center">
          <Preview 
            themeData={activeThemeData}
            data={data}
            images={images}
            selectedSlot={selectedSlot}
            onSelectSlot={setSelectedSlot}
            onUpdateText={handleTextUpdate}
          />
        </main>
      </div>

      {/* Hidden Input for uploads */}
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        accept="image/png, image/jpeg, image/gif" 
        multiple 
        onChange={handleFileChange}
      />

      {/* Modals Layer */}
      {activeModal && (
        <Modals 
          type={activeModal}
          onClose={() => setActiveModal(null)}
          data={data}
          onUpdateText={handleTextUpdate}
          onUpdateCTA={handleCTAUpdate}
          onClearImage={handleClearImage}
          onThemeChange={handleThemeChange}
          selectedSlot={selectedSlot}
        />
      )}
    </div>
  );
};

export default App;