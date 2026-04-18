import { readYaml } from '@/lib/yaml';
import type { TeamMember } from '@/lib/types';
import PersonCard from '@/components/team/PersonCard';
import PlaneMap from '@/components/team/PlaneMap';
import HatsTable from '@/components/team/HatsTable';

export default function TeamPage() {
  const { team } = readYaml<{ team: TeamMember[] }>('team.yaml');
  const { rotation } = readYaml<{ rotation: { week_of: string; primary: string; secondary: string }[] }>('rotation.yaml');

  return (
    <div style={{ paddingTop: 24, maxWidth: 1000, margin: '0 auto', padding: '24px 24px 0' }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.03em', marginBottom: 32 }}>
        Team
      </h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
        <PlaneMap members={team} />

        <HatsTable members={team} />

        {/* Rotation schedule */}
        <div>
          <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>Support Rotation</h2>
          <div style={{ borderRadius: 8, border: '1px solid var(--color-border)', overflow: 'hidden' }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
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
              <span>Week of</span>
              <span>Primary</span>
              <span>Secondary</span>
            </div>
            {rotation.map((r, i) => (
              <div
                key={r.week_of}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr',
                  padding: '12px 16px',
                  background: i % 2 === 0 ? 'var(--color-surface)' : 'var(--color-surface-zebra)',
                  borderTop: '1px solid var(--color-border)',
                  fontSize: 13,
                }}
              >
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--color-subtle)' }}>{r.week_of}</span>
                <span style={{ color: 'var(--color-text)', fontWeight: 500 }}>{r.primary}</span>
                <span style={{ color: 'var(--color-muted)' }}>{r.secondary}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Person cards */}
        <div>
          <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>People</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {team.map((m) => (
              <PersonCard key={m.id} member={m} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
