
import React from 'react';
import { TOOLS, IconMap } from '../constants';
import { ArrowUpRight } from 'lucide-react';

export const Tools: React.FC = () => {
  return (
    <section id="tools" className="py-24 px-6 bg-[var(--bg-primary)]">
      <div className="container mx-auto">
        <div className="text-center mb-20 space-y-4">
          <h2 className="text-5xl md:text-7xl font-bold font-retro tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-[var(--accent-primary)] to-[var(--accent-secondary)]">
            Digital Tool Collection
          </h2>
          <p className="text-black/50 text-lg max-w-xl mx-auto">
            Explore our suite of AI-powered utilities designed for the retro-future.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {TOOLS.map((tool) => (
            <div 
              key={tool.id}
              className="group relative bg-[#121212] rounded-[40px] p-10 flex flex-col h-full border border-white/5 hover:border-[var(--accent-primary)]/30 transition-all duration-500 overflow-hidden"
            >
              {/* Tool Icon */}
              <div className="mb-8 w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center theme-accent-text group-hover:scale-110 transition-transform duration-500">
                {IconMap[tool.icon]}
              </div>

              <div className="space-y-4 flex-grow">
                <h3 className="text-2xl font-bold text-white tracking-tight">{tool.name}</h3>
                <p className="text-white/40 leading-relaxed text-sm">
                  {tool.description}
                </p>
              </div>

              <button className="mt-10 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#2a231b] text-[var(--accent-secondary)] font-bold text-xs uppercase tracking-widest hover:bg-[var(--accent-secondary)] hover:text-white transition-all duration-300">
                Launch Tool
                <ArrowUpRight className="w-4 h-4" />
              </button>

              {/* Decorative Gradient Background */}
              <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-[var(--accent-primary)] opacity-0 group-hover:opacity-10 blur-[60px] transition-opacity duration-700" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
