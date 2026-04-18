interface RightNowProps {
  sprint: {
    current_sprint: string;
    cadence: string;
    idp_cycle_week: number;
    idp_cycle_total: number;
  };
  vocabulary: {
    rotation: string;
  };
  supportPerson: string | null;
}

export default function RightNow({ sprint, vocabulary, supportPerson }: RightNowProps) {
  return (
    <section style={{ maxWidth: 700, margin: '0 auto' }}>
      <h2
        style={{
          fontSize: 11,
          fontFamily: 'var(--font-mono)',
          fontWeight: 500,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          color: 'var(--color-subtle)',
          marginBottom: 16,
          textAlign: 'center',
        }}
      >
        Right now
      </h2>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 32,
          flexWrap: 'wrap',
        }}
      >
        {/* Support */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: supportPerson ? 'var(--color-accent)' : 'var(--color-subtle)',
            }}
            className={supportPerson ? 'pulse' : undefined}
          />
          <span style={{ fontSize: 13, color: 'var(--color-muted)' }}>
            {vocabulary.rotation}:
          </span>
          <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--color-text)' }}>
            {supportPerson ?? 'Not assigned'}
          </span>
        </div>

        {/* Sprint */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: 'var(--color-info)',
            }}
          />
          <span style={{ fontSize: 13, color: 'var(--color-muted)' }}>
            {sprint.current_sprint}
          </span>
          <span
            style={{
              fontSize: 11,
              fontFamily: 'var(--font-mono)',
              color: 'var(--color-subtle)',
            }}
          >
            {sprint.cadence}
          </span>
        </div>

        {/* IDP Cycle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: 'var(--color-purple)',
            }}
          />
          <span style={{ fontSize: 13, color: 'var(--color-muted)' }}>
            IDP cycle
          </span>
          <span
            style={{
              fontSize: 11,
              fontFamily: 'var(--font-mono)',
              color: 'var(--color-subtle)',
            }}
          >
            week {sprint.idp_cycle_week}/{sprint.idp_cycle_total}
          </span>
        </div>
      </div>
    </section>
  );
}
