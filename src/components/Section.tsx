import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

type Props = {
  id: string;
  eyebrow?: string;
  title?: string;
  children: ReactNode;
  alt?: boolean;
};

export function Section({ id, eyebrow, title, children, alt = false }: Props) {
  return (
    <section
      id={id}
      className={`scroll-mt-8 px-6 py-20 sm:px-10 md:px-16 lg:px-20 ${
        alt ? 'bg-surface' : 'bg-bg'
      }`}
    >
      <div className="mx-auto max-w-5xl">
        {(eyebrow || title) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="mb-12"
          >
            {eyebrow && (
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                {eyebrow}
              </span>
            )}
            {title && (
              <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">{title}</h2>
            )}
            <div className="mt-4 h-px w-12 bg-accent" />
          </motion.div>
        )}
        {children}
      </div>
    </section>
  );
}
