import { readYaml } from '@/lib/yaml';

interface Doc {
  id: string;
  title: string;
  type: string;
  plane: string | null;
  status: string;
  url: string;
  last_reviewed: string;
}

const statusColors: Record<string, { color: string; bg: string }> = {
  current: { color: 'var(--color-accent-text)', bg: 'var(--color-accent-dim)' },
  'needs-review': { color: 'var(--color-warning)', bg: 'var(--color-warning-dim)' },
  draft: { color: 'var(--color-info)', bg: 'var(--color-info-dim)' },
};

export default function KnowledgePage() {
  const { docs } = readYaml<{ docs: Doc[] }>('knowledge-hub/docs-registry.yaml');

  return (
    <div style={{ paddingTop: 24, maxWidth: 900, margin: '0 auto', padding: '24px 24px 0' }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.03em', marginBottom: 8 }}>
        Knowledge Hub
      </h1>
      <p style={{ fontSize: 15, color: 'var(--color-muted)', marginBottom: 32 }}>
        Runbooks, policies, and reference material. Linked to their source of record.
      </p>

      <div style={{ borderRadius: 8, border: '1px solid var(--color-border)', overflow: 'hidden' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 100px 100px 100px 120px',
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
          <span>Document</span>
          <span>Type</span>
          <span>Plane</span>
          <span>Status</span>
          <span>Reviewed</span>
        </div>
        {docs.map((doc, i) => {
          const sc = statusColors[doc.status] ?? statusColors.current;
          return (
            <a
              key={doc.id}
              href={doc.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'grid',
                gridTemplateColumns: '2fr 100px 100px 100px 120px',
                padding: '14px 16px',
                background: i % 2 === 0 ? 'var(--color-surface)' : 'var(--color-surface-zebra)',
                borderTop: '1px solid var(--color-border)',
                textDecoration: 'none',
                alignItems: 'center',
                transition: 'background 0.15s ease',
              }}
            >
              <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--color-text)' }}>
                {doc.title} <span style={{ fontSize: 12, color: 'var(--color-subtle)' }}>↗</span>
              </span>
              <span style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--color-muted)' }}>{doc.type}</span>
              <span style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--color-subtle)' }}>{doc.plane ?? '—'}</span>
              <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', padding: '2px 6px', borderRadius: 9999, color: sc.color, background: sc.bg, display: 'inline-block', width: 'fit-content' }}>
                {doc.status}
              </span>
              <span style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--color-subtle)' }}>{doc.last_reviewed}</span>
            </a>
          );
        })}
      </div>
    </div>
  );
}
