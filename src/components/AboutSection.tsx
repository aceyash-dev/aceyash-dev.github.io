import { Faq } from './Faq';
import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';
import { faqs, profileFacts } from '../data/site';

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
            <p className="about-lead">Developer and founder of The Ace Base, based in Varanasi, India.</p>
            <p style={{ fontSize: 'var(--step-0)', color: 'var(--ink-soft)' }}>
              I build web applications with HTML, CSS, JavaScript, TypeScript and React, plus
              native Android software. I lead product and engineering at The Ace Base.
            </p>
            <p style={{ fontSize: 'var(--step-0)', color: 'var(--ink-soft)' }}>
              Public work includes The Ace Base and Typace, its typography organizer.
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
