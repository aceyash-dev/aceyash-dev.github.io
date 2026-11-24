import { Faq } from './Faq';
import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';
import { site } from '../data/site';

export function AboutSection() {
  return (
    <section className="section about-section" id="about" aria-labelledby="about-title">
      <SectionHeading
        id="about-title"
        number="05 / Context"
        title="Behind the"
        accent="work"
        meta="Independent developer"
      />

      <div className="about-grid">
        <Reveal className="about-portrait" y={18}>
          <img
            src="/me.jpg"
            alt="Abstract white, flame-like visual mark used on Yash's profile"
            loading="lazy"
            decoding="async"
          />
          <span className="about-portrait__label" aria-hidden="true">
            me / signal
          </span>
        </Reveal>

        <div className="about-copy">
          <Reveal>
            <p>
              I build interfaces that are <em>fast, quiet, and considered</em> — and that hold up under
              real use.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <p>
              My stack is deliberately close to the platform: HTML5, CSS, JavaScript, TypeScript, React,
              and Capacitor for native Android work.
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <p>
              Alongside my own projects, I run <em>The Ace Base</em>, where I build and ship tools for
              the web.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="about-faq">
        <Reveal className="about-faq__intro">
          <p className="eyebrow">Public profile</p>
          <h3>
            What <em>does</em> Ace Yash build?
          </h3>
          <a className="inline-link" href={site.docs} target="_blank" rel="noopener noreferrer">
            Read the docs ↗
          </a>
        </Reveal>
        <Reveal className="about-faq__list" delay={0.08}>
          <Faq />
        </Reveal>
      </div>
    </section>
  );
}
