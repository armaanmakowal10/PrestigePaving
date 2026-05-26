import React from 'react';
import { cn } from '@/lib/utils';

/**
 * SVG dot grid background (shadcn registry / Magic UI style).
 */
export function DotPattern({
  width = 16,
  height = 16,
  x = 0,
  y = 0,
  cx = 1,
  cy = 1,
  cr = 1,
  className,
  ...props
}) {
  const id = React.useId().replace(/:/g, '');
  const pid = `dot-pattern-${id}`;

  return (
    <svg
      aria-hidden
      className={cn('pointer-events-none absolute inset-0 h-full w-full', className)}
      {...props}
    >
      <defs>
        <pattern
          id={pid}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          patternContentUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <circle cx={cx} cy={cy} r={cr} fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${pid})`} />
    </svg>
  );
}
