import { faqs, type FaqItem } from '../data/site';

function FaqEntry({ item, index }: { item: FaqItem; index: number }) {
  return (
    <m3e-expansion-panel className="faq-item" open={index === 0 ? true : undefined}>
      <span slot="header">{item.question}</span>
      <div className="faq-answer">
        <p>{item.answer}</p>
        {item.links?.length ? (
          <div className="faq-links">
            {item.links.map((link) => (
              <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">
                {link.label} <i aria-hidden="true">↗</i>
              </a>
            ))}
          </div>
        ) : null}
      </div>
    </m3e-expansion-panel>
  );
}

export function Faq() {
  return (
    <div className="faq-list">
      {faqs.map((item, index) => (
        <FaqEntry key={item.id} item={item} index={index} />
      ))}
    </div>
  );
}
