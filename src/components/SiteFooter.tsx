import { Glass } from 'glisse';
import { ArrowUpIcon } from '@solar-icons/react/linear/arrow-up';
import { ArrowRightUpIcon } from '@solar-icons/react/linear/arrow-right-up';
import { LetterOpenedIcon } from '@solar-icons/react/linear/letter-opened';
import { GithubIcon, InstagramIcon } from './icons';
import { site } from '../data/site';

/** Stickers scattered behind the footer content: emoji, position (%), size (rem), float delay (s). */
const stickers: Array<[string, number, number, number, number]> = [
  ['🚀', 6, 14, 2.4, 0],
  ['✨', 22, 62, 1.6, 1.2],
  ['💻', 40, 10, 2.2, 0.6],
  ['🔥', 58, 70, 2.6, 1.8],
  ['☕', 74, 18, 2, 0.3],
  ['🎧', 88, 58, 2.2, 2.1],
  ['💡', 12, 88, 1.8, 1.5],
  ['🌙', 50, 42, 1.6, 0.9],
  ['🤖', 92, 88, 2, 2.6],
  ['📱', 30, 36, 1.7, 2.4]
];

/** Brand footer: an orange panel with pill-labelled contact cards, a giant wordmark and emoji stickers. */
export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-panel">
        <div className="footer-emoji" aria-hidden="true">
          {stickers.map(([emoji, left, top, size, delay]) => (
            <span
              key={emoji + left}
              style={{ left: `${left}%`, top: `${top}%`, fontSize: `${size}rem`, animationDelay: `${delay}s` }}
            >
              {emoji}
            </span>
          ))}
        </div>

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
