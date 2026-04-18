import fs from 'fs';
import path from 'path';

export default function EngagePage() {
  const mdPath = path.join(process.cwd(), 'content', 'how-to-engage.md');
  const raw = fs.readFileSync(mdPath, 'utf8');

  // Simple markdown-to-html for tables and basic formatting
  const sections = raw.split('\n\n');

  return (
    <div style={{ paddingTop: 24, maxWidth: 800, margin: '0 auto', padding: '24px 24px 0' }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.03em', marginBottom: 32 }}>
        How to Engage
      </h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {sections.map((section, i) => {
          const trimmed = section.trim();
          if (!trimmed || trimmed.startsWith('# How to Engage')) return null;

          // Section headers
          if (trimmed.startsWith('## ')) {
            return (
              <h2 key={i} style={{ fontSize: 18, fontWeight: 600, color: 'var(--color-text)', margin: 0 }}>
                {trimmed.replace('## ', '')}
              </h2>
            );
          }

          // Tables
          if (trimmed.includes('|') && trimmed.includes('---')) {
            const rows = trimmed.split('\n').filter((r) => !r.match(/^\|[\s-|]+\|$/));
            const header = rows[0]?.split('|').map((c) => c.trim()).filter(Boolean);
            const body = rows.slice(1).map((r) => r.split('|').map((c) => c.trim()).filter(Boolean));

            return (
              <div key={i} style={{ borderRadius: 8, border: '1px solid var(--color-border)', overflow: 'hidden' }}>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${header?.length ?? 3}, 1fr)`,
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
                  {header?.map((h, j) => <span key={j}>{h}</span>)}
                </div>
                {body.map((row, ri) => (
                  <div
                    key={ri}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: `repeat(${header?.length ?? 3}, 1fr)`,
                      padding: '10px 16px',
                      background: ri % 2 === 0 ? 'var(--color-surface)' : 'var(--color-surface-zebra)',
                      borderTop: '1px solid var(--color-border)',
                      fontSize: 13,
                      color: 'var(--color-muted)',
                    }}
                  >
                    {row.map((cell, ci) => (
                      <span key={ci} style={{ color: ci === 0 ? 'var(--color-text)' : undefined, fontWeight: ci === 0 ? 500 : undefined }}>
                        {cell}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            );
          }

          // Blockquote (template)
          if (trimmed.startsWith('>')) {
            const lines = trimmed.split('\n').map((l) => l.replace(/^>\s?/, ''));
            return (
              <div
                key={i}
                style={{
                  padding: '12px 16px',
                  borderLeft: '3px solid var(--color-accent)',
                  background: 'var(--color-accent-dim)',
                  borderRadius: '0 8px 8px 0',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 13,
                  color: 'var(--color-muted)',
                  lineHeight: 1.6,
                  whiteSpace: 'pre-line',
                }}
              >
                {lines.join('\n')}
              </div>
            );
          }

          // List items
          if (trimmed.startsWith('- **')) {
            const items = trimmed.split('\n').map((l) => l.replace(/^- /, ''));
            return (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {items.map((item, j) => {
                  const boldMatch = item.match(/^\*\*(.+?)\*\*\s*[—–-]\s*(.+)$/);
                  return (
                    <div key={j} style={{ fontSize: 14, color: 'var(--color-muted)' }}>
                      {boldMatch ? (
                        <>
                          <span style={{ fontWeight: 600, color: 'var(--color-text)', fontFamily: 'var(--font-mono)', fontSize: 13 }}>{boldMatch[1]}</span>
                          {' — '}{boldMatch[2]}
                        </>
                      ) : item}
                    </div>
                  );
                })}
              </div>
            );
          }

          // Paragraphs
          return (
            <p key={i} style={{ fontSize: 14, color: 'var(--color-muted)', lineHeight: 1.6, margin: 0 }}>
              {trimmed.replace(/\*\*(.+?)\*\*/g, '$1')}
            </p>
          );
        })}
      </div>
    </div>
  );
}
