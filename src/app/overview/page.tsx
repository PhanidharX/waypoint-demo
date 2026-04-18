import { readYaml } from '@/lib/yaml';
import type { Project } from '@/lib/types';
import StatusBadge from '@/components/shared/StatusBadge';
import Link from 'next/link';

interface Config {
  team_name: string;
  current_quarter: string;
  sprint: { current_sprint: string; idp_cycle_week: number; idp_cycle_total: number };
}

interface IDPDomain {
  id: string;
  name: string;
  status: string;
  summary: string;
}

interface RetroMetrics {
  metrics: {
    scope_creep_pct: number;
    velocity_avg: number;
    stories_completed: number;
  };
}

export default function OverviewPage() {
  const config = readYaml<Config>('config.yaml');
  const { projects } = readYaml<{ projects: Project[] }>('projects.yaml');
  const { idp_domains } = readYaml<{ idp_domains: IDPDomain[] }>('idp-status.yaml');
  const retro = readYaml<RetroMetrics>('retro.yaml');

  const slipping = projects.filter((p) => p.status === 'slipping');
  const onTrack = projects.filter((p) => p.status === 'on-track').length;
  const total = projects.length;

  return (
    <div style={{ paddingTop: 24, maxWidth: 900, margin: '0 auto', padding: '24px 24px 0' }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.03em', marginBottom: 4 }}>
        Overview
      </h1>
      <p style={{ fontSize: 13, fontFamily: 'var(--font-mono)', color: 'var(--color-subtle)', marginBottom: 32 }}>
        {config.current_quarter} · {config.sprint.current_sprint}
      </p>

      {/* Health summary */}
      <div
        style={{
          display: 'flex',
          gap: 24,
          padding: '20px 24px',
          borderRadius: 8,
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          marginBottom: 32,
          flexWrap: 'wrap',
        }}
      >
        {[
          { label: 'Projects', value: total },
          { label: 'On Track', value: onTrack, color: 'var(--color-accent-text)' },
          { label: 'Slipping', value: slipping.length, color: slipping.length > 0 ? 'var(--color-critical)' : undefined },
          { label: 'Velocity', value: retro.metrics.velocity_avg },
          { label: 'Scope Creep', value: `${retro.metrics.scope_creep_pct}%`, color: retro.metrics.scope_creep_pct > 15 ? 'var(--color-warning)' : undefined },
        ].map((m) => (
          <div key={m.label}>
            <div style={{ fontSize: 24, fontWeight: 700, color: m.color ?? 'var(--color-text)' }}>{m.value}</div>
            <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-subtle)', marginTop: 2 }}>
              {m.label}
            </div>
          </div>
        ))}
      </div>

      {/* Slipping projects */}
      {slipping.length > 0 && (
        <div style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--color-critical)', marginBottom: 12 }}>
            Attention Required
          </h2>
          {slipping.map((p) => (
            <div
              key={p.id}
              style={{
                padding: 16,
                borderRadius: 8,
                background: 'var(--color-critical-dim)',
                border: '1px solid var(--color-critical)',
                marginBottom: 8,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--color-text)' }}>{p.name}</span>
                <StatusBadge status={p.status} />
                {p.scopeCreep > 0 && (
                  <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--color-warning)' }}>+{p.scopeCreep} scope</span>
                )}
              </div>
              <div style={{ fontSize: 13, color: 'var(--color-muted)', marginTop: 4 }}>
                {p.lead} · {p.customer} · Updated {p.lastUpdated}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* IDP domains */}
      <div style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>IDP Domains</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {idp_domains.map((d) => (
            <div
              key={d.id}
              style={{
                padding: 16,
                borderRadius: 8,
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--color-text)' }}>{d.name}</span>
                <StatusBadge status={d.status} />
              </div>
              <div style={{ fontSize: 13, color: 'var(--color-muted)', lineHeight: 1.5 }}>{d.summary}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Drill-down links */}
      <div style={{ display: 'flex', gap: 12 }}>
        <Link href="/work/projects" className="link-internal" style={{ fontSize: 13 }}>All projects</Link>
        <Link href="/work/retro" className="link-internal" style={{ fontSize: 13 }}>Retro details</Link>
        <Link href="/work/team" className="link-internal" style={{ fontSize: 13 }}>Team</Link>
      </div>
    </div>
  );
}
