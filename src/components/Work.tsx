import { useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { workItems, type WorkItem } from '../content/work';
import { Section } from './Section';

const PEEK = 64;
const CARD_HEIGHT = 320;

export function Work() {
  const [order, setOrder] = useState<string[]>(() => workItems.map((i) => i.id));

  const promote = useCallback((id: string) => {
    setOrder((prev) => {
      if (prev[0] === id) return prev;
      return [id, ...prev.filter((x) => x !== id)];
    });
  }, []);

  const totalHeight = (workItems.length - 1) * PEEK + CARD_HEIGHT;

  return (
    <Section id="work" eyebrow="Side work" title="Things I've built">
      <p className="mb-10 max-w-xl text-sm text-muted">
        Projects, cosplay, community work — click any card to bring it to the top of the stack.
        Hover to peek.
      </p>

      <div className="relative w-full" style={{ height: totalHeight }}>
        {order.map((id, i) => {
          const item = workItems.find((x) => x.id === id);
          if (!item) return null;
          return (
            <Card
              key={id}
              item={item}
              stackIndex={i}
              isFront={i === 0}
              onPromote={() => promote(id)}
            />
          );
        })}
      </div>
    </Section>
  );
}

function Card({
  item,
  stackIndex,
  isFront,
  onPromote,
}: {
  item: WorkItem;
  stackIndex: number;
  isFront: boolean;
  onPromote: () => void;
}) {
  const baseY = stackIndex * PEEK;
  const baseScale = 1 - stackIndex * 0.008;
  const baseZ = workItems.length - stackIndex;

  return (
    <motion.article
      onClick={onPromote}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onPromote();
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`${item.title} — click to bring to front`}
      initial={false}
      animate={{
        y: baseY,
        scale: baseScale,
        zIndex: baseZ,
      }}
      whileHover={{
        y: baseY - 18,
        scale: baseScale * 1.015,
        zIndex: 999,
      }}
      transition={{ type: 'spring', stiffness: 240, damping: 28 }}
      className="absolute inset-x-0 cursor-pointer overflow-hidden rounded-2xl border border-border bg-surface shadow-xl shadow-black/20 outline-none focus-visible:ring-2 focus-visible:ring-accent"
      style={{ height: CARD_HEIGHT, transformOrigin: 'top center' }}
    >
      {/* Image area — top portion */}
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

        {/* Description shows when card is on top */}
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

      {/* Bottom strip — title + tags + link, always visible in peek */}
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
    </motion.article>
  );
}
