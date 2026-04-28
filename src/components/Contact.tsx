import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Loader2, Mail, MapPin, Phone, Send } from 'lucide-react';
import { profile } from '../content/profile';
import { Section } from './Section';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_KEY ?? '';

export function Contact() {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!ACCESS_KEY) {
      setStatus('error');
      setErrorMsg('Form is not configured yet — set VITE_WEB3FORMS_KEY to enable submissions.');
      return;
    }
    setStatus('submitting');
    setErrorMsg(null);
    const formData = new FormData(event.currentTarget);
    formData.append('access_key', ACCESS_KEY);
    formData.append('subject', 'New message from ruvvet.com');

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        event.currentTarget.reset();
      } else {
        setStatus('error');
        setErrorMsg(data.message ?? 'Something went wrong.');
      }
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Network error.');
    }
  };

  return (
    <Section id="contact" eyebrow="Get in touch" title="Say hi" alt>
      <div className="grid gap-10 md:grid-cols-[1fr_1.4fr]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <p className="text-base text-muted">
            Got a project, role, or just want to chat about Siege ranked? Drop a note — I'll get back to you.
          </p>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <span className="mt-0.5 inline-flex size-9 items-center justify-center rounded-xl bg-accent-soft text-accent">
                <Mail size={16} />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted">Email</p>
                <a href={`mailto:${profile.email}`} className="text-sm text-text hover:text-accent">
                  {profile.email}
                </a>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-0.5 inline-flex size-9 items-center justify-center rounded-xl bg-accent-soft text-accent">
                <Phone size={16} />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted">Phone</p>
                <p className="text-sm text-text">{profile.phone}</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-0.5 inline-flex size-9 items-center justify-center rounded-xl bg-accent-soft text-accent">
                <MapPin size={16} />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted">Online</p>
                <a href={profile.website} className="text-sm text-text hover:text-accent">
                  ruvvet.com
                </a>
              </div>
            </li>
          </ul>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          onSubmit={handleSubmit}
          className="space-y-4 rounded-3xl border border-border bg-surface/60 p-6 backdrop-blur sm:p-8"
        >
          <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} aria-hidden />

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Name" name="name" required />
            <Field label="Email" type="email" name="email" required />
          </div>
          <Field label="Subject" name="form_subject" />
          <Field as="textarea" label="Message" name="message" rows={5} required />

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-accent/20 transition hover:scale-[1.02] disabled:opacity-60"
          >
            {status === 'submitting' ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Sending…
              </>
            ) : (
              <>
                <Send size={16} />
                Send message
              </>
            )}
          </button>

          {status === 'success' && (
            <p className="flex items-center gap-2 text-sm text-emerald-400">
              <CheckCircle2 size={16} />
              Message sent — talk soon!
            </p>
          )}
          {status === 'error' && errorMsg && (
            <p className="text-sm text-red-400">{errorMsg}</p>
          )}
        </motion.form>
      </div>
    </Section>
  );
}

type FieldProps = {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  rows?: number;
  as?: 'input' | 'textarea';
};

function Field({ label, name, type = 'text', required, rows, as = 'input' }: FieldProps) {
  const className =
    'mt-1.5 w-full rounded-xl border border-border bg-surface-2 px-4 py-2.5 text-sm text-text outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/30';
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-wider text-muted">{label}</span>
      {as === 'textarea' ? (
        <textarea name={name} required={required} rows={rows} className={className} />
      ) : (
        <input name={name} type={type} required={required} className={className} />
      )}
    </label>
  );
}
