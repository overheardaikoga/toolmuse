// App.tsx
import React, { useState, useRef, useEffect } from 'react';
import type { ModalType, ServiceData } from './types';
import { COLORS, THEMES } from './constants';
import { UploadIcon, EditIcon, BoltIcon, PaletteIcon, LogoIcon } from './components/Icons';
import Modal from './components/Modal';

const INITIAL_SERVICE: ServiceData = {
  headline: 'Digital Frontier',
  subline: 'Redefining the boundaries of virtual interaction',
  description: 'We engineer high-fidelity digital ecosystems that bridge the gap between creative vision and technological execution.',
  ctaText: 'Launch Nexus',
  image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=80',
 layoutMode: 'full-canvas',

};

const App: React.FC = () => {
  const [serviceData, setServiceData] = useState<ServiceData>(INITIAL_SERVICE);
  const [currentTheme, setCurrentTheme] = useState(THEMES.pink);
  const [showPalette, setShowPalette] = useState(false);
  const [activeModal, setActiveModal] = useState<ModalType>('none');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem('service-editor-compact-v2');
    if (saved) setServiceData({ ...INITIAL_SERVICE, ...JSON.parse(saved) });
  }, []);

  useEffect(() => {
    localStorage.setItem('service-editor-compact-v2', JSON.stringify(serviceData));
  }, [serviceData]);

  const handleUploadClick = () => fileInputRef.current?.click();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      if (ev.target?.result) setServiceData(prev => ({ ...prev, image: ev.target.result as string }));
    };
    reader.readAsDataURL(file);
  };

  const updateField = (field: keyof ServiceData, value: string) =>
    setServiceData(prev => ({ ...prev, [field]: value }));

  const handlePromptUpdate = (field: keyof ServiceData, label: string) => {
    const newVal = prompt(`Enter new ${label}:`, serviceData[field]);
    if (newVal !== null) updateField(field, newVal);
  };

  const handlePublish = () => alert('Broadcasting to all nodes... 📡');

  const paletteItems = [
    { theme: THEMES.mint, color: COLORS.AURORA_MINT },
    { theme: THEMES.pink, color: COLORS.AURORA_PINK },
    { theme: THEMES.gold, color: COLORS.SOLAR_GOLD },
    { theme: THEMES.magenta, color: COLORS.HOT_MAGENTA },
    { theme: THEMES.blue, color: COLORS.NEON_SKY_BLUE },
  ];

  const mainLayoutClass = serviceData.layoutMode === 'centered-card'
    ? 'items-center justify-center'
    : 'items-start justify-start';

  return (
    <div
      className="min-h-screen flex flex-col transition-all duration-700 ease-in-out select-none overflow-hidden"
      style={{ backgroundColor: currentTheme.bg }}
    >
      <header className="h-[72px] bg-white/80 backdrop-blur-xl border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <LogoIcon glowColor={currentTheme.primary} />
          <div className="flex items-baseline">
            <span className="text-xl font-bold tracking-tight text-slate-900">RetroFutur</span>
            <span className="text-xl font-normal text-slate-400">Editor</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="px-5 py-2 rounded-full font-bold text-xs uppercase tracking-widest text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-all border border-slate-200">
            Save
          </button>
          <button
            onClick={handlePublish}
            className="px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-[0.2em] text-white transition-all transform hover:scale-105 shadow-lg shadow-neon"
            style={{
              backgroundColor: currentTheme.primary,
              '--tw-shadow-color': `${currentTheme.primary}44`,
            } as React.CSSProperties}
          >
            Publish
          </button>
          <button
            onClick={() => setShowPalette(!showPalette)}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
              showPalette ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
            }`}
          >
            <PaletteIcon className="w-5 h-5" />
          </button>
        </div>
      </header>

      <div className="flex flex-1 relative overflow-hidden">
        <aside className="w-20 md:w-72 bg-white/40 backdrop-blur-xl border-r border-slate-200 flex flex-col pt-8 px-5 gap-5">
          <div className="px-3 mb-1">
            <span className="text-[10px] font-black text-slate-400 tracking-[0.4em] uppercase">Modules</span>
          </div>

          <SidebarButton onClick={handleUploadClick} icon={<UploadIcon className="w-5 h-5" />} label="Visual Assets" />
          <SidebarButton onClick={() => setActiveModal('text')} icon={<EditIcon className="w-5 h-5" />} label="Text Content" />
          <SidebarButton onClick={() => setActiveModal('action')} icon={<BoltIcon className="w-5 h-5" />} label="Interaction" />

          <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
        </aside>

        <div
          className={`absolute top-6 right-8 z-[60] transition-all duration-500 transform ${
            showPalette ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-4 scale-95 pointer-events-none'
          }`}
        >
          <div className="bg-white border border-slate-200 rounded-full px-5 py-3 flex items-center gap-3 shadow-[0_20px_40px_rgba(0,0,0,0.1)]">
            {paletteItems.map((item, idx) => (
              <div
                key={idx}
                onClick={() => setCurrentTheme(item.theme)}
                className={`w-7 h-7 rounded-full cursor-pointer transition-all hover:scale-125 ${
                  currentTheme.name === item.theme.name ? 'ring-2 ring-slate-900 ring-offset-2' : 'opacity-70 hover:opacity-100'
                }`}
                style={{ backgroundColor: item.color }}
              />
            ))}
          </div>
        </div>

        <main
  className={`flex-1 p-8 md:p-12 overflow-y-auto no-scrollbar flex flex-col ${mainLayoutClass} /* layout intent */`}
>
  {/* layout wrapper */}
  <div
  className={
    serviceData.layoutMode === 'full-canvas'
      ? 'w-full flex justify-center'
      : 'w-full'
  }
>

    {/* preview card — НЕ МЕНЯЕМ СТРУКТУРУ */}
    <div
      className="w-full max-w-5xl rounded-[48px] border border-white relative overflow-hidden transition-all duration-700 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.08)] mb-8"
      style={{ backgroundColor: '#FCFDFF' }}
    >
      <div
        className="absolute -top-[10%] -right-[5%] w-[500px] h-[500px] blur-[120px] rounded-full opacity-20 transition-colors duration-1000"
        style={{ backgroundColor: currentTheme.primary }}
      />
      <div
        className="absolute -bottom-[10%] -left-[5%] w-[500px] h-[500px] blur-[120px] rounded-full opacity-20 transition-colors duration-1000"
        style={{ backgroundColor: currentTheme.secondary }}
      />

      <div className="relative z-10 px-10 py-12 md:px-16 md:py-16 flex flex-col items-center">
        <div className="w-full aspect-video rounded-[36px] overflow-hidden mb-12 group relative border-[6px] border-white shadow-xl transition-all duration-700 hover:shadow-2xl">
          <img
            src={serviceData.image}
            alt="Hero"
            className="w-full h-full object-cover transition-transform duration-[3000ms] group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 to-transparent pointer-events-none" />
        </div>

        <div className="text-center max-w-3xl">
          <div className="inline-block mb-6 px-5 py-1.5 rounded-full border border-slate-100 bg-slate-50 text-[10px] font-black tracking-[0.3em] uppercase text-slate-400">
            Interactive Node 4.0
          </div>

          <h2 className="text-5xl md:text-6xl font-black mb-6 tracking-tighter leading-tight text-slate-900">
            {serviceData.headline}
          </h2>
          <p className="text-lg md:text-xl text-slate-500 mb-8 font-medium leading-relaxed">
            {serviceData.subline}
          </p>
          <p className="text-lg text-slate-600 leading-relaxed mb-10 font-light italic">
            "{serviceData.description}"
          </p>

          <button
            className="px-14 py-5 rounded-full text-lg font-black transition-all transform hover:scale-105 active:scale-95 text-white shadow-xl shadow-neon"
            style={{
              background: `linear-gradient(135deg, ${currentTheme.primary}, ${currentTheme.secondary})`,
              '--tw-shadow-color': `${currentTheme.primary}33`,
            } as React.CSSProperties}
          >
            {serviceData.ctaText}
          </button>
        </div>
      </div>
    </div>
  </div>

  <footer className="mb-10 text-slate-400 text-[10px] font-black tracking-[0.4em] uppercase flex items-center gap-8 opacity-60">
    <span>Compact Core</span>
    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: currentTheme.primary }} />
    <span>Neural Mesh active</span>
    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: currentTheme.secondary }} />
    <span>RetroFutur Labs</span>
  </footer>
</main>
</div>

      <Modal isOpen={activeModal === 'text'} onClose={() => setActiveModal('none')} title="Asset Data">
        <div className="space-y-3">
          <EditButton label="Headline" onClick={() => handlePromptUpdate('headline', 'Headline')} />
          <EditButton label="Sub-header" onClick={() => handlePromptUpdate('subline', 'Subline')} />
          <EditButton label="Narrative" onClick={() => handlePromptUpdate('description', 'Description')} />
        </div>
      </Modal>

      <Modal isOpen={activeModal === 'action'} onClose={() => setActiveModal('none')} title="Trigger Config">
        <div className="grid grid-cols-1 gap-2">
          {['Launch Nexus', 'Initialize', 'Enter Portal', 'Establish Link'].map(label => (
            <button
              key={label}
              onClick={() => {
                updateField('ctaText', label);
                setActiveModal('none');
              }}
              className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-slate-300 text-left transition-all font-black text-[11px] uppercase tracking-widest text-slate-500 hover:text-slate-900"
            >
              {label}
            </button>
          ))}
        </div>
      </Modal>
    </div>
  );
};

interface SidebarButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}
const SidebarButton: React.FC<SidebarButtonProps> = ({ icon, label, onClick }) => (
  <button
    onClick={onClick}
    className="group flex items-center gap-4 p-4 rounded-2xl transition-all bg-white/40 border border-transparent hover:border-slate-200 hover:bg-white hover:shadow-lg hover:shadow-slate-200/20 w-full text-slate-400 hover:text-slate-900"
  >
    <div className="transition-all transform group-hover:scale-110">{icon}</div>
    <span className="hidden md:block font-black text-[10px] tracking-[0.2em] uppercase">{label}</span>
  </button>
);

const EditButton: React.FC<{ label: string; onClick: () => void }> = ({ label, onClick }) => (
  <button
    onClick={onClick}
    className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-slate-300 hover:bg-white text-left transition-all flex justify-between items-center group shadow-sm"
  >
    <span className="font-black text-[10px] uppercase tracking-widest text-slate-400 group-hover:text-slate-900">{label}</span>
    <EditIcon className="w-4 h-4 text-slate-200 group-hover:text-slate-900 transition-colors" />
  </button>
);

export default App;