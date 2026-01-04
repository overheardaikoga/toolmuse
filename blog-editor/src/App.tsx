import React, { useState, useEffect, useRef } from 'react';
import { THEMES, INITIAL_TEXTS, PLACEHOLDER_AVATAR } from './constants';
import { ThemeKey, BlogTextState, BlogImageState, SlotKey } from './types';
import { Modal } from './components/Modal';
import { refineText } from './aiService';

const App: React.FC = () => {
  const handlePublish = () => {
  const message = {
    type: 'editor-message',
    editorId: 'blog',
    version: '1.0',
    payload: {
      status: 'success',
      preview: texts.headline,
      link: 'https://example.com/blog-post'
    }
  };

  const target = window.opener ?? window.parent;

  if (!target) {
    console.warn('No opener or parent to send message');
    return;
  }

  target.postMessage(message, '*');
};

  
  // --- STATE ---
  const [currentTheme, setCurrentTheme] = useState<ThemeKey>('aurora');
  const [texts, setTexts] = useState<BlogTextState>(INITIAL_TEXTS);
  const [images, setImages] = useState<BlogImageState>({
    avatar: PLACEHOLDER_AVATAR,
    post1: null,
    post2: null,
    post3: null,
  });

  // UI State
  const [activeSlot, setActiveSlot] = useState<SlotKey | null>(null);
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<'text' | 'action' | 'upload' | null>(null);
  
  // Text Editing State
  const [editingField, setEditingField] = useState<keyof BlogTextState | null>(null);
  const [tempTextValue, setTempTextValue] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);

  // File Input Ref
  const fileInputRef = useRef<HTMLInputElement>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);

  const theme = THEMES[currentTheme];

  // --- EFFECTS ---
  
  // Load from LocalStorage on Mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('hs-theme') as ThemeKey;
    if (savedTheme && THEMES[savedTheme]) setCurrentTheme(savedTheme);

    const savedTexts = localStorage.getItem('blog-texts');
    if (savedTexts) setTexts(JSON.parse(savedTexts));

    const savedImages = localStorage.getItem('blog-images');
    if (savedImages) setImages(JSON.parse(savedImages));
  }, []);

  // Save to LocalStorage
  const saveDraft = () => {
    localStorage.setItem('hs-theme', currentTheme);
    localStorage.setItem('blog-texts', JSON.stringify(texts));
    localStorage.setItem('blog-images', JSON.stringify(images));
    alert('Draft Saved Successfully!');
  };

  // --- HANDLERS ---

  const handleThemeChange = (key: ThemeKey) => {
    setCurrentTheme(key);
    setIsThemeMenuOpen(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, target: 'avatar' | SlotKey) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setImages(prev => ({ ...prev, [target]: result }));
    };
    reader.readAsDataURL(file);
    
    // Clear input
    e.target.value = '';
    setActiveModal(null);
  };

  const clearSlot = (slot: SlotKey) => {
    setImages(prev => ({ ...prev, [slot]: null }));
  };

  const handleTextEditStart = (field: keyof BlogTextState) => {
    setEditingField(field);
    setTempTextValue(texts[field]);
    setActiveModal('text');
  };

  const handleTextSave = () => {
    if (editingField) {
      setTexts(prev => ({ ...prev, [editingField]: tempTextValue }));
      setEditingField(null);
      setActiveModal(null);
    }
  };

  const handleAiRefine = async () => {
    if (!editingField) return;
    setIsAiLoading(true);
    const refined = await refineText(tempTextValue, editingField);
    setTempTextValue(refined);
    setIsAiLoading(false);
  };

  // --- RENDER HELPERS ---

  const renderSlot = (slot: SlotKey, label: string) => {
    const hasImage = !!images[slot];
    const isSelected = activeSlot === slot;
  
      return (
      <div 
        onClick={() => setActiveSlot(isSelected ? null : slot)}
        className={`
          relative aspect-[2/3] rounded-xl overflow-hidden cursor-pointer transition-all duration-300
          border ${isSelected ? 'border-2' : 'border'}
          ${isSelected ? 'ring-2 ring-offset-2 ring-offset-black ring-white/50 scale-[1.02]' : 'hover:-translate-y-1 hover:shadow-lg'}
        `}
        style={{ 
          background: hasImage ? 'none' : 'rgba(255,255,255,0.05)',
          borderColor: isSelected ? theme.primary : 'rgba(255,255,255,0.1)'
        }}
      >
        {hasImage ? (
          <>
            <img src={images[slot]!} alt={label} className="w-full h-full object-cover" />
            {isSelected && (
              <button 
                onClick={(e) => { e.stopPropagation(); clearSlot(slot); }}
                className="absolute top-2 right-2 bg-black/60 hover:bg-red-500/80 text-white p-1 rounded-full backdrop-blur-md transition-colors"
              >
                <span className="material-symbols-outlined text-sm">delete</span>
              </button>
            )}
          </>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white/30">
            <span className="material-symbols-outlined text-4xl mb-2">image</span>
            <span className="text-sm font-medium">{label}</span>
          </div>
        )}
        
        {/* Selection Indicator Overlay */}
        {isSelected && !hasImage && (
           <div className="absolute inset-0 bg-white/5 pointer-events-none" />
        )}
      </div>
    );
  };

  return (
    <div 
      className="min-h-screen text-white transition-colors duration-700 flex flex-col"
      style={{ background: theme.pageBg }}
    >
      {/* --- HEADER --- */}
      <header className="h-[72px] px-8 flex items-center justify-between border-b border-white/10 bg-[#0F051A]/80 backdrop-blur-md sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ boxShadow: `0 0 15px ${theme.secondary}` }}>
             <svg viewBox="0 0 24 24" fill="none" stroke={theme.secondary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
             </svg>
          </div>
          <h1 className="text-lg font-bold tracking-tight">RetroFutur<span className="font-light opacity-70">Editor</span></h1>
        </div>

       <div className="flex items-center gap-3">
  <button
    onClick={saveDraft}
    className="px-4 py-2 rounded-full text-sm font-medium bg-white/5 hover:bg-white/10 transition-colors border border-white/5"
  >
    Save Draft
  </button>

  <button
    onClick={handlePublish}
    className="px-5 py-2 rounded-full text-sm font-bold text-white shadow-lg hover:brightness-110 transition-all active:scale-95"
    style={{ background: theme.primary, boxShadow: `0 0 20px ${theme.primary}60` }}
  >
    Publish
  </button>

  <div className="relative">
    <button
      onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
      className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors border border-white/5"
    >
      <span className="material-symbols-outlined text-white/80">palette</span>
    </button>
            
            {isThemeMenuOpen && (
              <div className="absolute right-0 top-full mt-3 p-3 bg-[#0F051A]/95 border border-white/10 rounded-xl shadow-xl backdrop-blur-xl flex gap-2">
                {(Object.keys(THEMES) as ThemeKey[]).map((tKey) => (
                  <button
                    key={tKey}
                    onClick={() => handleThemeChange(tKey)}
                    className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${currentTheme === tKey ? 'border-white' : 'border-transparent'}`}
                    style={{ background: THEMES[tKey].primary }}
                    title={THEMES[tKey].name}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* --- MAIN LAYOUT --- */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* SIDEBAR */}
        <aside className="w-[280px] border-r border-white/10 bg-[#0A0019]/50 p-6 flex flex-col gap-3 overflow-y-auto">
          <div className="text-xs font-bold text-white/40 uppercase tracking-widest mb-2 px-2">Tools</div>
          
          <button 
            onClick={() => setActiveModal('upload')}
            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all hover:translate-x-1 text-left group"
          >
            <span className="material-symbols-outlined text-white/60 group-hover:text-white transition-colors">upload_file</span>
            <span className="font-medium text-sm">Upload Assets</span>
          </button>

          <button 
            onClick={() => handleTextEditStart('headline')}
            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all hover:translate-x-1 text-left group"
          >
            <span className="material-symbols-outlined text-white/60 group-hover:text-white transition-colors">edit_note</span>
            <span className="font-medium text-sm">Edit Content</span>
          </button>

          <button 
            onClick={() => setActiveModal('action')}
            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all hover:translate-x-1 text-left group"
          >
            <span className="material-symbols-outlined text-white/60 group-hover:text-white transition-colors">bolt</span>
            <span className="font-medium text-sm">Action Button</span>
          </button>

          <div className="mt-auto p-4 rounded-xl bg-white/5 border border-white/5">
            <div className="flex items-center gap-3 mb-2">
              <span className="material-symbols-outlined text-yellow-400">tips_and_updates</span>
              <span className="text-sm font-bold">Pro Tip</span>
            </div>
            <p className="text-xs text-white/60 leading-relaxed">
              Select a post card in the preview to target specific uploads or deletions.
            </p>
          </div>
        </aside>

        {/* PREVIEW AREA */}
        <main className="flex-1 overflow-y-auto p-8 lg:p-12 flex justify-center">
          <div 
            className="w-full max-w-4xl rounded-[32px] p-8 lg:p-16 shadow-2xl transition-all duration-700 border border-white/10"
            style={{ background: theme.frameBg }}
          >
            {/* Blog Header */}
            <div 
              onClick={() => handleTextEditStart('headline')}
              className="mb-12 p-8 rounded-2xl border border-white/10 text-center cursor-pointer hover:bg-white/5 transition-colors group relative"
            >
               <h1 className="text-5xl lg:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                 {texts.headline}
               </h1>
               <p className="text-xl text-white/70 font-light tracking-wide">{texts.subline}</p>
               <span className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 p-1 rounded text-white/70">
                 <span className="material-symbols-outlined text-lg">edit</span>
               </span>
            </div>

            {/* Author Section */}
            <section className="flex flex-col md:flex-row items-center gap-8 mb-16 px-4">
              <div className="relative group cursor-pointer" onClick={() => avatarInputRef.current?.click()}>
                 <div 
                   className="w-[120px] h-[120px] rounded-full overflow-hidden border-2 p-1"
                   style={{ borderColor: theme.secondary, boxShadow: `0 0 20px ${theme.secondary}40` }}
                 >
                   <img src={images.avatar} alt="Author" className="w-full h-full object-cover rounded-full" />
                 </div>
                 <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="material-symbols-outlined">add_a_photo</span>
                 </div>
                 <input 
                   type="file" 
                   ref={avatarInputRef} 
                   className="hidden" 
                   accept="image/*" 
                   onChange={(e) => handleImageUpload(e, 'avatar')}
                 />
              </div>

              <div className="text-center md:text-left flex-1">
                <h3 
                  onClick={() => handleTextEditStart('authorName')}
                  className="text-2xl font-bold mb-1 hover:opacity-80 cursor-pointer transition-opacity"
                  style={{ color: theme.primary }}
                >
                  {texts.authorName}
                </h3>
                <p 
                  onClick={() => handleTextEditStart('authorDesc')}
                  className="text-white/60 hover:text-white cursor-pointer transition-colors"
                >
                  {texts.authorDesc}
                </p>
              </div>
            </section>

            {/* Intro Text */}
            <div 
              onClick={() => handleTextEditStart('intro')}
              className="mb-16 max-w-2xl mx-auto text-center cursor-pointer hover:bg-white/5 p-4 rounded-xl transition-colors"
            >
              <p className="text-lg leading-relaxed text-white/80">{texts.intro}</p>
            </div>

            {/* Post Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              {renderSlot('post1', 'Project Alpha')}
              {renderSlot('post2', 'Neon Nights')}
              {renderSlot('post3', 'Cyber Cafe')}
            </div>

            {/* CTA */}
            <div className="flex justify-center">
              <button 
                onClick={() => handleTextEditStart('cta')}
                className="group relative px-10 py-4 rounded-full font-bold tracking-wide overflow-hidden transition-transform hover:scale-105 active:scale-95"
              >
                <div 
                  className="absolute inset-0 opacity-20 blur-xl transition-opacity group-hover:opacity-40" 
                  style={{ background: theme.primary }} 
                />
                <div 
                  className="absolute inset-0 bg-white opacity-90 transition-colors group-hover:bg-white"
                />
                <span className="relative z-10" style={{ color: '#000' }}>{texts.cta}</span>
              </button>
            </div>

          </div>
        </main>
      </div>

      {/* --- MODALS --- */}

      {/* Upload Modal */}
      <Modal
        isOpen={activeModal === 'upload'}
        onClose={() => setActiveModal(null)}
        title="Upload Image"
        themeColor={theme.primary}
      >
        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={() => avatarInputRef.current?.click()}
            className="flex flex-col items-center justify-center p-6 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/30 transition-all gap-3"
          >
            <span className="material-symbols-outlined text-3xl text-white/70">account_circle</span>
            <span className="text-sm font-medium">Avatar</span>
          </button>
          
          <button 
            onClick={() => {
               if (activeSlot) {
                 fileInputRef.current?.click();
               } else {
                 alert("Please select a Post Card (slot) in the preview first!");
                 setActiveModal(null);
               }
            }}
            className={`flex flex-col items-center justify-center p-6 rounded-xl border border-white/10 bg-white/5 transition-all gap-3 ${activeSlot ? 'hover:bg-white/10 hover:border-white/30 cursor-pointer' : 'opacity-50 cursor-not-allowed'}`}
          >
            <span className="material-symbols-outlined text-3xl text-white/70">grid_view</span>
            <span className="text-sm font-medium">{activeSlot ? `Upload to ${activeSlot}` : 'Select a Slot'}</span>
          </button>
        </div>
        
        {/* Hidden Input for Posts */}
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          accept="image/*" 
          onChange={(e) => activeSlot && handleImageUpload(e, activeSlot)}
        />
      </Modal>

      {/* Text Edit Modal */}
      <Modal
        isOpen={activeModal === 'text'}
        onClose={() => setActiveModal(null)}
        title={`Edit ${editingField}`}
        themeColor={theme.primary}
      >
        <div className="space-y-4">
          <textarea
            value={tempTextValue}
            onChange={(e) => setTempTextValue(e.target.value)}
            className="w-full h-32 bg-black/30 border border-white/20 rounded-xl p-4 text-white focus:outline-none focus:border-white/50 resize-none"
            placeholder="Enter text..."
          />
          
          <div className="flex gap-3">
             <button
              onClick={handleAiRefine}
              disabled={isAiLoading}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {isAiLoading ? (
                 <span className="material-symbols-outlined animate-spin">refresh</span>
              ) : (
                 <span className="material-symbols-outlined">auto_awesome</span>
              )}
              {isAiLoading ? 'Refining...' : 'AI Refine'}
            </button>
            <button
              onClick={handleTextSave}
              className="flex-1 py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium border border-white/10 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </div>
      </Modal>
      
      {/* Action Button Modal */}
       <Modal
        isOpen={activeModal === 'action'}
        onClose={() => setActiveModal(null)}
        title="Choose Call to Action"
        themeColor={theme.primary}
      >
        <div className="flex flex-col gap-2">
           {['Read More', 'Contact Me', 'Hire Me', 'View Portfolio', 'Get Started'].map(opt => (
             <button
              key={opt}
              onClick={() => {
                setTexts(prev => ({...prev, cta: opt}));
                setActiveModal(null);
              }}
              className="p-3 text-left rounded-lg hover:bg-white/10 transition-colors flex items-center justify-between group"
             >
               <span>{opt}</span>
               {texts.cta === opt && <span className="material-symbols-outlined text-sm" style={{color: theme.primary}}>check</span>}
             </button>
           ))}
        </div>
      </Modal>

    </div>
  );
};

export default App;