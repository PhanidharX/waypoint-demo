interface ScopeCreepBadgeProps {
  count: number;
}

export default function ScopeCreepBadge({ count }: ScopeCreepBadgeProps) {
  if (count === 0) return null;

  const color = count >= 3 ? 'var(--color-critical)' : 'var(--color-warning)';
  const bg = count >= 3 ? 'var(--color-critical-dim)' : 'var(--color-warning-dim)';

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 3,
        padding: '2px 7px',
        borderRadius: 9999,
        fontSize: 11,
        fontFamily: 'var(--font-mono)',
        fontWeight: 500,
        color,
        background: bg,
      }}
      title={`${count} scope creep item${count !== 1 ? 's' : ''}`}
    >
      +{count}
    </span>
  );
}
