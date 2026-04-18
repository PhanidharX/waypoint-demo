import Link from 'next/link';
import type { DocEntry } from '@/lib/docs';

const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
  done: { label: 'Done', color: 'var(--color-accent-text)', bg: 'var(--color-accent-dim)' },
  partial: { label: 'Partial', color: 'var(--color-warning)', bg: 'var(--color-warning-dim)' },
  stub: { label: 'Stub', color: 'var(--color-subtle)', bg: 'var(--color-surface-high)' },
};

interface DocSectionPageProps {
  title: string;
  description: string;
  basePath: string;
  entries: DocEntry[];
}

export default function DocSectionPage({ title, description, basePath, entries }: DocSectionPageProps) {
  return (
    <div style={{ paddingTop: 24, maxWidth: 800, margin: '0 auto', padding: '24px 24px 0' }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.03em', marginBottom: 8 }}>
        {title}
      </h1>
      <p style={{ fontSize: 15, color: 'var(--color-muted)', marginBottom: 32 }}>
        {description}
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        {entries.map((entry, i) => {
          const sc = statusConfig[entry.status];
          return (
            <Link
              key={entry.slug}
              href={`${basePath}/${entry.slug}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '14px 16px',
                borderTop: i > 0 ? '1px solid var(--color-border)' : undefined,
                textDecoration: 'none',
                transition: 'background 0.15s ease',
                borderRadius: i === 0 ? '8px 8px 0 0' : i === entries.length - 1 ? '0 0 8px 8px' : 0,
              }}
            >
              <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--color-text)', flex: 1 }}>
                {entry.title}
              </span>
              <span
                style={{
                  fontSize: 10,
                  fontFamily: 'var(--font-mono)',
                  padding: '2px 8px',
                  borderRadius: 9999,
                  color: sc.color,
                  background: sc.bg,
                }}
              >
                {sc.label}
              </span>
              <span style={{ fontSize: 13, color: 'var(--color-subtle)' }}>→</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
