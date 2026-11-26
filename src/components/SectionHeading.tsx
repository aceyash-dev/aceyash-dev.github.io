type SectionHeadingProps = {
  id: string;
  index: string;
  title: string;
  accent?: string;
  meta?: string;
  label?: string;
};

/**
 * Editorial section header: small tracked index, serif headline
 * with an optional italic accent word, and a quiet meta note.
 */
export function SectionHeading({ id, index, title, accent, meta, label = 'SECTION' }: SectionHeadingProps) {
  return (
    <div className="section-head">
      <div>
        <span className="section-head__index">
          <b>{index}</b>
          {'  —  '}
          {label}
        </span>
        <h2 id={id}>
          {title}
          {accent ? <> <em>{accent}</em></> : null}
        </h2>
      </div>
      {meta ? <span className="section-head__meta">{meta}</span> : null}
    </div>
  );
}
