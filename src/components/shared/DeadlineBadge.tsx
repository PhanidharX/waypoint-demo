interface DeadlineBadgeProps {
  deadline: string;
}

function getDaysRemaining(deadline: string): number {
  const now = new Date();
  const target = new Date(deadline);
  const diffMs = target.getTime() - now.getTime();
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
}

function getDeadlineStyle(days: number): { color: string; bg: string } {
  if (days < 0) {
    return { color: 'var(--color-critical)', bg: 'var(--color-critical-dim)' };
  }
  if (days < 7) {
    return { color: 'var(--color-critical)', bg: 'var(--color-critical-dim)' };
  }
  if (days < 30) {
    return { color: 'var(--color-warning)', bg: 'var(--color-warning-dim)' };
  }
  return { color: 'var(--color-accent-text)', bg: 'var(--color-accent-dim)' };
}

export default function DeadlineBadge({ deadline }: DeadlineBadgeProps) {
  const days = getDaysRemaining(deadline);
  const s = getDeadlineStyle(days);

  let label: string;
  if (days < 0) {
    label = `${Math.abs(days)}d overdue`;
  } else if (days === 0) {
    label = 'Due today';
  } else {
    label = `${days}d remaining`;
  }

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
        color: s.color,
        background: s.bg,
      }}
    >
      {label}
    </span>
  );
}

export type { DeadlineBadgeProps };
