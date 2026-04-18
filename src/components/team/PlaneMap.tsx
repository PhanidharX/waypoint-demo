import type { TeamMember } from '@/lib/types';

interface PlaneMapProps {
  members: TeamMember[];
}

export default function PlaneMap({ members }: PlaneMapProps) {
  const planes = new Map<string, TeamMember[]>();

  for (const m of members) {
    if (!planes.has(m.primaryPlane)) planes.set(m.primaryPlane, []);
    planes.get(m.primaryPlane)!.push(m);
  }

  return (
    <div>
      <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>Plane Map</h2>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${planes.size}, 1fr)`, gap: 16 }}>
        {[...planes.entries()].map(([plane, pMembers]) => (
          <div
            key={plane}
            style={{
              padding: 16,
              borderRadius: 8,
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
            }}
          >
            <div
              style={{
                fontSize: 11,
                fontFamily: 'var(--font-mono)',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                color: 'var(--color-accent-text)',
                marginBottom: 10,
              }}
            >
              {plane}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {pMembers.map((m) => (
                <div key={m.id} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontSize: 13, color: 'var(--color-text)' }}>{m.name}</span>
                  {m.onSupportToday && (
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--color-accent)' }} className="pulse" />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
