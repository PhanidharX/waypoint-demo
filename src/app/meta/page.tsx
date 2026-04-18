import Link from 'next/link';
import { getAllSections } from '@/lib/docs';

const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
  done: { label: 'Done', color: 'var(--color-accent-text)', bg: 'var(--color-accent-dim)' },
  partial: { label: 'Partial', color: 'var(--color-warning)', bg: 'var(--color-warning-dim)' },
  stub: { label: 'Stub', color: 'var(--color-subtle)', bg: 'var(--color-surface-high)' },
};

export default function MetaIndexPage() {
  const sections = getAllSections();

  return (
    <div style={{ paddingTop: 24, maxWidth: 1000, margin: '0 auto', padding: '24px 24px 0' }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.03em', marginBottom: 4 }}>
        Meta
      </h1>
      <p style={{ fontSize: 15, color: 'var(--color-muted)', marginBottom: 32 }}>
        Documentation about Waypoint itself, organized by the{' '}
        <span style={{ color: 'var(--color-text)', fontWeight: 500 }}>Diataxis</span> framework.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
        {sections.map((section) => {
          const doneCount = section.entries.filter((e) => e.status === 'done').length;
          const total = section.entries.length;

          return (
            <div
              key={section.id}
              style={{
                padding: 24,
                borderRadius: 12,
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <Link
                  href={section.href}
                  style={{
                    fontSize: 18,
                    fontWeight: 600,
                    color: 'var(--color-text)',
                    textDecoration: 'none',
                  }}
                >
                  {section.name}
                </Link>
                <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--color-subtle)' }}>
                  {doneCount}/{total}
                </span>
              </div>
              <p style={{ fontSize: 13, color: 'var(--color-muted)', margin: '0 0 14px', lineHeight: 1.5 }}>
                {section.description}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {section.entries.map((entry) => {
                  const sc = statusConfig[entry.status];
                  return (
                    <div key={entry.slug} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Link
                        href={`${section.href}/${entry.slug}`}
                        style={{
                          fontSize: 13,
                          color: 'var(--color-muted)',
                          textDecoration: 'none',
                          flex: 1,
                          transition: 'color 0.15s ease',
                        }}
                      >
                        {entry.title}
                      </Link>
                      <span
                        style={{
                          fontSize: 10,
                          fontFamily: 'var(--font-mono)',
                          padding: '1px 6px',
                          borderRadius: 9999,
                          color: sc.color,
                          background: sc.bg,
                          flexShrink: 0,
                        }}
                      >
                        {sc.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
