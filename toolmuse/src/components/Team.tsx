
import React from 'react';
import { TEAM } from '../constants';

export const Team: React.FC = () => {
  return (
    <section id="team" className="py-24 px-6 relative bg-[var(--bg-primary)]">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="space-y-4">
            <h2 className="text-6xl font-bold tracking-tighter">The AI Core Team</h2>
            <p className="text-black/50 text-xl font-retro">Humans & Intelligence Operating in Sync</p>
          </div>
          <div className="h-px bg-black/10 flex-grow mx-8 hidden md:block" />
          <div className="flex -space-x-4">
            {TEAM.map((member, i) => (
              <div key={i} className="w-12 h-12 rounded-full border-2 border-[var(--bg-primary)] overflow-hidden">
                <img src={member.image} alt="" className="w-full h-full object-cover grayscale" />
              </div>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEAM.map((member) => (
            <div 
              key={member.name}
              className="group bg-white rounded-3xl p-6 border border-black/5 hover:border-[var(--accent-primary)]/20 transition-all duration-500 shadow-sm"
            >
              <div className="aspect-square rounded-2xl overflow-hidden mb-6 relative">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <h3 className="text-2xl font-bold tracking-tight mb-1">{member.name}</h3>
              <p className="text-[var(--accent-secondary)] text-xs font-bold uppercase tracking-widest mb-4">{member.role}</p>
              <p className="text-sm text-black/40 leading-relaxed">{member.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
