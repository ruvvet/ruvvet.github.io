import { motion } from 'framer-motion';
import { Award, Download } from 'lucide-react';
import { certifications, education, experience } from '../content/resume';
import { profile } from '../content/profile';
import { Section } from './Section';
import { highlightKeywords } from './highlight';

function Timeline({ entries }: { entries: typeof experience }) {
  return (
    <ol className="relative space-y-8 border-l border-border pl-6">
      {entries.map((e, i) => (
        <motion.li
          key={`${e.title}-${e.org}`}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.4, delay: i * 0.05 }}
        >
          <span className="absolute -left-[7px] mt-1.5 size-3 rounded-full bg-accent ring-4 ring-bg" />
          <div>
            <h4 className="text-base font-semibold">{e.title}</h4>
            <p className="text-sm text-muted">
              {e.org}
              {e.dates && (
                <>
                  {' · '}
                  <span className="text-muted/80">{e.dates}</span>
                </>
              )}
              {e.location && (
                <>
                  {' · '}
                  <span className="text-muted/80">{e.location}</span>
                </>
              )}
            </p>
            {e.stack && e.stack.length > 0 && (
              <ul className="mt-2.5 flex flex-wrap gap-1.5">
                {e.stack.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full bg-accent-soft px-2 py-0.5 text-[11px] font-medium text-accent"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            )}
            {e.bullets && (
              <ul className="mt-3 space-y-2 text-sm text-muted">
                {e.bullets.map((b, idx) => (
                  <li key={idx} className="leading-relaxed">
                    <span className="mr-2 text-accent">·</span>
                    {highlightKeywords(b)}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </motion.li>
      ))}
    </ol>
  );
}

export function Resume() {
  return (
    <Section id="resume" eyebrow="Career" title="Resume" alt>
      <div className="mb-10 flex flex-wrap items-center gap-3">
        <a
          href={profile.resumePdf}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-2 px-4 py-2 text-sm font-medium text-text transition hover:border-accent hover:text-accent"
        >
          <Download size={14} />
          Download PDF
        </a>
      </div>

      <div className="space-y-14">
        <div>
          <h3 className="mb-6 text-lg font-semibold">Experience</h3>
          <Timeline entries={experience} />
        </div>
        <div>
          <h3 className="mb-6 text-lg font-semibold">Education</h3>
          <Timeline entries={education} />
        </div>

        {certifications.length > 0 && (
          <div>
            <h3 className="mb-6 text-lg font-semibold">Certifications</h3>
            <ul className="space-y-2">
              {certifications.map((c) => (
                <li
                  key={c}
                  className="flex items-start gap-3 rounded-2xl border border-border bg-surface/60 p-4 text-sm text-text"
                >
                  <Award size={16} className="mt-0.5 shrink-0 text-accent" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Section>
  );
}
