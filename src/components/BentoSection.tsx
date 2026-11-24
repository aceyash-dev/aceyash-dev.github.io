import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowUpRightIcon, CodeIcon, GithubIcon, Location01Icon, SparklesIcon } from '@hugeicons/core-free-icons';
import { site } from '../data/site';

const stack = ['JavaScript', 'Go', 'HTML5', 'React', 'TypeScript'];

function haptic() {
  if (typeof navigator !== 'undefined' && 'vibrate' in navigator) navigator.vibrate?.(10);
}

export function BentoSection() {
  return (
    <section className="bento-section mx-auto w-full max-w-[1440px] px-[var(--pad)] py-20 md:py-28" aria-labelledby="bento-title">
      <div className="mb-7 flex items-end justify-between gap-6">
        <div>
          <p className="eyebrow">A little about me / 02</p>
          <h2 id="bento-title" className="font-display text-5xl leading-none tracking-[-.04em] text-ink md:text-7xl">Builder, <em className="text-orange">founder,</em> optimist.</h2>
        </div>
        <span className="hidden text-sm text-ink/50 md:block">Independent by nature. Collaborative by choice.</span>
      </div>

      <div className="bento-grid grid grid-cols-1 gap-3 md:grid-cols-6 md:auto-rows-[minmax(150px,1fr)]">
        <a href={site.aceBase} target="_blank" rel="noreferrer" onClick={haptic} className="bento-card bento-founder group relative overflow-hidden rounded-3xl bg-ink p-7 text-milk shadow-card transition duration-500 hover:-translate-y-1 hover:shadow-glow md:col-span-3 md:row-span-2 md:p-9">
          <div className="relative z-10 flex h-full min-h-[270px] flex-col justify-between">
            <div className="flex items-start justify-between"><span className="bento-kicker">Founder & CEO</span><span className="bento-icon"><HugeiconsIcon icon={ArrowUpRightIcon} size={22} /></span></div>
            <div><h3 className="font-display text-5xl leading-[.92] md:text-7xl">The Ace<br/><em className="text-orange-light">Base.</em></h3><p className="mt-5 max-w-sm text-sm leading-relaxed text-milk/60">Building useful software and digital infrastructure for the next generation of the web.</p></div>
            <span className="text-xs uppercase tracking-[.18em] text-milk/55">ace-base.cc <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">↗</span></span>
          </div>
          <div className="bento-orbit" aria-hidden="true" />
        </a>

        <div className="bento-card bento-stack rounded-3xl bg-[#fffdf8] p-7 shadow-card md:col-span-3 md:row-span-1">
          <div className="mb-5 flex items-center justify-between"><span className="bento-kicker">Tools I reach for</span><HugeiconsIcon icon={CodeIcon} size={20} className="text-orange" /></div>
          <div className="flex flex-wrap gap-2">{stack.map((item) => <span key={item} className="stack-chip">{item}</span>)}</div>
          <p className="mt-5 text-sm text-ink/55">Plus the right tool for the idea, not the trend.</p>
        </div>

        <a href={site.github} target="_blank" rel="noreferrer" onClick={haptic} className="bento-card group flex min-h-[180px] flex-col justify-between rounded-3xl bg-[#eadfd0] p-7 text-ink transition duration-500 hover:-translate-y-1 md:col-span-2">
          <div className="flex items-center justify-between"><span className="bento-kicker">Open source</span><HugeiconsIcon icon={GithubIcon} size={21} className="text-orange" /></div>
          <div><p className="font-display text-3xl">Code in the open.</p><span className="mt-2 inline-flex items-center gap-2 text-xs text-ink/55">github.com/aceyash-dev <HugeiconsIcon icon={ArrowUpRightIcon} size={14} className="transition-transform group-hover:translate-x-1" /></span></div>
        </a>

        <div className="bento-card flex min-h-[180px] flex-col justify-between rounded-3xl bg-orange p-7 text-[#fff8ee] md:col-span-2">
          <div className="flex items-center justify-between"><span className="bento-kicker">Based in</span><HugeiconsIcon icon={Location01Icon} size={21} /></div>
          <div><p className="font-display text-4xl">Varanasi, India.</p><p className="mt-2 text-sm text-white/75">Working everywhere.</p></div>
        </div>

        <div className="bento-card flex min-h-[180px] flex-col justify-between rounded-3xl border border-ink/10 bg-[#f0e9dc] p-7 text-ink md:col-span-2">
          <div className="flex items-center justify-between"><span className="bento-kicker">Currently</span><HugeiconsIcon icon={SparklesIcon} size={21} className="text-orange" /></div>
          <div><p className="font-display text-4xl">Making it real.</p><p className="mt-2 text-sm text-ink/55">Curious, intentional, shipping.</p></div>
        </div>
      </div>
    </section>
  );
}
