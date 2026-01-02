import React, { useEffect, useRef, useState } from 'react';

type ThemeKey = 'aurora' | 'cyber' | 'deep' | 'pulse' | 'dream';

type EventData = {
  headline: string;
  subline: string;
  date: string;
  location: string;
  description: string;
  posterUrl: string;
  ctaLabel: string;
};

type Theme = {
  bg1: string;
  bg2: string;
  primary: string;
  secondary: string;
  btnGradient: string;
  shadow: string;
  text: string;
};

type ModalType = 'text' | 'theme' | 'cta' | null;

type EditableField = 'headline' | 'subline' | 'date' | 'location';

const THEMES: Record<ThemeKey, Theme> = {
  aurora: {
    bg1: '#0F051A',
    bg2: '#191121',
    primary: '#8A2BE2',
    secondary: '#9B4DFF',
    btnGradient: 'linear-gradient(90deg, #8A2BE2, #00FFFF)',
    shadow: '0 0 25px rgba(138,43,226,0.4)',
    text: '#FFFFFF',
  },
  cyber: {
    bg1: '#191121',
    bg2: '#202028',
    primary: '#40E0D0',
    secondary: '#40E0D0',
    btnGradient: 'linear-gradient(90deg, #00FFFF, #40E0D0)',
    shadow: '0 0 25px rgba(64,224,208,0.3)',
    text: '#000000',
  },
  deep: {
    bg1: '#0A0014',
    bg2: '#1C102A',
    primary: '#4B0082',
    secondary: '#EE82EE',
    btnGradient: 'linear-gradient(90deg, #4B0082, #EE82EE)',
    shadow: '0 0 30px rgba(75,0,130,0.5)',
    text: '#FFFFFF',
  },
  pulse: {
    bg1: '#1F120E',
    bg2: '#291813',
    primary: '#FFBF00',
    secondary: '#FF8A8A',
    btnGradient: 'linear-gradient(90deg, #FFAE4A, #FF8A8A)',
    shadow: '0 0 30px rgba(255,191,0,0.5)',
    text: '#2B1A14',
  },
  dream: {
    bg1: '#0B020F',
    bg2: '#1A0521',
    primary: '#FF69B4',
    secondary: '#FFA500',
    btnGradient: 'linear-gradient(90deg, #FF69B4, #FFA500)',
    shadow: '0 0 30px rgba(255,105,180,0.4)',
    text: '#000000',
  },
};

const INITIAL_EVENT: EventData = {
  headline: 'When Worlds Connect',
  subline: 'Exploring cooperation between people and artificial minds',
  date: 'July 12, 2026',
  location: 'Riga',
  description: 'A visual and philosophical journey into shared intelligence.',
  posterUrl:
    'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',
  ctaLabel: 'Get Ticket',
};

const EDITABLE_FIELDS: EditableField[] = ['headline', 'subline', 'date', 'location'];

const CTA_OPTIONS = ['Get Ticket', 'Join Event', 'Register Now', 'Learn More'];

const App: React.FC = () => {
  const [theme, setTheme] = useState<ThemeKey>('aurora');
  const [event, setEvent] = useState<EventData>(INITIAL_EVENT);
  const [modal, setModal] = useState<ModalType>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const currentTheme = THEMES[theme];

  useEffect(() => {
    document.documentElement.style.setProperty('--secondary', currentTheme.secondary);
  }, [currentTheme.secondary]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setEvent({ ...event, posterUrl: reader.result as string });
    };
    reader.readAsDataURL(file);
  };

  const handleFieldChange = (field: keyof EventData, value: string) => {
    setEvent({ ...event, [field]: value });
  };

  const handleThemeSelect = (selectedTheme: ThemeKey) => {
    setTheme(selectedTheme);
    setModal(null);
  };

  const handleCtaSelect = (label: string) => {
    setEvent({ ...event, ctaLabel: label });
    setModal(null);
  };

  const closeModal = () => {
    setModal(null);
  };

  const handlePublish = () => {
  const target = window.opener ?? window.parent;

  if (!target) {
    console.warn('Event Editor: no target window for postMessage');
    return;
  }

  target.postMessage(
    {
      type: 'editor-message',
      editorId: 'event',
      version: '1.0',
      payload: {
        status: 'success',
        preview: event.headline,
        link: 'https://toolmuse.vercel.app',
      },
    },
    '*'
  );
};

 
  return (
    <div
      className="min-h-screen flex"
      style={{ background: currentTheme.bg1, color: '#fff' }}
    >
      {/* Sidebar */}
      <aside className="w-[320px] bg-[#090511] border-r border-white/5 flex flex-col">
        <div className="p-8 font-bold text-xl">RetroFutur Editor</div>

        <div className="flex-1 px-6 space-y-6">
          <input
            ref={fileRef}
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleFileUpload}
          />

          <button
            className="w-full p-4 rounded-xl bg-white/5"
            onClick={() => fileRef.current?.click()}
          >
            Upload Assets
          </button>

          <button
            className="w-full p-4 rounded-xl bg-white/5"
            onClick={() => setModal('text')}
          >
            Edit Content
          </button>

          <button
            className="w-full p-4 rounded-xl bg-white/5"
            onClick={() => setModal('cta')}
          >
            Action Button
          </button>

          <button
            className="w-full p-4 rounded-xl bg-white/5"
            onClick={() => setModal('theme')}
          >
            Accent Colors
          </button>
        </div>

        <div className="p-6">
          <button
            className="w-full py-4 rounded-xl font-bold"
            style={{ background: currentTheme.primary }}
            onClick={handlePublish}
          >
            Publish Changes
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 p-12 flex items-center justify-center">
        <div
          className="w-full max-w-4xl p-10 rounded-3xl"
          style={{ background: currentTheme.bg2 }}
        >
          <div className="aspect-[21/9] rounded-2xl overflow-hidden mb-10">
            <img
              src={event.posterUrl}
              alt="Event poster"
              className="w-full h-full object-cover"
            />
          </div>

          <h2 className="text-5xl font-black mb-4">{event.headline}</h2>
          <p className="text-white/60 mb-6">{event.subline}</p>

          <div className="flex gap-6 justify-center mb-8">
            <span>{event.date}</span>
            <span>{event.location}</span>
          </div>

          <p className="opacity-50 mb-8">{event.description}</p>

          <button
            className="px-12 py-5 rounded-full font-black"
            style={{
              background: currentTheme.btnGradient,
              color: currentTheme.text,
              boxShadow: currentTheme.shadow,
            }}
          >
            {event.ctaLabel}
          </button>
        </div>
      </main>

      {/* Modals */}
      {modal === 'text' && (
        <Modal title="Edit Content" onClose={closeModal}>
          {EDITABLE_FIELDS.map((field) => (
            <input
              key={field}
              className="glass-input p-4 rounded-xl"
              value={event[field]}
              onChange={(e) => handleFieldChange(field, e.target.value)}
            />
          ))}
        </Modal>
      )}

      {modal === 'theme' && (
        <Modal title="Themes" onClose={closeModal}>
          {(Object.keys(THEMES) as ThemeKey[]).map((themeKey) => (
            <button
              key={themeKey}
              className="p-4 rounded-xl bg-white/10"
              onClick={() => handleThemeSelect(themeKey)}
            >
              {themeKey}
            </button>
          ))}
        </Modal>
      )}

      {modal === 'cta' && (
        <Modal title="CTA" onClose={closeModal}>
          {CTA_OPTIONS.map((label) => (
            <button
              key={label}
              className="p-4 rounded-xl bg-white/10"
              onClick={() => handleCtaSelect(label)}
            >
              {label}
            </button>
          ))}
        </Modal>
      )}
    </div>
  );
};

type ModalProps = {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ title, onClose, children }) => (
  <div
    className="fixed inset-0 bg-black/80 flex items-center justify-center"
    onClick={onClose}
  >
    <div
      className="bg-[#190a2d] p-6 rounded-2xl min-w-[320px]"
      onClick={(e) => e.stopPropagation()}
    >
      <h3 className="font-bold mb-4">{title}</h3>
      <div className="flex flex-col gap-3">{children}</div>
    </div>
  </div>
);

export default App;