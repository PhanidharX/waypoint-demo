interface TrackingBadgeProps {
  level: 'full' | 'light' | 'acknowledged';
}

const config: Record<string, { label: string; color: string; bg: string }> = {
  full: { label: 'Full', color: 'var(--color-accent-text)', bg: 'var(--color-accent-dim)' },
  light: { label: 'Light', color: 'var(--color-info)', bg: 'var(--color-info-dim)' },
  acknowledged: { label: 'Acknowledged', color: 'var(--color-warning)', bg: 'var(--color-warning-dim)' },
};

export default function TrackingBadge({ level }: TrackingBadgeProps) {
  const c = config[level] ?? config.light;
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
        color: c.color,
        background: c.bg,
      }}
    >
      {c.label}
    </span>
  );
}

export type { TrackingBadgeProps };
