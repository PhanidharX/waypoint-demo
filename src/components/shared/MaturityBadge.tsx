interface MaturityBadgeProps {
  maturity: string;
}

const config: Record<string, { label: string; color: string; bg: string }> = {
  golden_path: { label: 'Golden Path', color: 'var(--color-accent-text)', bg: 'var(--color-accent-dim)' },
  manual: { label: 'Manual', color: 'var(--color-warning)', bg: 'var(--color-warning-dim)' },
  in_progress: { label: 'In Progress', color: 'var(--color-info)', bg: 'var(--color-info-dim)' },
  mixed: { label: 'Mixed', color: 'var(--color-purple)', bg: 'var(--color-purple-dim)' },
};

export default function MaturityBadge({ maturity }: MaturityBadgeProps) {
  const c = config[maturity] ?? config.manual;
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
