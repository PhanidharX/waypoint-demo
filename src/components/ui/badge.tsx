import type { ReactNode } from 'react';

type BadgeVariant =
  | 'default'
  | 'secondary'
  | 'outline'
  | 'success'
  | 'warning'
  | 'critical'
  | 'info'
  | 'purple';

interface BadgeProps {
  variant?: BadgeVariant;
  children: ReactNode;
  style?: React.CSSProperties;
}

const variantStyles: Record<BadgeVariant, { color: string; bg: string; border?: string }> = {
  default: {
    color: 'var(--color-text)',
    bg: 'var(--color-surface-high)',
  },
  secondary: {
    color: 'var(--color-muted)',
    bg: 'var(--color-surface)',
  },
  outline: {
    color: 'var(--color-muted)',
    bg: 'transparent',
    border: '1px solid var(--color-border)',
  },
  success: {
    color: 'var(--color-accent-text)',
    bg: 'var(--color-accent-dim)',
  },
  warning: {
    color: 'var(--color-warning)',
    bg: 'var(--color-warning-dim)',
  },
  critical: {
    color: 'var(--color-critical)',
    bg: 'var(--color-critical-dim)',
  },
  info: {
    color: 'var(--color-info)',
    bg: 'var(--color-info-dim)',
  },
  purple: {
    color: 'var(--color-purple)',
    bg: 'var(--color-purple-dim)',
  },
};

export default function Badge({ variant = 'default', children, style }: BadgeProps) {
  const v = variantStyles[variant];
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '2px 8px',
        borderRadius: 9999,
        fontSize: 11,
        fontFamily: 'var(--font-mono)',
        fontWeight: 500,
        letterSpacing: '0.04em',
        color: v.color,
        background: v.bg,
        border: v.border ?? 'none',
        whiteSpace: 'nowrap',
        ...style,
      }}
    >
      {children}
    </span>
  );
}

export { Badge };
export type { BadgeVariant, BadgeProps };
