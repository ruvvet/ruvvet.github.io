import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { portfolioFilters, portfolioItems, type PortfolioCategory } from '../content/portfolio';
import { Section } from './Section';

type Filter = PortfolioCategory | 'all';

export function Portfolio() {
  const [filter, setFilter] = useState<Filter>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const visibleItems = useMemo(
    () => (filter === 'all' ? portfolioItems : portfolioItems.filter((p) => p.category === filter)),
    [filter],
  );

  const slides = useMemo(
    () => visibleItems.map((p) => ({ src: p.image, alt: p.title, title: p.title })),
    [visibleItems],
  );

  return (
    <Section id="portfolio" eyebrow="Selected work" title="Portfolio">
      <div className="mb-8 flex flex-wrap gap-2">
        {portfolioFilters.map((f) => {
          const active = filter === f.id;
          return (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                active
                  ? 'bg-accent text-white'
                  : 'border border-border bg-surface-2 text-muted hover:border-accent hover:text-accent'
              }`}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      <motion.div layout className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visibleItems.map((item, i) => (
            <motion.article
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3 }}
              onClick={() => setLightboxIndex(i)}
              className="group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-2xl border border-border bg-surface-2"
            >
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="size-full object-cover transition duration-500 group-hover:scale-105"
              />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />

              {item.href && (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  aria-label={`Open ${item.title}`}
                  className="absolute right-3 top-3 inline-flex size-9 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur transition hover:bg-accent"
                >
                  <ExternalLink size={14} />
                </a>
              )}

              <div className="absolute inset-x-0 bottom-0 p-4">
                <h3 className="text-sm font-semibold text-white sm:text-base">{item.title}</h3>
                {item.description && (
                  <p className="mt-1 line-clamp-2 max-h-0 text-xs text-white/80 opacity-0 transition-all duration-300 group-hover:max-h-16 group-hover:opacity-100">
                    {item.description}
                  </p>
                )}
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>

      <Lightbox
        open={lightboxIndex !== null}
        index={lightboxIndex ?? 0}
        close={() => setLightboxIndex(null)}
        slides={slides}
      />
    </Section>
  );
}
