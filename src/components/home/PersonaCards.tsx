'use client';

import Link from 'next/link';

const personas = [
  {
    icon: '⌘',
    title: 'Developer',
    description: 'I need to use the platform — environments, images, pipelines.',
    cta: 'Browse capabilities',
    href: '/capabilities',
  },
  {
    icon: '⚙',
    title: 'Team Member',
    description: 'I work on this team — projects, rituals, rotation, knowledge.',
    cta: 'Go to workspace',
    href: '/work',
  },
  {
    icon: '◉',
    title: 'Leadership',
    description: 'I need the big picture — health, progress, risks.',
    cta: 'View overview',
    href: '/overview',
  },
];

export default function PersonaCards() {
  return (
    <section>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 20,
          maxWidth: 900,
          margin: '0 auto',
        }}
      >
        {personas.map((p) => (
          <Link
            key={p.title}
            href={p.href}
            style={{
              display: 'flex',
              flexDirection: 'column',
              padding: 24,
              borderRadius: 12,
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              boxShadow: 'var(--shadow)',
              textDecoration: 'none',
              color: 'inherit',
              transition: 'transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.2s ease',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.transform = 'translateY(-3px)';
              el.style.boxShadow = 'var(--shadow-hover)';
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.transform = 'translateY(0)';
              el.style.boxShadow = 'var(--shadow)';
            }}
          >
            <span style={{ fontSize: 24, marginBottom: 12 }}>{p.icon}</span>
            <h3
              style={{
                fontSize: 18,
                fontWeight: 600,
                color: 'var(--color-text)',
                margin: '0 0 8px',
                letterSpacing: '-0.01em',
              }}
            >
              {p.title}
            </h3>
            <p
              style={{
                fontSize: 14,
                color: 'var(--color-muted)',
                lineHeight: 1.5,
                margin: '0 0 16px',
                flex: 1,
              }}
            >
              {p.description}
            </p>
            <span
              style={{
                fontSize: 13,
                fontWeight: 500,
                color: 'var(--color-accent-text)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
              }}
            >
              {p.cta}
              <span
                style={{
                  display: 'inline-block',
                  transition: 'transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
                }}
                className="cta-arrow"
              >
                →
              </span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
