
import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 px-6 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-[20%] right-[10%] w-64 h-64 border border-black/5 rounded-full" />
      <div className="absolute bottom-[10%] left-[5%] w-32 h-32 border border-black/5 rounded-full" />
      
      <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/50 border border-black/10 text-[10px] uppercase tracking-widest font-bold theme-accent-text">
            Welcome to the workshop
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9]">
            Build Digital<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)]">TOOLS</span><br />
            <span className="text-black/30">Without Code</span>
          </h1>
          
          <div className="max-w-md">
            <h2 className="text-xl font-retro font-semibold tracking-widest mb-4 uppercase">Silicon & Soul</h2>
            <p className="text-lg text-black/60 leading-relaxed">
              Al-powered solutions for creators, entrepreneurs, and innovators. Where 
              <span className="theme-accent-text font-medium"> Silicon</span> logic meets 
              <span className="theme-secondary-text font-medium"> Soul</span> creativity.
            </p>
          </div>
          
          <button 
            onClick={() => document.getElementById('tools')?.scrollIntoView({ behavior: 'smooth' })}
            className="group flex items-center gap-4 px-8 py-4 rounded-xl bg-white border-2 border-black/5 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
          >
            <span className="font-bold">Explore Tools</span>
            <div className="w-8 h-8 rounded-full theme-accent-bg flex items-center justify-center text-white group-hover:translate-x-1 transition-transform">
              <ArrowRight className="w-5 h-5" />
            </div>
          </button>
        </div>

        <div className="relative animate-float">
          {/* Mockup Interface */}
          <div className="relative z-10 bg-white rounded-3xl p-8 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-black/5 aspect-video flex flex-col items-center justify-center">
            <div className="absolute top-6 left-8 flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
            </div>
            
            <div className="w-24 h-24 rounded-full bg-gray-50 flex items-center justify-center mb-6">
              <Sparkles className="w-10 h-10 theme-accent-text" />
            </div>
            
            <div className="w-full space-y-3 px-12">
              <div className="h-2 bg-gray-100 rounded-full w-3/4 mx-auto" />
              <div className="h-2 bg-gray-50 rounded-full w-1/2 mx-auto" />
            </div>

            {/* Float Badge */}
            <div className="absolute -bottom-4 -right-4 bg-white px-6 py-4 rounded-2xl shadow-xl border border-black/5 flex items-center gap-4">
              <div className="p-2 rounded-lg bg-black text-white">
                <span className="text-xs font-bold">{'</>'}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-widest text-black/40 font-bold leading-none mb-1">Efficiency</span>
                <span className="text-lg font-bold">+ 240%</span>
              </div>
            </div>
          </div>
          
          {/* Abstract Glow */}
          <div className="absolute -inset-20 bg-[var(--accent-primary)] opacity-10 blur-[100px] rounded-full -z-10" />
        </div>
      </div>
    </section>
  );
};
