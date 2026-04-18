import type { SORRef } from '@/lib/types';

interface SORLinkProps {
  sor: SORRef;
}

export default function SORLink({ sor }: SORLinkProps) {
  return (
    <a
      href={sor.url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        fontSize: 12,
        color: 'var(--color-subtle)',
        textDecoration: 'none',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        transition: 'color 0.15s ease',
      }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--color-muted)'; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--color-subtle)'; }}
    >
      {sor.label} ↗
    </a>
  );
}
