import React, { useState, useEffect } from 'react';
import { WORKSHOP_EDITORS, IconMap } from '../constants';
import { Hammer, Zap, ArrowRight } from 'lucide-react';

type EventResult = {
  status: 'success' | 'cancel';
  preview: string;
  link: string;
};

const isValidEventResult = (data: unknown): data is EventResult => {
  if (!data || typeof data !== 'object') return false;
  
  const result = data as Record<string, unknown>;
  
  return (
    (result.status === 'success' || result.status === 'cancel') &&
    typeof result.preview === 'string' &&
    typeof result.link === 'string'
  );
};

export const Workspace: React.FC = () => {
  const [eventResult, setEventResult] = useState<EventResult | null>(null);

  const openEvent = () => {
    window.open('http://localhost:5174', '_blank');
  };

  useEffect(() => {
    const handler = (event: MessageEvent) => {
      if (event.origin !== 'http://localhost:5174') return;

      if (!isValidEventResult(event.data)) return;

      setEventResult(event.data);
    };

    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, []);

  return (
    <section id="workspace" className="py-24 px-6 bg-[var(--bg-primary)]">
      <div className="container mx-auto">
        <div className="bg-white rounded-[40px] p-8 md:p-16 border border-black/5 shadow-2xl relative overflow-hidden">
          {/* Header */}
          <div className="flex flex-col items-center mb-16 space-y-4">
            <div className="flex items-center gap-3 text-[var(--accent-primary)]">
              <Hammer className="w-6 h-6" />
              <span className="font-bold text-sm uppercase tracking-widest">
                Hammer-Site
              </span>
            </div>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-center">
              Build your site in one hit.
            </h2>
            <p className="text-black/40 text-lg">
              Your idea. One click. One tool.
            </p>
          </div>

          <div className="grid lg:grid-cols-[1fr_400px] gap-12 items-start">
            {/* Editor Buttons List */}
            <div className="space-y-4">
              {WORKSHOP_EDITORS.map((editor) => {
                const isReady = editor.status === 'Ready';
                const isEvent = editor.id === 'event';

                return (
                  <button
                    key={editor.id}
                    disabled={!isReady}
                    onClick={isEvent && isReady ? openEvent : undefined}
                    className={`
                      w-full group flex items-center justify-between p-6 rounded-2xl transition-all duration-300
                      ${
                        isReady
                          ? 'bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-white hover:scale-[1.02] shadow-lg'
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      }
                    `}
                  >
                    <div className="flex items-center gap-6">
                      <div
                        className={`p-3 rounded-xl ${
                          isReady ? 'bg-white/20' : 'bg-gray-200'
                        }`}
                      >
                        {IconMap[editor.icon]}
                      </div>
                      <div className="text-left">
                        <span className="text-xl font-bold block">
                          {editor.name}
                        </span>
                        <span
                          className={`text-[10px] uppercase tracking-widest font-bold ${
                            isReady ? 'text-white/70' : 'text-gray-400'
                          }`}
                        >
                          {isReady ? 'System Active' : 'Initializing...'}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <span
                        className={`text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-full ${
                          isReady
                            ? 'bg-white text-black'
                            : 'bg-gray-200 text-gray-400'
                        }`}
                      >
                        {editor.status}
                      </span>
                      {isReady && (
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      )}
                    </div>
                  </button>
                );
              })}

              {/* Event Result Output */}
              {eventResult && (
                <div className="mt-8 p-6 rounded-2xl border border-black/10 bg-gray-50">
                  <p>
                    <strong>Status:</strong> {eventResult.status}
                  </p>
                  <p>
                    <strong>Preview:</strong> {eventResult.preview}
                  </p>
                  <p>
                    <strong>Link:</strong>{' '}
                    <a
                      href={eventResult.link}
                      target="_blank"
                      rel="noreferrer"
                      className="underline"
                    >
                      {eventResult.link}
                    </a>
                  </p>
                </div>
              )}
            </div>

            {/* Visualizer */}
            <div className="relative h-full min-h-[500px] rounded-3xl bg-gray-50 border-2 border-dashed border-gray-200 flex flex-col items-center justify-center p-12 text-center group">
              <div className="relative">
                <Hammer className="w-20 h-20 text-gray-300 group-hover:text-[var(--accent-primary)] transition-colors duration-500 transform group-hover:-rotate-12" />
                <Zap className="absolute -top-2 -right-2 w-8 h-8 text-yellow-400 animate-pulse" />
              </div>
              <div className="mt-8 space-y-2">
                <h3 className="text-xl font-bold font-retro text-gray-400 uppercase tracking-widest group-hover:text-[var(--accent-primary)] transition-colors">
                  Hammer Visualizer
                </h3>
                <p className="text-gray-400 text-sm max-w-[200px] mx-auto">
                  Select a template to start building your site
                </p>
              </div>

              {/* Decorative dots */}
              <div className="absolute top-8 right-8 w-2 h-2 rounded-full bg-gray-200" />
              <div className="absolute top-8 left-8 w-2 h-2 rounded-full bg-gray-200" />
              <div className="absolute bottom-8 right-8 w-2 h-2 rounded-full bg-gray-200" />
              <div className="absolute bottom-8 left-8 w-2 h-2 rounded-full bg-gray-200" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
