import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { navLinks } from '../data/site';

type MenuState = 'closed' | 'open' | 'closing';

export function SiteHeader() {
  const [shrunk, setShrunk] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuState, setMenuState] = useState<MenuState>('closed');
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const { scrollYProgress } = useScroll();
  const progressX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001
  });

  const menuOpen = menuState === 'open';

  useEffect(() => {
    let previousY = window.scrollY;
    let accumulated = 0;

    const onScroll = () => {
      const currentY = window.scrollY || window.pageYOffset;
      const delta = currentY - previousY;
      previousY = currentY;

      setShrunk(currentY > 60);

      if (currentY < 160) {
        accumulated = 0;
        setHidden(false);
      } else if (Math.abs(delta) >= 1) {
        accumulated += delta;
        if (Math.abs(accumulated) > 14) {
          setHidden(accumulated > 0);
          accumulated = 0;
        }
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  useEffect(() => {
    if (menuState !== 'closing') return undefined;
    const timer = window.setTimeout(() => setMenuState('closed'), 150);
    return () => window.clearTimeout(timer);
  }, [menuState]);

  useEffect(() => {
    if (!menuOpen) return undefined;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setMenuState('closing');
      menuButtonRef.current?.focus();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  const closeMenu = () => {
    if (menuState === 'open') setMenuState('closing');
  };

  return (
    <nav
      className={`nav${shrunk ? ' is-shrunk' : ''}${hidden && !menuOpen ? ' is-hidden' : ''}`}
      aria-label="Primary navigation"
    >
      <a className="nav-logo" href="#top" onClick={closeMenu}>
        YASH<em>©</em>
      </a>

      <div className="nav-links">
        {navLinks.map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}
      </div>

      <button
        ref={menuButtonRef}
        className="nav-toggle"
        type="button"
        aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={menuOpen}
        aria-controls="mobile-menu"
        onClick={() => setMenuState((state) => (state === 'open' ? 'closing' : 'open'))}
      >
        <span className="t-icon-swap" data-state={menuOpen ? 'b' : 'a'} aria-hidden="true">
          <svg className="t-icon" data-icon="a" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M3 6H17M3 10H17M3 14H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <svg className="t-icon" data-icon="b" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M5 5L15 15M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </span>
        <span className="nav-toggle__label">{menuOpen ? 'Close' : 'Menu'}</span>
      </button>

      <div
        id="mobile-menu"
        className={`nav-menu t-dropdown${menuOpen ? ' is-open' : ''}${menuState === 'closing' ? ' is-closing' : ''}`}
        data-origin="top-right"
        aria-hidden={!menuOpen}
      >
        <nav className="nav-menu__inner" aria-label="Mobile navigation">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              tabIndex={menuOpen ? 0 : -1}
              onClick={closeMenu}
            >
              <span>{link.label}</span>
              <i aria-hidden="true">↗</i>
            </a>
          ))}
        </nav>
      </div>

      <div className="nav-progress" aria-hidden="true">
        <motion.i style={{ scaleX: progressX }} />
      </div>
    </nav>
  );
}
