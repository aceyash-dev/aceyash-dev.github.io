import { ArrowUpIcon } from '@solar-icons/react/linear/arrow-up';
import { ArrowRightUpIcon } from '@solar-icons/react/linear/arrow-right-up';
import { footerColumns, site } from '../data/site';

/** Minimal dark footer: wordmark, three compact columns, legal-ish line. */
export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-brand">
          <a className="wordmark" href="#top" aria-label="Ace Yash — back to top">
            Ace&nbsp;Yash<sup>©</sup>
          </a>
          <p>
            Developer and CEO of The Ace Base — building web products, native Android software,
            and deliberate interfaces from Varanasi, India.
          </p>
        </div>

        <div className="footer-cols">
          {footerColumns.map((column) => (
            <nav key={column.title} aria-label={`Footer — ${column.title}`}>
              <h2>{column.title}</h2>
              <ul>
                {column.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    >
                      {link.label}
                      {link.external ? <ArrowRightUpIcon size={12} aria-hidden="true" /> : null}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      <div className="footer-bottom">
        <span suppressHydrationWarning>
          © {year} Ace Yash · <a href={site.aceBase} target="_blank" rel="noopener noreferrer">The Ace Base</a>
        </span>
        <span>React · TypeScript · Vite — hosted on GitHub Pages</span>
        <a className="to-top" href="#top">
          Back to top
          <ArrowUpIcon size={14} aria-hidden="true" />
        </a>
      </div>
    </footer>
  );
}
