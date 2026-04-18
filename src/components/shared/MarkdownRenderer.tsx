interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  // Simple markdown rendering — tables, headers, paragraphs, lists, code blocks
  const blocks = content.split('\n\n');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {blocks.map((block, i) => {
        const trimmed = block.trim();
        if (!trimmed) return null;

        // Headers
        if (trimmed.startsWith('# ')) {
          return <h1 key={i} style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.03em' }}>{trimmed.slice(2)}</h1>;
        }
        if (trimmed.startsWith('## ')) {
          return <h2 key={i} style={{ fontSize: 18, fontWeight: 600, marginTop: 8 }}>{trimmed.slice(3)}</h2>;
        }
        if (trimmed.startsWith('### ')) {
          return <h3 key={i} style={{ fontSize: 15, fontWeight: 600 }}>{trimmed.slice(4)}</h3>;
        }

        // Code blocks
        if (trimmed.startsWith('```')) {
          const lines = trimmed.split('\n');
          const code = lines.slice(1, -1).join('\n');
          return (
            <pre
              key={i}
              style={{
                padding: 16,
                borderRadius: 8,
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                fontFamily: 'var(--font-mono)',
                fontSize: 13,
                color: 'var(--color-muted)',
                overflow: 'auto',
                margin: 0,
              }}
            >
              {code}
            </pre>
          );
        }

        // Tables
        if (trimmed.includes('|') && trimmed.includes('---')) {
          const rows = trimmed.split('\n').filter((r) => !r.match(/^\|[\s-:|]+\|$/));
          const header = rows[0]?.split('|').map((c) => c.trim()).filter(Boolean);
          const body = rows.slice(1).map((r) => r.split('|').map((c) => c.trim()).filter(Boolean));
          return (
            <div key={i} style={{ borderRadius: 8, border: '1px solid var(--color-border)', overflow: 'hidden' }}>
              {header && (
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${header.length}, 1fr)`,
                    padding: '8px 12px',
                    background: 'var(--color-surface-high)',
                    fontSize: 11,
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 500,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    color: 'var(--color-subtle)',
                  }}
                >
                  {header.map((h, j) => <span key={j}>{h}</span>)}
                </div>
              )}
              {body.map((row, ri) => (
                <div
                  key={ri}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${header?.length ?? row.length}, 1fr)`,
                    padding: '8px 12px',
                    background: ri % 2 === 0 ? 'var(--color-surface)' : 'var(--color-surface-zebra)',
                    borderTop: '1px solid var(--color-border)',
                    fontSize: 13,
                    color: 'var(--color-muted)',
                  }}
                >
                  {row.map((cell, ci) => <span key={ci}>{cell}</span>)}
                </div>
              ))}
            </div>
          );
        }

        // Unordered lists
        if (trimmed.match(/^[-*]\s/m)) {
          const items = trimmed.split('\n').map((l) => l.replace(/^[-*]\s+/, ''));
          return (
            <ul key={i} style={{ margin: 0, paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 4 }}>
              {items.map((item, j) => (
                <li key={j} style={{ fontSize: 14, color: 'var(--color-muted)', lineHeight: 1.5 }}>{item}</li>
              ))}
            </ul>
          );
        }

        // Blockquote
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
                fontSize: 14,
                color: 'var(--color-muted)',
                lineHeight: 1.6,
              }}
            >
              {lines.join('\n')}
            </div>
          );
        }

        // Paragraph
        return (
          <p key={i} style={{ fontSize: 14, color: 'var(--color-muted)', lineHeight: 1.6, margin: 0 }}>
            {trimmed}
          </p>
        );
      })}
    </div>
  );
}
