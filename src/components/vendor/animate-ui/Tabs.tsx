import { useId, useState, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'motion/react';

export type AnimatedTabItem = {
  value: string;
  label: string;
  content: ReactNode;
};

type AnimatedTabsProps = {
  items: AnimatedTabItem[];
  defaultValue?: string;
  className?: string;
};

/**
 * Animate UI Tabs: spring-gliding active pill highlight + smooth panel transitions.
 */
export function AnimatedTabs({ items, defaultValue, className = '' }: AnimatedTabsProps) {
  const [active, setActive] = useState(defaultValue ?? items[0]?.value ?? '');
  const layoutGroupId = useId();
  const current = items.find((item) => item.value === active) ?? items[0];

  return (
    <div className={`animate-tabs ${className}`.trim()}>
      <div className="animate-tabs__list" role="tablist">
        {items.map((item) => {
          const isActive = item.value === current?.value;
          return (
            <button
              key={item.value}
              type="button"
              role="tab"
              aria-selected={isActive}
              data-state={isActive ? 'active' : 'inactive'}
              onClick={() => setActive(item.value)}
              className="animate-tabs__trigger"
            >
              {isActive ? (
                <motion.span
                  layoutId={`tab-pill-${layoutGroupId}`}
                  className="animate-tabs__pill"
                  transition={{ type: 'spring', stiffness: 320, damping: 30 }}
                />
              ) : null}
              <span className="animate-tabs__label">{item.label}</span>
            </button>
          );
        })}
      </div>

      <div className="animate-tabs__panel" role="tabpanel">
        <AnimatePresence mode="wait" initial={false}>
          {current ? (
            <motion.div
              key={current.value}
              initial={{ opacity: 0, y: 8, filter: 'blur(3px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -6, filter: 'blur(3px)' }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            >
              {current.content}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}
