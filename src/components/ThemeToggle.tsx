import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      className="inline-flex items-center gap-2 rounded-full bg-surface-2 px-3 py-1.5 text-xs font-medium text-muted transition hover:bg-accent-soft hover:text-accent"
    >
      {isDark ? <Sun size={14} /> : <Moon size={14} />}
      <span>{isDark ? 'Light' : 'Dark'}</span>
    </button>
  );
}
