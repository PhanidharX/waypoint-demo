interface StatBlockProps {
  label: string;
  value: number | string;
  prefix?: string;
  suffix?: string;
  celebrate?: boolean;
  style?: React.CSSProperties;
}

export default function StatBlock({
  label,
  value,
  prefix = '',
  suffix = '',
  celebrate = false,
  style,
}: StatBlockProps) {
  const isCelebrateZero = celebrate && value === 0;

  return (
    <div style={{ textAlign: 'center', ...style }}>
      <div
        className={isCelebrateZero ? 'pulse' : undefined}
        style={{
          fontSize: 28,
          fontWeight: 700,
          fontFamily: 'var(--font-sans)',
          color: isCelebrateZero ? 'var(--color-accent-text)' : 'var(--color-text)',
          lineHeight: 1.2,
        }}
      >
        {prefix}{value}{suffix}
      </div>
      <div
        style={{
          fontSize: 11,
          fontFamily: 'var(--font-mono)',
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          color: 'var(--color-subtle)',
          marginTop: 4,
        }}
      >
        {label}
      </div>
    </div>
  );
}

export type { StatBlockProps };
