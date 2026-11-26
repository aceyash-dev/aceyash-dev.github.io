import { useId, useState } from 'react';
import { AltArrowDownIcon } from '@solar-icons/react/linear/alt-arrow-down';
import type { FaqItem } from '../data/site';

/**
 * Editorial accordion for the public-profile FAQ. Question-oriented
 * headings, concise answers, and contextual links — the same content
 * is mirrored in llms.txt and (visibly identical) JSON-LD.
 */
export function Faq({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<string | null>(items[0]?.id ?? null);
  const baseId = useId();

  return (
    <div className="faq-list">
      {items.map((item) => {
        const isOpen = open === item.id;
        const buttonId = `${baseId}-${item.id}-q`;
        const panelId = `${baseId}-${item.id}-a`;

        return (
          <div className="faq-item" key={item.id} data-open={isOpen}>
            <button
              id={buttonId}
              className="faq-q"
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpen(isOpen ? null : item.id)}
            >
              <span>{item.question}</span>
              <AltArrowDownIcon size={20} aria-hidden="true" />
            </button>
            <div id={panelId} className="faq-a" role="region" aria-labelledby={buttonId}>
              <div className="faq-a__inner">
                <p>{item.answer}</p>
                {item.links?.length ? (
                  <span className="faq-links">
                    {item.links.map((link) => (
                      <a
                        key={link.href}
                        className="project__link"
                        href={link.href}
                        {...(link.external !== false && link.href.startsWith('http')
                          ? { target: '_blank', rel: 'noopener noreferrer' }
                          : {})}
                      >
                        {link.label}
                      </a>
                    ))}
                  </span>
                ) : null}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
