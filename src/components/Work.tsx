import { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { workItems, type WorkItem } from '../content/work';
import { Section } from './Section';

const CARD_SIZE = 320;
const PEEK_VERTICAL = 64;
const PEEK_HORIZONTAL = 80;

function useIsDesktop(breakpoint = 768) {
  const [isDesktop, setIsDesktop] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(`(min-width: ${breakpoint}px)`).matches;
  });
  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${breakpoint}px)`);
    const handler = () => setIsDesktop(mq.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [breakpoint]);
  return isDesktop;
}

export function Work() {
  const isDesktop = useIsDesktop();
  const [order, setOrder] = useState<string[]>(() => workItems.map((i) => i.id));
  const scrollerRef = useRef<HTMLDivElement>(null);

  const promote = useCallback((id: string) => {
    setOrder((prev) => (prev[0] === id ? prev : [id, ...prev.filter((x) => x !== id)]));
  }, []);

  useEffect(() => {
    if (isDesktop && scrollerRef.current) {
      scrollerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  }, [order, isDesktop]);

  return (
    <Section id="work" eyebrow="Side work" title="Things I've built">
      <p className="mb-8 max-w-xl text-sm text-muted">
        Projects, cosplay, and community work. Click any card to bring it to the top —
        {isDesktop ? ' scroll horizontally for the rest.' : ' scroll down to peek the rest.'}
      </p>

      {isDesktop ? (
        <DesktopCarousel order={order} promote={promote} scrollerRef={scrollerRef} />
      ) : (
        <MobileStack order={order} promote={promote} />
      )}
    </Section>
  );
}

function DesktopCarousel({
  order,
  promote,
  scrollerRef,
}: {
  order: string[];
  promote: (id: string) => void;
  scrollerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const totalWidth = (workItems.length - 1) * PEEK_HORIZONTAL + CARD_SIZE;
  return (
    <div
      ref={scrollerRef}
      className="overflow-x-auto pb-10 pt-4 [scrollbar-color:var(--accent)_transparent] [scrollbar-width:thin]"
    >
      <div className="relative" style={{ width: totalWidth, height: CARD_SIZE + 24 }}>
        {order.map((id, i) => {
          const item = workItems.find((x) => x.id === id);
          if (!item) return null;
          const baseX = i * PEEK_HORIZONTAL;
          const baseZ = workItems.length - i;
          return (
            <motion.article
              key={id}
              onClick={() => promote(id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  promote(id);
                }
              }}
              role="button"
              tabIndex={0}
              aria-label={`${item.title} — click to bring to front`}
              initial={false}
              animate={{ x: baseX, y: 0, zIndex: baseZ }}
              whileHover={{ y: -16, zIndex: 999 }}
              transition={{ type: 'spring', stiffness: 240, damping: 28 }}
              className="absolute left-0 top-0 cursor-pointer overflow-hidden rounded-2xl border border-border bg-surface shadow-xl shadow-black/30 outline-none focus-visible:ring-2 focus-visible:ring-accent"
              style={{ width: CARD_SIZE, height: CARD_SIZE, transformOrigin: 'top left' }}
            >
              <CardBody item={item} isFront={order[0] === id} />
            </motion.article>
          );
        })}
      </div>
    </div>
  );
}

function MobileStack({
  order,
  promote,
}: {
  order: string[];
  promote: (id: string) => void;
}) {
  const totalHeight = (workItems.length - 1) * PEEK_VERTICAL + CARD_SIZE;
  return (
    <div className="relative mx-auto" style={{ height: totalHeight, maxWidth: CARD_SIZE }}>
      {order.map((id, i) => {
        const item = workItems.find((x) => x.id === id);
        if (!item) return null;
        const baseY = i * PEEK_VERTICAL;
        const baseZ = workItems.length - i;
        return (
          <motion.article
            key={id}
            onClick={() => promote(id)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                promote(id);
              }
            }}
            role="button"
            tabIndex={0}
            aria-label={`${item.title} — click to bring to front`}
            initial={false}
            animate={{ y: baseY, zIndex: baseZ }}
            whileHover={{ y: baseY - 18, zIndex: 999 }}
            transition={{ type: 'spring', stiffness: 240, damping: 28 }}
            className="absolute inset-x-0 cursor-pointer overflow-hidden rounded-2xl border border-border bg-surface shadow-xl shadow-black/20 outline-none focus-visible:ring-2 focus-visible:ring-accent"
            style={{ height: CARD_SIZE, transformOrigin: 'top center' }}
          >
            <CardBody item={item} isFront={i === 0} />
          </motion.article>
        );
      })}
    </div>
  );
}

function CardBody({ item, isFront }: { item: WorkItem; isFront: boolean }) {
  return (
    <>
      <div className="relative h-[200px] overflow-hidden bg-surface-2">
        {item.image ? (
          <img
            src={item.image}
            alt={item.title}
            loading="lazy"
            className="size-full object-cover"
          />
        ) : (
          <div className="flex size-full items-center justify-center bg-gradient-to-br from-accent/30 via-accent-soft to-transparent">
            <span className="font-mono text-2xl font-semibold tracking-tight text-accent">
              {item.title.split(' ')[0]}
            </span>
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />

        <motion.div
          initial={false}
          animate={{ opacity: isFront ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className="pointer-events-none absolute inset-x-0 bottom-0 p-4"
        >
          <p className="line-clamp-2 text-sm text-text/90 [text-shadow:0_1px_3px_rgb(0_0_0_/_0.6)]">
            {item.description}
          </p>
        </motion.div>
      </div>

      <div className="flex h-[120px] flex-col justify-between gap-2 border-t border-border bg-surface px-5 py-3">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base font-semibold leading-snug">{item.title}</h3>
          {item.href && (
            <a
              href={item.href}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              aria-label={`Open ${item.title}`}
              className="shrink-0 rounded-full p-1 text-muted transition hover:bg-accent-soft hover:text-accent"
            >
              <ExternalLink size={16} />
            </a>
          )}
        </div>
        <ul className="flex flex-wrap gap-1.5">
          {item.tags.slice(0, 4).map((tag) => (
            <li
              key={tag}
              className="rounded-full bg-accent-soft px-2 py-0.5 text-[11px] font-medium text-accent"
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
