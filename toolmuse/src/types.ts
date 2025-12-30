
export type Theme = 'aurora' | 'cyber' | 'deep' | 'pulse' | 'dream';


export interface Tool {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
}

export interface TeamMember {
  name: string;
  role: string;
  image: string;
  description: string;
}

export interface WorkshopEditor {
  id: string;
  name: string;
  status: 'Ready' | 'Coming Soon';
  icon: string;
}
