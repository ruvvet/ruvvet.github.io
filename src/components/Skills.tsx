import { motion } from 'framer-motion';
import { comfortableWith, coreStack } from '../content/skills';
import { Section } from './Section';

export function Skills() {
  return (
    <Section id="skills" eyebrow="Skills" title="What I work with">
      <div className="mb-14">
        <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-muted">
          Core stack
        </h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {coreStack.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.35, delay: i * 0.04 }}
              className="group relative flex aspect-square flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl border border-border bg-surface/60 p-5 backdrop-blur transition hover:-translate-y-0.5 hover:border-accent/40"
            >
              <span
                aria-hidden
                className="absolute inset-0 -z-10 opacity-0 transition group-hover:opacity-100"
                style={{
                  background: `radial-gradient(circle at 50% 30%, ${s.brandColor}22, transparent 70%)`,
                }}
              />
              <s.Icon size={40} style={{ color: s.brandColor }} aria-hidden />
              <span className="text-sm font-medium text-text">{s.name}</span>
            </motion.div>
          ))}
        </div>
      </div>

      <div>
        <div className="grid gap-x-10 gap-y-8 md:grid-cols-2">
          {comfortableWith.map((group, i) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.35, delay: i * 0.04 }}
            >
              <h4 className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-accent">
                {group.category}
              </h4>
              <ul className="flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full bg-surface-2 px-2.5 py-1 text-xs font-medium text-text/85"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
