import { readYaml } from '@/lib/yaml';

interface RetroData {
  current_quarter: string;
  metrics: {
    total_stories: number;
    scope_creep_items: number;
    scope_creep_pct: number;
    velocity_avg: number;
    stories_completed: number;
  };
  highlights: string[];
  improvements: string[];
}

export default function RetroPage() {
  const retro = readYaml<RetroData>('retro.yaml');

  return (
    <div style={{ paddingTop: 24, maxWidth: 800, margin: '0 auto', padding: '24px 24px 0' }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.03em', marginBottom: 4 }}>
        Quarterly Retro
      </h1>
      <p style={{ fontSize: 13, fontFamily: 'var(--font-mono)', color: 'var(--color-subtle)', marginBottom: 32 }}>
        {retro.current_quarter}
      </p>

      {/* Metrics */}
      <div
        style={{
          display: 'flex',
          gap: 24,
          padding: '20px 24px',
          borderRadius: 8,
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          marginBottom: 32,
          flexWrap: 'wrap',
        }}
      >
        {[
          { label: 'Stories', value: retro.metrics.total_stories },
          { label: 'Completed', value: retro.metrics.stories_completed },
          { label: 'Velocity avg', value: retro.metrics.velocity_avg },
          { label: 'Scope creep', value: `${retro.metrics.scope_creep_pct}%`, warn: retro.metrics.scope_creep_pct > 15 },
        ].map((m) => (
          <div key={m.label}>
            <div
              style={{
                fontSize: 24,
                fontWeight: 700,
                color: (m as { warn?: boolean }).warn ? 'var(--color-warning)' : 'var(--color-text)',
              }}
            >
              {m.value}
            </div>
            <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-subtle)', marginTop: 2 }}>
              {m.label}
            </div>
          </div>
        ))}
      </div>

      {/* Highlights */}
      <div style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--color-accent-text)', marginBottom: 12 }}>
          Highlights
        </h2>
        <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
          {retro.highlights.map((h, i) => (
            <li key={i} style={{ fontSize: 14, color: 'var(--color-muted)', lineHeight: 1.5, paddingLeft: 16, borderLeft: '2px solid var(--color-accent)' }}>
              {h}
            </li>
          ))}
        </ul>
      </div>

      {/* Improvements */}
      <div>
        <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--color-warning)', marginBottom: 12 }}>
          Improvements
        </h2>
        <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
          {retro.improvements.map((item, i) => (
            <li key={i} style={{ fontSize: 14, color: 'var(--color-muted)', lineHeight: 1.5, paddingLeft: 16, borderLeft: '2px solid var(--color-warning)' }}>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
