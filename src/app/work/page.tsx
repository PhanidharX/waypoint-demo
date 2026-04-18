import { readYaml } from '@/lib/yaml';
import Link from 'next/link';

interface Config {
  team_name: string;
  current_quarter: string;
  vocabulary: { rotation: string };
  sprint: {
    current_sprint: string;
    cadence: string;
    idp_cycle_week: number;
    idp_cycle_total: number;
  };
}

interface TeamMember {
  name: string;
  onSupportToday: boolean;
}

interface Project {
  id: number;
  status: string;
  track: string;
}

interface IDPDomain {
  id: string;
  name: string;
  status: string;
  summary: string;
}

const statusColors: Record<string, string> = {
  'on-track': 'var(--color-accent)',
  'in-progress': 'var(--color-info)',
  'slipping': 'var(--color-critical)',
  'complete': 'var(--color-muted)',
};

function SignalPill({ label, value, color, href }: { label: string; value: string | number; color: string; href: string }) {
  return (
    <Link
      href={href}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        padding: '8px 14px',
        borderRadius: 8,
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        textDecoration: 'none',
        transition: 'border-color 0.15s ease',
      }}
    >
      <span style={{ width: 8, height: 8, borderRadius: '50%', background: color }} />
      <span style={{ fontSize: 13, color: 'var(--color-muted)' }}>{label}</span>
      <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text)', fontFamily: 'var(--font-mono)' }}>{value}</span>
      <span style={{ fontSize: 12, color: 'var(--color-subtle)' }}>→</span>
    </Link>
  );
}

export default function WorkDashboard() {
  const config = readYaml<Config>('config.yaml');
  const { team } = readYaml<{ team: TeamMember[] }>('team.yaml');
  const { projects } = readYaml<{ projects: Project[] }>('projects.yaml');
  const { idp_domains } = readYaml<{ idp_domains: IDPDomain[] }>('idp-status.yaml');

  const supportPerson = team?.find((m) => m.onSupportToday)?.name ?? 'Not assigned';
  const slippingCount = projects.filter((p) => p.status === 'slipping').length;
  const idpCount = projects.filter((p) => p.track === 'idp').length;

  return (
    <div style={{ paddingTop: 24, maxWidth: 900, margin: '0 auto', padding: '24px 24px 0' }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.03em', marginBottom: 4 }}>
        Dashboard
      </h1>
      <p style={{ fontSize: 13, fontFamily: 'var(--font-mono)', color: 'var(--color-subtle)', marginBottom: 32 }}>
        {config.current_quarter} · {config.sprint.current_sprint} · Week {config.sprint.idp_cycle_week}/{config.sprint.idp_cycle_total}
      </p>

      {/* Signal pills */}
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 40 }}>
        <SignalPill label={config.vocabulary.rotation} value={supportPerson} color="var(--color-accent)" href="/work/team" />
        <SignalPill label="IDP projects" value={idpCount} color="var(--color-purple)" href="/work/projects" />
        {slippingCount > 0 && (
          <SignalPill label="Slipping" value={slippingCount} color="var(--color-critical)" href="/work/projects" />
        )}
      </div>

      {/* IDP domain cards */}
      <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>IDP Domains</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 40 }}>
        {idp_domains.map((d) => (
          <Link
            key={d.id}
            href="/work/idp"
            style={{
              padding: 16,
              borderRadius: 8,
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              textDecoration: 'none',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: statusColors[d.status] ?? 'var(--color-subtle)' }} />
              <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--color-text)' }}>{d.name}</span>
            </div>
            <div style={{ fontSize: 13, color: 'var(--color-muted)', lineHeight: 1.5 }}>{d.summary}</div>
          </Link>
        ))}
      </div>

      {/* Quick links */}
      <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>Quick Links</h2>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {[
          { label: 'Projects', href: '/work/projects' },
          { label: 'Team', href: '/work/team' },
          { label: 'Retro', href: '/work/retro' },
          { label: 'Knowledge Hub', href: '/work/knowledge' },
          { label: 'Rituals', href: '/work/rituals' },
          { label: 'Onboarding', href: '/work/onboarding' },
        ].map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="link-internal"
            style={{ fontSize: 13 }}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
