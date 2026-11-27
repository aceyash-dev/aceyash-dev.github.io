import { useId } from 'react';

type DotPatternProps = {
  width?: number;
  height?: number;
  cr?: number;
  className?: string;
};

export function DotPattern({
  width = 20,
  height = 20,
  cr = 1.1,
  className = ''
}: DotPatternProps) {
  const patternId = useId();
  return (
    <svg aria-hidden="true" className={`magic-dot-pattern ${className}`.trim()}>
      <defs>
        <pattern
          id={patternId}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          patternContentUnits="userSpaceOnUse"
        >
          <circle cx={width / 2} cy={height / 2} r={cr} fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${patternId})`} />
    </svg>
  );
}
