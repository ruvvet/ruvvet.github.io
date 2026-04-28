import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { profile } from '../content/profile';

const roleSequence = profile.typedPhrases.flatMap((p) => [p, 1800]);

function K({ children }: { children: React.ReactNode }) {
  return <span className="text-syn-keyword">{children}</span>;
}
function S({ children }: { children: React.ReactNode }) {
  return <span className="text-syn-string">{children}</span>;
}
function P({ children }: { children: React.ReactNode }) {
  return <span className="text-syn-prop">{children}</span>;
}
function T({ children }: { children: React.ReactNode }) {
  return <span className="text-syn-type">{children}</span>;
}
function C({ children }: { children: React.ReactNode }) {
  return <span className="text-syn-comment">{children}</span>;
}
function Punc({ children }: { children: React.ReactNode }) {
  return <span className="text-white/60">{children}</span>;
}

type LineProps = { n: number; children: React.ReactNode };
function Line({ n, children }: LineProps) {
  return (
    <div className="flex gap-4 leading-7">
      <span aria-hidden className="w-6 select-none text-right text-syn-comment/60 tabular-nums">
        {n}
      </span>
      <span className="flex-1 whitespace-pre-wrap">{children}</span>
    </div>
  );
}

export function CodeWindow() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
      className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-border bg-code-bg shadow-2xl shadow-black/40"
    >
      <div className="absolute -inset-px -z-10 rounded-2xl bg-gradient-to-br from-accent/30 via-transparent to-blue-500/20 blur-2xl" />

      <div className="flex items-center gap-2 border-b border-white/5 bg-code-chrome px-4 py-3">
        <div className="flex gap-1.5">
          <span className="size-3 rounded-full bg-[#ff5f57]" />
          <span className="size-3 rounded-full bg-[#febc2e]" />
          <span className="size-3 rounded-full bg-[#28c840]" />
        </div>
        <span className="ml-3 font-mono text-xs text-syn-comment">~/jenny.ts</span>
      </div>

      <pre className="overflow-x-auto px-4 py-4 font-mono text-[11.5px] leading-6 text-text/90 sm:px-5 sm:py-5 sm:text-[13px] sm:leading-7 md:text-sm">
        <Line n={1}>
          <C>{`// who's this`}</C>
        </Line>
        <Line n={2}>
          <K>const</K> <P>jenny</P> <Punc>=</Punc> <Punc>{'{'}</Punc>
        </Line>
        <Line n={3}>
          {'  '}
          <P>name</P>
          <Punc>:</Punc> <S>{`'Jenny Feng'`}</S>
          <Punc>,</Punc>
        </Line>
        <Line n={4}>
          {'  '}
          <P>role</P>
          <Punc>:</Punc> <S>{`'`}</S>
          <S>
            <TypeAnimation
              sequence={roleSequence}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              cursor
            />
          </S>
          <S>{`'`}</S>
          <Punc>,</Punc>
        </Line>
        <Line n={5}>
          {'  '}
          <P>building</P>
          <Punc>:</Punc> <S>{`'CoreServices @ Jewelers Mutual'`}</S>
          <Punc>,</Punc>
        </Line>
        <Line n={6}>
          {'  '}
          <P>stack</P>
          <Punc>:</Punc> <Punc>[</Punc>
          <S>{`'TypeScript'`}</S>
          <Punc>, </Punc>
          <S>{`'AWS'`}</S>
          <Punc>, </Punc>
          <S>{`'Kafka'`}</S>
          <Punc>]</Punc> <K>as const</K>
          <Punc>,</Punc>
        </Line>
        <Line n={7}>
          {'  '}
          <P>also</P>
          <Punc>:</Punc> <Punc>[</Punc>
          <S>{`'gamer'`}</S>
          <Punc>, </Punc>
          <S>{`'esports lover'`}</S>
          <Punc>, </Punc>
          <S>{`'cosplayer'`}</S>
          <Punc>]</Punc>
          <Punc>,</Punc>
        </Line>
        <Line n={8}>
          <Punc>{'}'}</Punc> <K>satisfies</K> <T>Engineer</T>
        </Line>
      </pre>
    </motion.div>
  );
}
