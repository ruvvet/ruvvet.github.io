import { motion } from 'framer-motion';
import { profile } from '../content/profile';
import { Section } from './Section';

export function About() {
  return (
    <Section id="about" eyebrow="About" title="Who I am" alt>
      <div className="grid gap-12 md:grid-cols-[1fr_1.4fr] md:items-start">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <div className="absolute -inset-3 -z-10 rounded-3xl bg-accent-soft blur-xl" />
          <img
            src={profile.avatar}
            alt={profile.name}
            className="mx-auto aspect-square w-full max-w-[260px] rounded-3xl object-cover md:max-w-none"
            loading="lazy"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          {profile.bio.map((p, i) => (
            <p key={i} className="mb-4 text-lg leading-relaxed text-muted">
              {p}
            </p>
          ))}

          <dl className="mt-8 grid gap-x-8 gap-y-4 sm:grid-cols-2">
            {profile.info.map((item) => (
              <div key={item.label} className="border-l-2 border-accent/40 pl-4">
                <dt className="text-xs font-semibold uppercase tracking-wider text-muted">
                  {item.label}
                </dt>
                <dd className="mt-1 text-sm text-text">
                  {item.href ? (
                    <a href={item.href} className="hover:text-accent">
                      {item.value}
                    </a>
                  ) : (
                    item.value
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </motion.div>
      </div>
    </Section>
  );
}
