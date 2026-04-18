import type { TeamMember } from '@/lib/types';

interface PersonCardProps {
  member: TeamMember;
}

export default function PersonCard({ member }: PersonCardProps) {
  return (
    <div
      style={{
        padding: 20,
        borderRadius: 12,
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            background: 'var(--color-surface-high)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 16,
            fontWeight: 600,
            color: 'var(--color-muted)',
          }}
        >
          {member.name.split(' ').map((n) => n[0]).join('')}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--color-text)' }}>
              {member.name}
            </span>
            {member.onSupportToday && (
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: 'var(--color-accent)',
                }}
                className="pulse"
                title="On support today"
              />
            )}
          </div>
          <div style={{ fontSize: 13, color: 'var(--color-muted)' }}>{member.role}</div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 8 }}>
        <span
          style={{
            fontSize: 11,
            fontFamily: 'var(--font-mono)',
            padding: '2px 8px',
            borderRadius: 4,
            background: 'var(--color-accent-dim)',
            color: 'var(--color-accent-text)',
          }}
        >
          {member.primaryPlane}
        </span>
        {member.secondaryPlane && (
          <span
            style={{
              fontSize: 11,
              fontFamily: 'var(--font-mono)',
              padding: '2px 8px',
              borderRadius: 4,
              border: '1px solid var(--color-border)',
              color: 'var(--color-subtle)',
            }}
          >
            {member.secondaryPlane}
          </span>
        )}
      </div>

      {member.hat && (
        <div style={{ fontSize: 12, color: 'var(--color-muted)' }}>
          <span style={{ color: 'var(--color-subtle)' }}>Hat:</span> {member.hat}
        </div>
      )}

      {member.profile_link && (
        <a
          href={member.profile_link.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 3,
            fontSize: 12,
            color: 'var(--color-subtle)',
            textDecoration: 'none',
            marginTop: 8,
            transition: 'color 0.15s ease',
          }}
        >
          {member.profile_link.label} ↗
        </a>
      )}
    </div>
  );
}
