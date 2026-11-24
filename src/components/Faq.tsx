import { useState } from 'react';
import { faqs, type FaqItem } from '../data/site';

type AccordionItemProps = {
  item: FaqItem;
  index: number;
};

function AccordionItem({ item, index }: AccordionItemProps) {
  const [open, setOpen] = useState(index === 0);
  const buttonId = `${item.id}-trigger`;
  const panelId = `${item.id}-panel`;

  return (
    <div className="t-acc faq-item" data-open={open}>
      <h3>
        <button
          id={buttonId}
          className="faq-trigger"
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((value) => !value)}
        >
          <span>{item.question}</span>
          <span className="t-acc-chevron" aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 6L8 11L13 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </button>
      </h3>

      <div
        id={panelId}
        className="t-acc-panel"
        role="region"
        aria-labelledby={buttonId}
        aria-hidden={!open}
      >
        <div className="t-acc-panel-inner">
          <div className="faq-answer">
            <p>{item.answer}</p>
            {item.links?.length ? (
              <div className="faq-links">
                {item.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    tabIndex={open ? 0 : -1}
                  >
                    {link.label} <i aria-hidden="true">↗</i>
                  </a>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Faq() {
  return (
    <div className="faq-list">
      {faqs.map((item, index) => (
        <AccordionItem key={item.id} item={item} index={index} />
      ))}
    </div>
  );
}
