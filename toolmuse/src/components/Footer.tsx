
import React from 'react';
import { Zap, Twitter, Github, Instagram } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="py-20 px-6 border-t border-black/5">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-12">
          <div className="col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <Zap className="w-8 h-8 theme-accent-text" />
              <span className="text-2xl font-bold tracking-tight">ToolMuse</span>
            </div>
            <p className="text-black/40 text-lg max-w-sm leading-relaxed">
              Synthesizing the digital future through the lens of human creativity. 
              Built for the next generation of digital architects.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-3 rounded-full bg-white border border-black/5 hover:border-[var(--accent-primary)] transition-all">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="p-3 rounded-full bg-white border border-black/5 hover:border-[var(--accent-primary)] transition-all">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="p-3 rounded-full bg-white border border-black/5 hover:border-[var(--accent-primary)] transition-all">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-6 uppercase tracking-widest text-xs">Navigation</h4>
            <ul className="space-y-4 text-black/50 text-sm font-medium">
              <li><a href="#" className="hover:text-black transition-colors">Home</a></li>
              <li><a href="#tools" className="hover:text-black transition-colors">Tools</a></li>
              <li><a href="#team" className="hover:text-black transition-colors">The Team</a></li>
              <li><a href="#workspace" className="hover:text-black transition-colors">Workshop</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 uppercase tracking-widest text-xs">Resources</h4>
            <ul className="space-y-4 text-black/50 text-sm font-medium">
              <li><a href="#" className="hover:text-black transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-black transition-colors">AI Protocols</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Two Worlds Lab</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Support</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-20 pt-8 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-black/30 text-xs font-bold uppercase tracking-widest">
            © 2024 Two Worlds: Silicon & Soul. All rights reserved.
          </p>
          <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest text-black/30">
            <a href="#" className="hover:text-black">Privacy Policy</a>
            <a href="#" className="hover:text-black">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
