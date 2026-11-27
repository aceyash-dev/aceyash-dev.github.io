export type TerminalLine = {
  type: 'cmd' | 'out' | 'success';
  text: string;
};

type TerminalProps = {
  title?: string;
  lines: TerminalLine[];
  className?: string;
};

export function Terminal({ title = 'terminal', lines, className = '' }: TerminalProps) {
  return (
    <div className={`magic-terminal ${className}`.trim()} aria-label={`${title} preview`}>
      <div className="magic-terminal__bar">
        <div className="magic-terminal__dots" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <span className="magic-terminal__title">{title}</span>
      </div>
      <div className="magic-terminal__body">
        {lines.map((line, idx) => (
          <div key={idx} className={`magic-terminal__line magic-terminal__line--${line.type}`}>
            {line.type === 'cmd' ? <span className="magic-terminal__prompt">$</span> : null}
            {line.type === 'success' ? <span className="magic-terminal__check">✓</span> : null}
            <span>{line.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
