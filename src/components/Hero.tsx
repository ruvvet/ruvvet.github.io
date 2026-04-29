import { motion } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';
import { profile } from '../content/profile';
import { Terminal } from './Terminal';

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] items-center bg-bg px-5 py-20 sm:px-10 sm:py-24 md:px-16 lg:px-24"
    >

      <div className="grid w-full max-w-6xl gap-12 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] xl:items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
            Hi, I'm <span className="text-accent">{profile.name}</span>.
          </h1>

          <p className="mt-6 max-w-md text-base leading-relaxed text-muted sm:text-lg">
            Software engineer building developer platforms — currently a custom microservices framework powering 30+ services at Jewelers Mutual. Off the clock: gaming, esports, and cosplay.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href="#portfolio"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-accent/20 transition hover:scale-[1.02]"
            >
              See my work
              <ArrowRight size={16} className="transition group-hover:translate-x-0.5" />
            </a>
            <a
              href={profile.resumePdf}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-5 py-2.5 text-sm font-semibold text-text backdrop-blur transition hover:border-accent hover:text-accent"
            >
              <Download size={16} />
              Download CV
            </a>
          </div>
        </motion.div>

        <div className="hidden min-w-0 xl:flex xl:justify-end">
          <Terminal />
        </div>
      </div>
    </section>
  );
}
