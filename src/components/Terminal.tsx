import { useEffect, useRef, useState } from 'react';
import type { KeyboardEvent, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { profile } from '../content/profile';
import { useTheme } from '../hooks/useTheme';

type Line = ReactNode;
type HistoryEntry = { kind: 'command'; text: string } | { kind: 'output'; lines: Line[] };

type Ctx = {
  scrollTo: (id: string) => boolean;
  toggleTheme: () => void;
  clear: () => void;
};

type Handler = (args: string[], ctx: Ctx) => Line[] | undefined;

const SECTIONS = ['about', 'skills', 'resume', 'work', 'contact'] as const;

const a = (s: string) => <span className="text-accent">{s}</span>;

const helpLines: Line[] = [
  'available commands:',
  '',
  <>{a('help')}          show this list</>,
  <>{a('whoami')}        who I am</>,
  <>{a('about')}         bio</>,
  <>{a('now')}           current work</>,
  <>{a('skills')}        tech I work with</>,
  <>{a('projects')}      side projects</>,
  <>{a('cv')}            open resume PDF</>,
  <>{a('contact')}       reach out</>,
  <>{a('goto')} {a('<section>')}   scroll to a section</>,
  <>{a('theme')}         toggle dark/light</>,
  <>{a('clear')}         clear screen</>,
];

const commands: Record<string, Handler> = {
  help: () => helpLines,
  whoami: () => ['Jenny Feng — Software Engineer @ Jewelers Mutual Insurance Group'],
  about: () => profile.bio,
  now: () => [
    'Building CoreServices at Jewelers Mutual.',
    '~30 microservices · Custom TypeScript framework · Event-driven',
    <>
      stack: {a('TypeScript')} · {a('Node.js')} · {a('AWS Lambda')} · {a('Kafka')} ·{' '}
      {a('PostgreSQL')} · {a('Bun')} · {a('Spacelift')}
    </>,
  ],
  skills: () => [
    <>{a('core:')} TypeScript · Node.js · AWS · Kafka · PostgreSQL · React</>,
    <>{a('also:')} NestJS · Bun · Hono · Prisma · Spacelift · Terraform · Stripe · …</>,
    <>type {a("'goto skills'")} for the full list.</>,
  ],
  projects: () => [
    'star-eighty-six   anonymous voicemails',
    'project-dexter    raspberry pi pet camera',
    'otp               friend finder for gamers',
    'vodsweeper        twitch vod matcher',
    'wapp              hydration tracker',
    'uwumoji           discord emoji manager',
    'untitled-game     vanilla js arcade',
    'masters-thesis    real-time tweet summarization',
    <>type {a("'goto projects'")} for full details.</>,
  ],
  cv: () => {
    window.open(profile.resumePdf, '_blank', 'noopener,noreferrer');
    return [<>opening {a('resume.pdf')} in a new tab…</>];
  },
  contact: () => [
    <>{a('email   ')} {profile.email}</>,
    <>{a('phone   ')} {profile.phone}</>,
    <>{a('github  ')} github.com/ruvvet</>,
    <>{a('linkedin')} linkedin.com/in/jcfeng</>,
    <>type {a("'goto contact'")} for the form.</>,
  ],
  goto: (args, ctx) => {
    const target = args[0]?.toLowerCase();
    const valid = [...SECTIONS, 'top'].join(', ');
    if (!target) {
      return [<>usage: {a('goto')} {a('<section>')}</>, `valid: ${valid}`];
    }
    if (target === 'top' || target === 'home' || target === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return [`→ scrolling to top`];
    }
    if (!(SECTIONS as readonly string[]).includes(target)) {
      return [<>unknown section: {a(target)}</>, `valid: ${valid}`];
    }
    if (ctx.scrollTo(target)) return [`→ scrolling to ${target}`];
    return [`couldn't find section: ${target}`];
  },
  theme: (_, ctx) => {
    ctx.toggleTheme();
    return ['theme toggled.'];
  },
  clear: (_, ctx) => {
    ctx.clear();
    return undefined;
  },
  ls: () => helpLines,
  pwd: () => ['/home/jenny'],
  date: () => [new Date().toString()],
  echo: (args) => [args.join(' ')],
  sudo: () => ['sudo: permission denied'],
  vim: () => [<>you can't escape that easily. try {a('help')}.</>],
  exit: () => ['nice try'],
  quit: () => ['nice try'],
};

const ALIASES: Record<string, string> = {
  resume: 'cv',
  social: 'contact',
  ls: 'help',
};

function Prompt() {
  return (
    <span className="select-none whitespace-pre">
      <span className="text-syn-string">jenny@ruvvet</span>
      <span className="text-syn-comment">:</span>
      <span className="text-syn-prop">~</span>
      <span className="text-syn-comment">$ </span>
    </span>
  );
}

const WELCOME: HistoryEntry = {
  kind: 'output',
  lines: [
    <>welcome to {a('ruvvet.sh')} — Jenny Feng's terminal.</>,
    <>type {a('help')} to see what you can do.</>,
  ],
};

export function Terminal() {
  const [history, setHistory] = useState<HistoryEntry[]>([WELCOME]);
  const [input, setInput] = useState('');
  const [recall, setRecall] = useState<{ list: string[]; idx: number }>({ list: [], idx: -1 });
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toggle: toggleTheme } = useTheme();

  const runCommand = (raw: string) => {
    const trimmed = raw.trim();
    setHistory((h) => [...h, { kind: 'command', text: trimmed }]);
    if (trimmed) setRecall((r) => ({ list: [...r.list, trimmed], idx: -1 }));
    if (!trimmed) return;

    const parts = trimmed.split(/\s+/);
    let name = parts[0].toLowerCase();
    name = ALIASES[name] ?? name;
    const args = parts.slice(1);

    const handler = commands[name];
    const ctx: Ctx = {
      scrollTo: (id) => {
        const el = document.getElementById(id);
        if (!el) return false;
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return true;
      },
      toggleTheme,
      clear: () => setHistory([]),
    };

    if (handler) {
      const out = handler(args, ctx);
      if (out !== undefined) {
        setHistory((h) => [...h, { kind: 'output', lines: out }]);
      }
    } else {
      setHistory((h) => [
        ...h,
        {
          kind: 'output',
          lines: [
            <>{a(name)}: command not found</>,
            <>type {a('help')} to see available commands.</>,
          ],
        },
      ]);
    }
  };

  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      runCommand(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (recall.list.length === 0) return;
      const next = recall.idx === -1 ? recall.list.length - 1 : Math.max(0, recall.idx - 1);
      setRecall((r) => ({ ...r, idx: next }));
      setInput(recall.list[next] ?? '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (recall.idx === -1) return;
      const next = recall.idx + 1;
      if (next >= recall.list.length) {
        setRecall((r) => ({ ...r, idx: -1 }));
        setInput('');
      } else {
        setRecall((r) => ({ ...r, idx: next }));
        setInput(recall.list[next]);
      }
    } else if (e.key === 'l' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      setHistory([]);
    }
  };

  useEffect(() => {
    const el = containerRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [history, input]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut', delay: 0.15 }}
      onClick={() => inputRef.current?.focus({ preventScroll: true })}
      className="relative flex w-full min-h-[320px] min-w-[360px] resize flex-col overflow-hidden rounded-2xl border border-border bg-code-bg shadow-2xl shadow-black/40"
      style={{ maxWidth: 'min(42rem, 100%)', maxHeight: 'min(80svh, 700px)', height: 500 }}
    >
      <div className="absolute -inset-px -z-10 rounded-2xl bg-gradient-to-br from-accent/20 via-transparent to-blue-500/15 blur-2xl" />

      <div className="flex items-center gap-2 border-b border-white/5 bg-code-chrome px-4 py-3">
        <div className="flex gap-1.5">
          <span className="size-3 rounded-full bg-[#ff5f57]" />
          <span className="size-3 rounded-full bg-[#febc2e]" />
          <span className="size-3 rounded-full bg-[#28c840]" />
        </div>
        <span className="ml-3 font-mono text-xs text-syn-comment">jenny@ruvvet — bash</span>
      </div>

      <div
        ref={containerRef}
        className="min-h-0 flex-1 overflow-y-auto px-5 py-5 font-mono text-[13px] leading-7 text-text/90 md:text-sm"
      >
        {history.map((entry, i) =>
          entry.kind === 'command' ? (
            <div key={i} className="flex">
              <Prompt />
              <span className="break-words">{entry.text}</span>
            </div>
          ) : (
            <div key={i} className="mb-2 mt-0.5 space-y-0.5">
              {entry.lines.map((line, j) => (
                <div key={j} className="whitespace-pre-wrap text-text/80">
                  {line}
                </div>
              ))}
            </div>
          ),
        )}

        <div className="flex">
          <Prompt />
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
            aria-label="Terminal input"
            className="min-w-0 flex-1 border-none bg-transparent font-mono text-text/90 outline-none caret-accent"
          />
        </div>
      </div>
    </motion.div>
  );
}
