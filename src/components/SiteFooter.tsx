import { Glass } from 'glisse';
import { ArrowUpIcon } from '@solar-icons/react/linear/arrow-up';
import { ArrowRightUpIcon } from '@solar-icons/react/linear/arrow-right-up';
import { LetterOpenedIcon } from '@solar-icons/react/linear/letter-opened';
import { GithubIcon, InstagramIcon } from './icons';
import { site } from '../data/site';

/** Brand footer: an orange panel with pill-labelled contact cards, a giant wordmark and emoji stickers. */
export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-panel">
        <div className="footer-grid">
          <Glass className="footer-card">
            <span className="footer-pill">open to work</span>
            <p className="footer-value">Web products, interfaces &amp; Android</p>
          </Glass>

          <Glass className="footer-card">
            <span className="footer-pill">based in</span>
            <p className="footer-value">Varanasi, India</p>
            <a className="footer-link" href="https://maps.google.com/?q=Varanasi" target="_blank" rel="noopener noreferrer">
              Google Maps <ArrowRightUpIcon size={14} aria-hidden="true" />
            </a>
          </Glass>

          <Glass className="footer-card">
            <span className="footer-pill">contact</span>
            <a className="footer-value footer-value--link" href={`mailto:${site.email}`}>
              <LetterOpenedIcon size={22} aria-hidden="true" />
              {site.email}
            </a>
            <ul className="footer-socials" aria-label="Social profiles">
              <li>
                <a href={site.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <GithubIcon size={18} />
                </a>
              </li>
              <li>
                <a href={site.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <InstagramIcon size={18} />
                </a>
              </li>
              <li>
                <a href={site.aceBase} target="_blank" rel="noopener noreferrer" aria-label="The Ace Base">
                  <ArrowRightUpIcon size={18} />
                </a>
              </li>
            </ul>
          </Glass>
        </div>

        <p className="footer-wordmark" aria-hidden="true">Ace Yash</p>

        <div className="footer-bottom">
          <span suppressHydrationWarning>
            © {year} Ace Yash · <a href={site.aceBase} target="_blank" rel="noopener noreferrer">The Ace Base</a>
          </span>
          <a className="to-top" href="#top">
            Back to top
            <ArrowUpIcon size={14} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
