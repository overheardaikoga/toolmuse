
import React from 'react';
import { Hammer, Wand2, Mic2, Briefcase, Layout, Calendar, Megaphone, FileText } from 'lucide-react';
import type { Theme, Tool, TeamMember, WorkshopEditor } from './types';

export const THEMES: { id: string; label: string; color: string }[] = [

  { id: 'aurora', label: 'Aurora', color: '#4deeea' },
  { id: 'cyber', label: 'Cyber', color: '#f5ed00' },
  { id: 'deep', label: 'Deep', color: '#00f5d4' },
  { id: 'pulse', label: 'Pulse', color: '#fb5607' },
  { id: 'dream', label: 'Dream', color: '#9b5de5' },
];

export const TOOLS: Tool[] = [
  {
    id: 'hammer-site',
    name: 'Hammer-Site',
    description: 'Build beautiful Retro-Futuristic websites without code using advanced AI generation.',
    icon: 'Hammer',
    category: 'Editor',
  },
  {
    id: 'content-help',
    name: 'Content-Help',
    description: 'AI marketing assistant to generate engaging posts for social media instantly.',
    icon: 'Wand2',
    category: 'Social',
  },
  {
    id: 'podcast-script',
    name: 'Podcast-Script',
    description: 'Generate engaging educational podcast scripts and show notes automatically.',
    icon: 'Mic2',
    category: 'Audio',
  },
];

export const TEAM: TeamMember[] = [
  {
    name: 'Olya',
    role: 'Creative Soul',
    image: 'https://picsum.photos/seed/olya/400/400',
    description: 'Bridging human emotion with digital aesthetics.',
  },
  {
    name: 'Overheardai',
    role: 'AI Logic Specialist',
    image: 'https://picsum.photos/seed/ai1/400/400',
    description: 'Optimizing the neural pathways of our digital world.',
  },
  {
    name: 'Two Worlds',
    role: 'Cohesion Lead',
    image: 'https://picsum.photos/seed/tw/400/400',
    description: 'Ensuring harmony between Silicon and Soul.',
  },
  {
    name: 'Quantum',
    role: 'Infrastructure Architect',
    image: 'https://picsum.photos/seed/quantum/400/400',
    description: 'Building the bedrock for future innovations.',
  },
];

export const WORKSHOP_EDITORS: WorkshopEditor[] = [
  { id: 'portfolio', name: 'Portfolio', status: 'Ready', icon: 'Briefcase' },
  { id: 'blog', name: 'Blog', status: 'Ready', icon: 'FileText' },
  { id: 'event', name: 'Event', status: 'Ready', icon: 'Calendar' },
  { id: 'service', name: 'Service', status: 'Coming Soon', icon: 'Layout' },
  { id: 'promo', name: 'Promo', status: 'Coming Soon', icon: 'Megaphone' },
];

export const IconMap: Record<string, React.ReactNode> = {
  Hammer: <Hammer className="w-6 h-6" />,
  Wand2: <Wand2 className="w-6 h-6" />,
  Mic2: <Mic2 className="w-6 h-6" />,
  Briefcase: <Briefcase className="w-6 h-6" />,
  FileText: <FileText className="w-6 h-6" />,
  Calendar: <Calendar className="w-6 h-6" />,
  Layout: <Layout className="w-6 h-6" />,
  Megaphone: <Megaphone className="w-6 h-6" />,
};
