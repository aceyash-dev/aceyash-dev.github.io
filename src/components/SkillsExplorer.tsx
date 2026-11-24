import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent
} from 'react';
import { skillGroups } from '../data/site';

export function SkillsExplorer() {
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const tabsRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);

  activeRef.current = active;

  const movePill = useCallback((animate: boolean, index = activeRef.current) => {
    const tab = buttonRefs.current[index];
    const pill = pillRef.current;
    if (!tab || !pill) return;

    if (!animate) {
      const previous = pill.style.transition;
      pill.style.transition = 'none';
      pill.style.transform = `translateX(${tab.offsetLeft}px)`;
      pill.style.width = `${tab.offsetWidth}px`;
      void pill.offsetWidth;
      pill.style.transition = previous;
      return;
    }

    pill.style.transform = `translateX(${tab.offsetLeft}px)`;
    pill.style.width = `${tab.offsetWidth}px`;
  }, []);

  useLayoutEffect(() => {
    const measure = () => movePill(false, activeRef.current);
    measure();

    window.addEventListener('resize', measure);

    let observer: ResizeObserver | undefined;
    if ('ResizeObserver' in window && tabsRef.current) {
      observer = new ResizeObserver(measure);
      observer.observe(tabsRef.current);
    }

    let alive = true;
    document.fonts?.ready
      .then(() => {
        if (alive) measure();
      })
      .catch(() => undefined);

    return () => {
      alive = false;
      window.removeEventListener('resize', measure);
      observer?.disconnect();
    };
  }, [movePill]);

  useEffect(() => {
    movePill(true, active);
  }, [active, movePill]);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    let next = active;
    if (event.key === 'ArrowRight') next = (active + 1) % skillGroups.length;
    else if (event.key === 'ArrowLeft') next = (active - 1 + skillGroups.length) % skillGroups.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = skillGroups.length - 1;
    else return;

    event.preventDefault();
    setActive(next);
    buttonRefs.current[next]?.focus();
  };

  return (
    <div className="skills-explorer">
      <div className="skills-explorer__head">
        <div>
          <p className="eyebrow">Current stack</p>
          <h3>Close to the platform.</h3>
        </div>
        <div
          className="t-tabs"
          role="tablist"
          aria-label="Skill categories"
          ref={tabsRef}
          onKeyDown={onKeyDown}
        >
          <span className="t-tabs-pill" ref={pillRef} aria-hidden="true" />
          {skillGroups.map((group, index) => (
            <button
              key={group.id}
              ref={(node) => {
                buttonRefs.current[index] = node;
              }}
              className="t-tab"
              type="button"
              role="tab"
              id={`skill-tab-${group.id}`}
              aria-controls={`skill-panel-${group.id}`}
              aria-selected={active === index}
              tabIndex={active === index ? 0 : -1}
              onClick={() => setActive(index)}
            >
              {group.label}
            </button>
          ))}
        </div>
      </div>

      <div className="skills-explorer__pages t-page-slide" data-page={active + 1}>
        {skillGroups.map((group, index) => (
          <div
            key={group.id}
            className="t-page skills-page"
            data-page-id={index + 1}
            id={`skill-panel-${group.id}`}
            role="tabpanel"
            aria-labelledby={`skill-tab-${group.id}`}
            aria-hidden={active !== index}
            tabIndex={active === index ? 0 : -1}
            style={
              {
                '--t-page-from-x':
                  index < active
                    ? 'calc(var(--page-slide-distance) * -1)'
                    : 'var(--page-slide-distance)'
              } as CSSProperties
            }
          >
            <div className="skills-page__lead">
              <span>{String(index + 1).padStart(2, '0')}</span>
              <p>{group.note}</p>
            </div>
            <ul className="skill-cloud">
              {group.items.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
