import { Fragment } from 'react';
import BlurText from './vendor/reactbits/BlurText';
import { SectionHeading } from './SectionHeading';
import { Reveal } from './Reveal';
import { SkillsExplorer } from './SkillsExplorer';
import { profileRows, skillsRail } from '../data/site';

const railItems = [...skillsRail, ...skillsRail];

export function ProfileSection() {
  return (
    <section className="section profile-section" id="profile" aria-labelledby="profile-title">
      <SectionHeading
        id="profile-title"
        number="04 / Identity"
        title="Built from"
        accent="curiosity"
        meta="Varanasi · India"
      />

      <div className="profile-grid">
        <div className="profile-intro">
          <Reveal>
            <p className="profile-kicker">Yash · Teen developer</p>
          </Reveal>
          <Reveal delay={0.06}>
            <h3>
              Building on the web, <em>one strange idea at a time.</em>
            </h3>
          </Reveal>
          <BlurText
            className="profile-intro__blur"
            text="I'm from Varanasi and I build digital products with a bias toward clean interfaces, fast interactions, and things that feel deliberate instead of assembled by committee."
            animateBy="words"
            direction="top"
            effect="focus"
            trigger="view"
            threshold={0.2}
            rootMargin="-80px"
            stepDuration={0.42}
            blur={9}
            distance={18}
            delay={32}
            focusOnHover={false}
            fromColor="#ff5a1c"
          />
        </div>

        <Reveal className="profile-meta" delay={0.12}>
          {profileRows.map((row) => (
            <div className="profile-meta-row" key={row.label}>
              <span>{row.label}</span>
              {row.href ? (
                <a href={row.href} target={row.external ? '_blank' : undefined} rel={row.external ? 'noopener noreferrer' : undefined}>
                  {row.value} {row.icon ? <i aria-hidden="true">{row.icon}</i> : null}
                </a>
              ) : (
                <b>{row.value}</b>
              )}
            </div>
          ))}
        </Reveal>
      </div>

      <div className="skills-rail" aria-label="Technologies">
        <div className="skills-track">
          {railItems.map((skill, index) => (
            <Fragment key={`${skill}-${index}`}>
              <span>{skill}</span>
              <i aria-hidden="true">·</i>
            </Fragment>
          ))}
        </div>
      </div>

      <Reveal className="skills-explorer-wrap" delay={0.05}>
        <SkillsExplorer />
      </Reveal>
    </section>
  );
}
