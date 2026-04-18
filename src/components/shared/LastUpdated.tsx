interface LastUpdatedProps {
  date: string;
  style?: React.CSSProperties;
}

export default function LastUpdated({ date, style }: LastUpdatedProps) {
  return (
    <span
      style={{
        fontSize: 12,
        fontFamily: 'var(--font-mono)',
        color: 'var(--color-subtle)',
        letterSpacing: '0.02em',
        ...style,
      }}
    >
      Last updated: {date}
    </span>
  );
}

export type { LastUpdatedProps };
