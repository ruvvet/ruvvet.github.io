import type { LucideIcon } from 'lucide-react';
import { Briefcase, Code2, FileText, Home, LayoutGrid, Mail, User } from 'lucide-react';

export type NavItem = {
  id: string;
  label: string;
  icon: LucideIcon;
};

export const navItems: NavItem[] = [
  { id: 'hero', label: 'Home', icon: Home },
  { id: 'about', label: 'About', icon: User },
  { id: 'skills', label: 'Skills', icon: Briefcase },
  { id: 'resume', label: 'Resume', icon: FileText },
  { id: 'projects', label: 'Projects', icon: Code2 },
  { id: 'portfolio', label: 'Portfolio', icon: LayoutGrid },
  { id: 'contact', label: 'Contact', icon: Mail },
];
