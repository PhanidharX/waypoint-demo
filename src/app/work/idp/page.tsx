import { readYaml } from '@/lib/yaml';
import type { Project } from '@/lib/types';
import StatusBadge from '@/components/shared/StatusBadge';

interface IDPDomain {
  id: string;
  name: string;
  status: string;
  lead: string;
  projects: number[];
  summary: string;
}

export default function IDPPage() {
  const { idp_domains } = readYaml<{ idp_domains: IDPDomain[] }>('idp-status.yaml');
  const { projects } = readYaml<{ projects: Project[] }>('projects.yaml');

  return (
    <div style={{ paddingTop: 24, maxWidth: 900, margin: '0 auto', padding: '24px 24px 0' }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.03em', marginBottom: 8 }}>
        IDP Status
      </h1>
      <p style={{ fontSize: 15, color: 'var(--color-muted)', marginBottom: 32 }}>
        Internal Developer Platform domain status for the current cycle.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {idp_domains.map((domain) => {
          const domainProjects = projects.filter((p) => domain.projects.includes(p.id));
          return (
            <div
              key={domain.id}
              style={{
                padding: 24,
                borderRadius: 12,
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <h2 style={{ fontSize: 18, fontWeight: 600, margin: 0, color: 'var(--color-text)' }}>{domain.name}</h2>
                <StatusBadge status={domain.status} />
              </div>
              <div style={{ fontSize: 12, color: 'var(--color-subtle)', marginBottom: 8 }}>
                Lead: {domain.lead}
              </div>
              <p style={{ fontSize: 14, color: 'var(--color-muted)', lineHeight: 1.5, margin: '0 0 12px' }}>
                {domain.summary}
              </p>

              {domainProjects.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-subtle)' }}>
                    Projects
                  </div>
                  {domainProjects.map((p) => (
                    <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0' }}>
                      <span style={{ fontSize: 13, color: 'var(--color-text)' }}>{p.name}</span>
                      <StatusBadge status={p.status} />
                      {p.scopeCreep > 0 && (
                        <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--color-warning)' }}>+{p.scopeCreep}</span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
