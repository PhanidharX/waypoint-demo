interface SignalLinkProps {
  href: string;
  label: string;
  status: 'critical' | 'warning' | 'ok' | 'info';
  count?: number;
}

const statusColors: Record<string, { color: string; bg: string }> = {
  critical: { color: 'var(--color-critical)', bg: 'var(--color-critical-dim)' },
  warning: { color: 'var(--color-warning)', bg: 'var(--color-warning-dim)' },
  ok: { color: 'var(--color-accent-text)', bg: 'var(--color-accent-dim)' },
  info: { color: 'var(--color-info)', bg: 'var(--color-info-dim)' },
};

export default function SignalLink({ href, label, status, count }: SignalLinkProps) {
  const c = statusColors[status] ?? statusColors.info;

  return (
    <a
      href={href}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        fontSize: 13,
        fontFamily: 'var(--font-sans)',
        fontWeight: 500,
        color: c.color,
        textDecoration: 'none',
        transition: 'opacity 0.15s ease',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.opacity = '0.8';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.opacity = '1';
      }}
    >
      {count !== undefined && (
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: 18,
            height: 18,
            padding: '0 5px',
            borderRadius: 9999,
            fontSize: 11,
            fontFamily: 'var(--font-mono)',
            fontWeight: 600,
            color: c.color,
            background: c.bg,
          }}
        >
          {count}
        </span>
      )}
      {label} →
    </a>
  );
}

export type { SignalLinkProps };
