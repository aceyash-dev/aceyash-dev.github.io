import { useReducedMotion } from 'motion/react';
import Magnet from './vendor/reactbits/Magnet';
import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';
import { site } from '../data/site';

export function ContactSection() {
  const reducedMotion = Boolean(useReducedMotion());

  return (
    <section className="section contact-section" id="contact" aria-labelledby="contact-title">
      <SectionHeading
        id="contact-title"
        number="06 / Return"
        title="Come back"
        accent="around"
        meta="Let's build"
      />

      <Reveal y={30}>
        <h3 className="contact-head">
          Let's build
          <br />
          <em>something.</em>
        </h3>
      </Reveal>

      <div className="contact-bottom">
        <Reveal delay={0.08}>
          <p className="contact-note">
            Founder &amp; CEO of{' '}
            <a className="inline-link" href={site.aceBase} target="_blank" rel="noopener noreferrer">
              The Ace Base
            </a>
            . For projects, collaborations, or other useful trouble, get in touch.
          </p>
        </Reveal>

        <Magnet
          padding={110}
          disabled={reducedMotion}
          magnetStrength={2.5}
          maxOffset={18}
          exclusive
          axis="both"
          spring={{ stiffness: 180, damping: 18, mass: 0.8 }}
          wrapperClassName="magnet-wrap"
          innerClassName="magnet-inner"
        >
          <m3e-button
            variant="filled"
            size="large"
            href={`mailto:${site.email}`}
            aria-label={`Email The Ace Base at ${site.email}`}
          >
            {site.email} <i aria-hidden="true">↗</i>
          </m3e-button>
        </Magnet>
      </div>
    </section>
  );
}
