import Magnet from './vendor/reactbits/Magnet';
import { ArrowRightUpIcon } from '@solar-icons/react/linear/arrow-right-up';
import { LetterOpenedIcon } from '@solar-icons/react/linear/letter-opened';
import { Buildings3Icon } from '@solar-icons/react/linear/buildings-3';
import { SectionHeading } from './SectionHeading';
import { Reveal } from './Reveal';
import { GithubIcon, InstagramIcon } from './icons';
import { site } from '../data/site';

/** Contact — one clear ask, one large action, honest alternates. */
export function ContactSection() {
  return (
    <section className="section contact-section" id="contact" aria-labelledby="contact-title">
      <div className="container">
        <SectionHeading
          id="contact-title"
          index="06"
          label="Contact"
          title="Say"
          accent="hello"
          meta="Projects and collaborations"
        />

        <Reveal>
          <p className="contact-head">
            Have a project?
            <br />
            <em>Let’s talk.</em>
          </p>
        </Reveal>

        <div className="contact-foot">
          <div>
            <p className="contact-note">
              Email is the best way to reach me about projects and collaborations.
            </p>
            <div className="contact-alt">
              <a href={site.github} target="_blank" rel="noopener noreferrer">
                <GithubIcon size={16} />
                @aceyash-dev
              </a>
              <a href={site.instagram} target="_blank" rel="noopener noreferrer">
                <InstagramIcon size={16} />
                @yash.hits
              </a>
              <a href={site.aceBase} target="_blank" rel="noopener noreferrer">
                <Buildings3Icon size={16} aria-hidden="true" />
                The Ace Base
              </a>
            </div>
          </div>

          <Magnet
            padding={90}
            magnetStrength={2.2}
            maxOffset={14}
            exclusive
            axis="both"
            wrapperClassName="magnet-wrap"
            innerClassName="magnet-inner"
          >
            <a className="btn btn--solid" style={{ fontSize: '1.05rem', padding: '1rem 1.6rem' }} href={`mailto:${site.email}`}>
              <LetterOpenedIcon size={20} aria-hidden="true" />
              {site.email}
              <ArrowRightUpIcon size={17} aria-hidden="true" />
            </a>
          </Magnet>


        </div>
      </div>
    </section>
  );
}
