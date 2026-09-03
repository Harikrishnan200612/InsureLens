// InsureLens Brand Logo Component
// Clean, text-based modern wordmark using typography and spacing.
// Strictly NO decorative icons or emojis.

import Link from 'next/link';

export default function Logo({
  variant = 'dark',
  size = 'md',
  href = '/dashboard',
}: {
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
}) {
  const isLight = variant === 'light';

  const titleSize = size === 'sm' ? '18px' : size === 'lg' ? '26px' : '22px';
  const subtitleSize = size === 'sm' ? '9px' : size === 'lg' ? '12px' : '10px';

  return (
    <Link
      href={href}
      style={{
        textDecoration: 'none',
        display: 'inline-flex',
        flexDirection: 'column',
        gap: '2px',
        lineHeight: 1.1,
      }}
    >
      <span
        style={{
          fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
          fontWeight: 900,
          fontSize: titleSize,
          letterSpacing: '1.5px',
          color: isLight ? '#FFFFFF' : '#0F172A',
          textTransform: 'uppercase',
        }}
      >
        INSURELENS
      </span>
      <span
        style={{
          fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
          fontWeight: 600,
          fontSize: subtitleSize,
          letterSpacing: '1.8px',
          color: isLight ? '#94A3B8' : '#64748B',
          textTransform: 'uppercase',
        }}
      >
        Insurance Financial Clarity
      </span>
    </Link>
  );
}
