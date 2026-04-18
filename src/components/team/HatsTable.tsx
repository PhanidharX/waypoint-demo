import type { TeamMember } from '@/lib/types';

interface HatsTableProps {
  members: TeamMember[];
}

export default function HatsTable({ members }: HatsTableProps) {
  const withHats = members.filter((m) => m.hat);
  if (withHats.length === 0) return null;

  return (
    <div>
      <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>Hats This Quarter</h2>
      <div style={{ borderRadius: 8, border: '1px solid var(--color-border)', overflow: 'hidden' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            padding: '10px 16px',
            background: 'var(--color-surface-high)',
            fontSize: 11,
            fontFamily: 'var(--font-mono)',
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            color: 'var(--color-subtle)',
          }}
        >
          <span>Person</span>
          <span>Hat</span>
          <span>Plane</span>
        </div>
        {withHats.map((m, i) => (
          <div
            key={m.id}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              padding: '12px 16px',
              background: i % 2 === 0 ? 'var(--color-surface)' : 'var(--color-surface-zebra)',
              borderTop: '1px solid var(--color-border)',
              fontSize: 13,
            }}
          >
            <span style={{ color: 'var(--color-text)', fontWeight: 500 }}>{m.name}</span>
            <span style={{ color: 'var(--color-muted)' }}>{m.hat}</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--color-subtle)' }}>{m.primaryPlane}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
