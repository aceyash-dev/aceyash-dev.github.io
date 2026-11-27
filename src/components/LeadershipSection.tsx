import { BorderBeam } from './vendor/magicui/BorderBeam';
import { ArrowRightUpIcon } from '@solar-icons/react/linear/arrow-right-up';
import { Buildings3Icon } from '@solar-icons/react/linear/buildings-3';
import { GlobalIcon } from '@solar-icons/react/linear/global';
import { DocumentTextIcon } from '@solar-icons/react/linear/document-text';
import { TextBoldIcon } from '@solar-icons/react/linear/text-bold';
import { site } from '../data/site';

/**
 * Leadership — The Ace Base. The one dark, full-bleed moment on the page:
 * background imagery is the accretion-disk mark (bg.jpg) under a heavy
 * ink gradient, framed with a subtle MagicUI BorderBeam.
 */
export function LeadershipSection() {
  return (
    <section className="section" id="ace-base" aria-labelledby="ace-base-title" style={{ borderTop: 'none', paddingTop: 0 }}>
      <div className="container">
        <div className="leadership">
          <BorderBeam size={320} duration={14} colorFrom="#f07836" colorTo="#ffb286" />
          <div className="leadership__bg" role="img" aria-label="Abstract orange accretion disk glowing against deep black space" />
          <div className="leadership__inner">
            <p className="eyebrow"><b style={{ color: '#ffb286' }}>03</b> — Leadership</p>

            <h2 id="ace-base-title">
              The studio behind <em>the work.</em>
            </h2>

            <p>
              The Ace Base is a software studio founded by Ace Yash. It builds web applications,
              typography tools, and developer software. Ace Yash leads product and engineering.
            </p>

            <div className="leadership__links">
              <a className="btn btn--dark" href={site.aceBase} target="_blank" rel="noopener noreferrer">
                <Buildings3Icon size={17} aria-hidden="true" />
                ace-base.cc
                <ArrowRightUpIcon size={15} aria-hidden="true" />
              </a>
              <a className="btn btn--on-dark" href={site.docs} target="_blank" rel="noopener noreferrer">
                <DocumentTextIcon size={17} aria-hidden="true" />
                Documentation
                <ArrowRightUpIcon size={15} aria-hidden="true" />
              </a>
              <a className="btn btn--on-dark" href={site.typace} target="_blank" rel="noopener noreferrer">
                <TextBoldIcon size={17} aria-hidden="true" />
                Typace
                <ArrowRightUpIcon size={15} aria-hidden="true" />
              </a>
            </div>

            <div className="leadership__role">
              <GlobalIcon size={17} aria-hidden="true" />
              <span>
                <b>Ace Yash — Founder &amp; CEO.</b> Software &amp; digital infrastructure, from
                Varanasi, India.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
