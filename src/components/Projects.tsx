import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { projects } from '../content/resume';
import { Section } from './Section';
import { highlightKeywords } from './highlight';

export function Projects() {
  return (
    <Section id="projects" eyebrow="Side work" title="Things I've built">
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <motion.article
            key={p.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.35, delay: i * 0.04 }}
            className="group flex flex-col rounded-2xl border border-border bg-surface/60 p-5 backdrop-blur transition hover:-translate-y-0.5 hover:border-accent/40"
          >
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-base font-semibold leading-snug">{p.title}</h3>
              {p.href && (
                <a
                  href={p.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Open ${p.title}`}
                  className="shrink-0 text-muted transition hover:text-accent"
                >
                  <ExternalLink size={15} />
                </a>
              )}
            </div>

            <ul className="mt-3 flex flex-wrap gap-1.5">
              {p.stack.map((s) => (
                <li
                  key={s}
                  className="rounded-full bg-accent-soft px-2 py-0.5 text-[11px] font-medium text-accent"
                >
                  {s}
                </li>
              ))}
            </ul>

            <p className="mt-3 text-sm leading-relaxed text-muted">{highlightKeywords(p.description)}</p>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}
