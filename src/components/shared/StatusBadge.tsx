interface StatusBadgeProps {
  status: string;
}

const config: Record<string, { label: string; color: string; bg: string }> = {
  'on-track': { label: 'On Track', color: 'var(--color-accent-text)', bg: 'var(--color-accent-dim)' },
  'in-progress': { label: 'In Progress', color: 'var(--color-info)', bg: 'var(--color-info-dim)' },
  'slipping': { label: 'Slipping', color: 'var(--color-critical)', bg: 'var(--color-critical-dim)' },
  'complete': { label: 'Complete', color: 'var(--color-muted)', bg: 'var(--color-surface-high)' },
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const c = config[status] ?? config['in-progress'];
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
