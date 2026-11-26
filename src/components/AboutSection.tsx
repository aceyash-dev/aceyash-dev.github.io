import BlurText from './vendor/reactbits/BlurText';
import { Faq } from './Faq';
import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';
import { faqs, profileFacts, site } from '../data/site';

/**
 * About — the human layer: portrait, plain-spoken bio, fast facts,
 * then the question-first FAQ that doubles as answer-engine content.
 */
export function AboutSection() {
  return (
    <section className="section" id="about" aria-labelledby="about-title">
      <div className="container">
        <SectionHeading
          id="about-title"
          index="04"
          label="About"
          title="Behind the"
          accent="work"
          meta="Developer · Founder & CEO · Varanasi, India"
        />

        <div className="about-grid">
          <div className="about-portrait">
            <figure className="portrait-arch">
              <img
                src="/me.jpg"
                width={460}
                height={460}
                alt="White flame emblem — Ace Yash's personal mark for The Ace Base"
                loading="lazy"
                decoding="async"
              />
            </figure>
            <span className="about-portrait__label" aria-hidden="true">
              Ace / Yash
            </span>
          </div>

          <div className="about-copy">
            <BlurText
              className="about-lead"
              text="I build interfaces that are fast, quiet, and considered — and that hold up under real use."
              animateBy="words"
              direction="top"
              effect="focus"
              trigger="view"
              threshold={0.15}
              stepDuration={0.32}
              blur={8}
              distance={14}
              delay={24}
              focusOnHover={false}
            />
            <p style={{ fontSize: 'var(--step-0)', color: 'var(--ink-soft)' }}>
              My stack stays deliberately close to the platform — HTML5, CSS, JavaScript,
              TypeScript, React on the web; Kotlin on Android; Go and Node.js on the backend —
              with Tailwind for utility styling and Motion when choreography earns its keep.
            </p>
            <p style={{ fontSize: 'var(--step-0)', color: 'var(--ink-soft)' }}>
              Alongside my own projects, I run <em>The Ace Base</em>, where I build and ship
              tools for the web — from Typace, a typography organizer, to the documentation
              and this site itself. The through-line is taste: fewer features, deeper craft.
            </p>

            <dl className="about-facts">
              {profileFacts.map((fact) => (
                <div className="fact" key={fact.label}>
                  <dt>{fact.label}</dt>
                  <dd>
                    {fact.href ? (
                      <a
                        href={fact.href}
                        {...(fact.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      >
                        {fact.value}
                      </a>
                    ) : (
                      fact.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="faq">
          <Reveal>
            <h3>Questions, answered.</h3>
          </Reveal>
          <Faq items={faqs} />
        </div>
      </div>
    </section>
  );
}
