import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { FaGithub, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { profile, type SocialLink } from '../content/profile';
import { navItems } from '../content/nav';
import { ThemeToggle } from './ThemeToggle';

const socialIcons: Record<SocialLink['icon'], typeof FaGithub> = {
  github: FaGithub,
  linkedin: FaLinkedin,
  twitter: FaTwitter,
  instagram: FaInstagram,
};

export function Sidebar({ activeId }: { activeId: string }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavClick = (id: string) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <button
        type="button"
        aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={mobileOpen}
        onClick={() => setMobileOpen((o) => !o)}
        className="fixed top-4 right-4 z-50 inline-flex items-center justify-center rounded-full bg-surface/80 p-2.5 text-text shadow-lg ring-1 ring-border backdrop-blur xl:hidden"
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm xl:hidden"
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={false}
        animate={{ x: mobileOpen ? 0 : undefined }}
        className={`fixed top-0 left-0 z-40 flex h-screen w-72 flex-col border-r border-border bg-surface/95 px-6 py-8 backdrop-blur transition-transform duration-300 xl:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col items-center text-center">
          <img
            src={profile.avatar}
            alt={profile.name}
            loading="eager"
            className="size-32 rounded-full object-cover ring-2 ring-accent/40 ring-offset-4 ring-offset-surface"
          />
          <h1 className="mt-5 text-2xl font-semibold tracking-tight">
            <a href="#hero" onClick={(e) => { e.preventDefault(); handleNavClick('hero'); }}>
              {profile.name}
            </a>
          </h1>
          <p className="mt-1 text-sm text-muted">{profile.tagline}</p>

          <div className="mt-4 flex items-center gap-2">
            {profile.social.map((s) => {
              const Icon = socialIcons[s.icon];
              return (
                <a
                  key={s.icon}
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex size-10 items-center justify-center rounded-full bg-surface-2 text-muted transition hover:bg-accent-soft hover:text-accent"
                >
                  <Icon size={16} />
                </a>
              );
            })}
          </div>
        </div>

        <nav className="mt-10 flex-1">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = activeId === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.id);
                    }}
                    className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                      active
                        ? 'bg-accent-soft text-accent'
                        : 'text-muted hover:bg-surface-2 hover:text-text'
                    }`}
                  >
                    <Icon size={16} className={active ? 'text-accent' : 'text-muted group-hover:text-text'} />
                    <span>{item.label}</span>
                    {active && (
                      <motion.span
                        layoutId="nav-active"
                        className="ml-auto size-1.5 rounded-full bg-accent"
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="mt-6 flex items-center justify-between border-t border-border pt-4 text-xs text-muted">
          <span>© {new Date().getFullYear()} Jenny Feng</span>
          <ThemeToggle />
        </div>
      </motion.aside>
    </>
  );
}
