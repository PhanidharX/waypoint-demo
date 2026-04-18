import { readYaml } from '@/lib/yaml';

interface Ritual {
  id: string;
  name: string;
  cadence: string;
  day: string | null;
  time: string;
  duration: string;
  format: string;
  owner: string;
  channel: string;
}

export default function RitualsPage() {
  const { rituals } = readYaml<{ rituals: Ritual[] }>('rituals.yaml');

  return (
    <div style={{ paddingTop: 24, maxWidth: 900, margin: '0 auto', padding: '24px 24px 0' }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.03em', marginBottom: 8 }}>
        Rituals
      </h1>
      <p style={{ fontSize: 15, color: 'var(--color-muted)', marginBottom: 32 }}>
        Team ceremonies and their current cadence.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {rituals.map((r) => (
          <div
            key={r.id}
            style={{
              padding: 20,
              borderRadius: 8,
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              display: 'grid',
              gridTemplateColumns: '1fr auto',
              gap: 16,
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--color-text)' }}>{r.name}</span>
                <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', padding: '2px 8px', borderRadius: 9999, background: 'var(--color-surface-high)', color: 'var(--color-muted)' }}>
                  {r.cadence}
                </span>
              </div>
              <div style={{ fontSize: 13, color: 'var(--color-muted)', marginBottom: 4 }}>{r.format}</div>
              <div style={{ fontSize: 12, color: 'var(--color-subtle)' }}>
                Owner: {r.owner} · {r.channel}
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 14, fontFamily: 'var(--font-mono)', fontWeight: 500, color: 'var(--color-text)' }}>
                {r.time}
              </div>
              <div style={{ fontSize: 12, color: 'var(--color-subtle)' }}>
                {r.day ?? 'Daily'} · {r.duration}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
