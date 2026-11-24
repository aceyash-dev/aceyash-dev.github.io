import { useEffect, useRef, useState } from 'react';
import { footerColumns } from '../data/site';

export function SiteFooter() {
  const footerRef = useRef<HTMLElement>(null);
  const [time, setTime] = useState('--:--:--');

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return undefined;

    let timer: number | undefined;
    const tick = () => {
      setTime(new Date().toLocaleTimeString('en-GB', { hour12: false }));
    };

    tick();

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && timer === undefined) {
          tick();
          timer = window.setInterval(tick, 1000);
        } else if (!entry.isIntersecting && timer !== undefined) {
          window.clearInterval(timer);
          timer = undefined;
        }
      },
      { threshold: 0 }
    );

    observer.observe(footer);
    return () => {
      observer.disconnect();
      if (timer !== undefined) window.clearInterval(timer);
    };
  }, []);

  return (
    <footer className="footer" id="footer" ref={footerRef}>
      <div className="footer-inner">
        <div className="marquee" aria-hidden="true">
          <div className="marquee-track">
            <span>Build <em>·</em> Design <em>·</em> Code <em>·</em> </span>
            <span>Build <em>·</em> Design <em>·</em> Code <em>·</em> </span>
          </div>
        </div>

        <div className="foot-mid">
          <h2 className="foot-head">
            Orbit <em>complete.</em>
          </h2>
          <span className="foot-shimmer t-shimmer" data-text="Always building">
            Always building
          </span>
        </div>

        <div className="foot-bottom">
          <div className="cols">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <h3>{column.title}</h3>
                <ul>
                  {column.links.map((link) => (
                    <li key={`${column.title}-${link.href}-${link.label}`}>
                      <a
                        className={link.className}
                        href={link.href}
                        target={link.external ? '_blank' : undefined}
                        rel={link.external ? (link.className === 'u-url' ? 'me noopener noreferrer' : 'noopener noreferrer') : undefined}
                      >
                        {link.label} <i aria-hidden="true">↗</i>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="foot-meta">
            <div>
              Local time — <b id="clock">{time}</b>
            </div>
            <div>
              Status — <span className="live" aria-hidden="true" />
              <b>Available</b>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
