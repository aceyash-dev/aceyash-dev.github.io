import { useRef } from 'react';
import { useInView, useReducedMotion } from 'motion/react';

type SectionHeadingProps = {
  id: string;
  number: string;
  title: string;
  accent: string;
  meta: string;
};

export function SectionHeading({ id, number, title, accent, meta }: SectionHeadingProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reducedMotion = Boolean(useReducedMotion());
  const shown = reducedMotion || inView;

  return (
    <div ref={ref} className={`section-head t-stagger${shown ? ' is-shown' : ''}`}>
      <span className="section-num t-stagger-line t-stagger-line--1">{number}</span>
      <h2 className="section-title t-stagger-line t-stagger-line--2" id={id}>
        {title} <em>{accent}</em>
      </h2>
      <span className="section-meta t-stagger-line t-stagger-line--3">{meta}</span>
    </div>
  );
}
