import ClickSpark from './vendor/reactbits/ClickSpark';
import ShinyText from './vendor/reactbits/ShinyText';
import CRTWarp from './vendor/reactbits/CRTWarp';
import { ArrowDownIcon } from '@solar-icons/react/linear/arrow-down';
import { ArrowRightUpIcon } from '@solar-icons/react/linear/arrow-right-up';
import { Buildings3Icon } from '@solar-icons/react/linear/buildings-3';
import { CodeIcon } from '@solar-icons/react/linear/code';
import { MapPointIcon } from '@solar-icons/react/linear/map-point';
import { SheenPill } from './SheenPill';
import { site } from '../data/site';

/**
 * Editorial hero: milk canvas, oversized Instrument Serif headline,
 * Solar-icon meta row, framed portrait, and a click-spark interaction
 * (React Bits) for those who want to poke at it.
 */
export function Hero() {
  return (
    <ClickSpark
      className="hero-spark"
      sparkColor={['#f07836', '#c95720', '#24221f']}
      sparkSize={9}
      sparkRadius={26}
      sparkCount={8}
      sparkWidth={1.3}
      duration={480}
    >
      <header className="hero" id="top">
        <div className="hero-crt" aria-hidden="true">
          <CRTWarp color="#f07836" backgroundColor="#f7f4ec" lightMode speed={0.3} />
        </div>
        <div className="hero-inner">
          <div className="hero-copy">
            <SheenPill>Founder &amp; CEO, The Ace Base</SheenPill>

            <h1>
              I build
              <br />
              <em><ShinyText color="#c95720" shineColor="#fde2cc" speed={3} delay={1.5} shineWidth={60}>software.</ShinyText></em>
            </h1>

            <p className="hero-sub">
              <strong>Ace Yash</strong> is a developer and founder of{' '}
              <a className="inline-link" href={site.aceBase} target="_blank" rel="noopener noreferrer">
                The Ace Base
              </a>. I build web products and Android software.
            </p>

            <div className="hero-ctas">
              <a className="btn btn--solid" href="#work">
                View work
                <ArrowDownIcon size={17} aria-hidden="true" />
              </a>
              <a className="btn btn--ghost" href={`mailto:${site.email}`}>
                Get in touch
                <ArrowRightUpIcon size={17} aria-hidden="true" />
              </a>
            </div>

            <div className="hero-meta">
              <span>
                <MapPointIcon size={16} aria-hidden="true" />
                Varanasi, India
              </span>
              <span>
                <Buildings3Icon size={16} aria-hidden="true" />
                Founder & CEO, The Ace Base
              </span>
              <span>
                <CodeIcon size={16} aria-hidden="true" />
                React · TypeScript · Node.js
              </span>
            </div>
          </div>

          <div className="portrait-wrap">
            <span className="portrait-ring" aria-hidden="true" />
            <figure className="portrait-arch">
              <img
                src="/me.jpg"
                width={460}
                height={460}
                alt="White flame emblem — Ace Yash's personal mark for The Ace Base"
              />
            </figure>
            <div className="portrait-card">
              <b>The Ace Base</b>
              <span>
                <a href={site.aceBase} target="_blank" rel="noopener noreferrer">
                  ace-base.cc
                </a>
                <ArrowRightUpIcon size={13} aria-hidden="true" />
              </span>
            </div>
          </div>
        </div>

        <span className="hero-scroll" aria-hidden="true">
          Scroll <ArrowDownIcon size={13} />
        </span>
      </header>
    </ClickSpark>
  );
}
