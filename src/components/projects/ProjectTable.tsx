'use client';

import { useState, useMemo } from 'react';
import type { Project } from '@/lib/types';
import StatusBadge from '@/components/shared/StatusBadge';
import ScopeCreepBadge from './ScopeCreepBadge';
import SORLink from '@/components/shared/SORLink';

interface ProjectTableProps {
  projects: Project[];
}

function unique(arr: string[]): string[] {
  return [...new Set(arr)].sort();
}

function FilterPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        fontSize: 12,
        padding: '4px 10px',
        borderRadius: 9999,
        border: active ? '1px solid var(--color-accent)' : '1px solid var(--color-border)',
        background: active ? 'var(--color-accent-dim)' : 'transparent',
        color: active ? 'var(--color-accent-text)' : 'var(--color-muted)',
        cursor: 'pointer',
        transition: 'all 0.15s ease',
        fontFamily: 'var(--font-mono)',
      }}
    >
      {label}
    </button>
  );
}

export default function ProjectTable({ projects }: ProjectTableProps) {
  const [activeTrack, setActiveTrack] = useState<'idp' | 'ongoing'>('idp');
  const [filterCustomer, setFilterCustomer] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [filterPlane, setFilterPlane] = useState<string | null>(null);
  const [filterLead, setFilterLead] = useState<string | null>(null);

  const trackProjects = projects.filter((p) => p.track === activeTrack);

  const customers = unique(trackProjects.map((p) => p.customer));
  const statuses = unique(trackProjects.map((p) => p.status));
  const planes = unique(trackProjects.flatMap((p) => p.planes));
  const leads = unique(trackProjects.map((p) => p.lead));

  const filtered = useMemo(() => {
    return trackProjects.filter((p) => {
      if (filterCustomer && p.customer !== filterCustomer) return false;
      if (filterStatus && p.status !== filterStatus) return false;
      if (filterPlane && !p.planes.includes(filterPlane)) return false;
      if (filterLead && p.lead !== filterLead) return false;
      return true;
    });
  }, [trackProjects, filterCustomer, filterStatus, filterPlane, filterLead]);

  const clearFilters = () => {
    setFilterCustomer(null);
    setFilterStatus(null);
    setFilterPlane(null);
    setFilterLead(null);
  };

  const hasFilters = filterCustomer || filterStatus || filterPlane || filterLead;

  const trackAccent = activeTrack === 'idp' ? 'var(--color-purple)' : 'var(--color-info)';

  return (
    <div>
      {/* Track tabs */}
      <div style={{ display: 'flex', gap: 0, marginBottom: 20, borderBottom: '1px solid var(--color-border)' }}>
        {(['idp', 'ongoing'] as const).map((track) => {
          const isActive = activeTrack === track;
          const count = projects.filter((p) => p.track === track).length;
          return (
            <button
              key={track}
              onClick={() => { setActiveTrack(track); clearFilters(); }}
              style={{
                fontSize: 14,
                fontWeight: isActive ? 600 : 400,
                padding: '10px 20px',
                border: 'none',
                borderBottom: isActive
                  ? `2px solid ${track === 'idp' ? 'var(--color-purple)' : 'var(--color-info)'}`
                  : '2px solid transparent',
                background: 'transparent',
                color: isActive ? 'var(--color-text)' : 'var(--color-muted)',
                cursor: 'pointer',
                transition: 'color 0.15s ease',
              }}
            >
              {track === 'idp' ? 'IDP' : 'Ongoing'}
              <span
                style={{
                  fontSize: 11,
                  fontFamily: 'var(--font-mono)',
                  marginLeft: 6,
                  color: isActive ? (track === 'idp' ? 'var(--color-purple)' : 'var(--color-info)') : 'var(--color-subtle)',
                }}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Filter pills */}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16, alignItems: 'center' }}>
        {customers.map((c) => (
          <FilterPill key={`c-${c}`} label={c} active={filterCustomer === c} onClick={() => setFilterCustomer(filterCustomer === c ? null : c)} />
        ))}
        <span style={{ width: 1, height: 16, background: 'var(--color-border)', margin: '0 4px' }} />
        {statuses.map((s) => (
          <FilterPill key={`s-${s}`} label={s} active={filterStatus === s} onClick={() => setFilterStatus(filterStatus === s ? null : s)} />
        ))}
        <span style={{ width: 1, height: 16, background: 'var(--color-border)', margin: '0 4px' }} />
        {planes.map((p) => (
          <FilterPill key={`p-${p}`} label={p} active={filterPlane === p} onClick={() => setFilterPlane(filterPlane === p ? null : p)} />
        ))}
        <span style={{ width: 1, height: 16, background: 'var(--color-border)', margin: '0 4px' }} />
        {leads.map((l) => (
          <FilterPill key={`l-${l}`} label={l} active={filterLead === l} onClick={() => setFilterLead(filterLead === l ? null : l)} />
        ))}
        {hasFilters && (
          <button
            onClick={clearFilters}
            style={{
              fontSize: 11,
              padding: '4px 8px',
              border: 'none',
              background: 'transparent',
              color: 'var(--color-subtle)',
              cursor: 'pointer',
              fontFamily: 'var(--font-mono)',
            }}
          >
            Clear
          </button>
        )}
      </div>

      {/* Table */}
      <div style={{ borderRadius: 8, border: '1px solid var(--color-border)', overflow: 'hidden' }}>
        {/* Header */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr 1fr 100px 60px',
            gap: 0,
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
          <span>Project</span>
          <span>Customer</span>
          <span>Lead</span>
          <span>Status</span>
          <span>Updated</span>
          <span>Scope</span>
        </div>

        {/* Rows */}
        {filtered.length === 0 ? (
          <div style={{ padding: '24px 16px', fontSize: 13, color: 'var(--color-subtle)', textAlign: 'center' }}>
            No projects match the current filters.
          </div>
        ) : (
          filtered.map((project, i) => (
            <div
              key={project.id}
              style={{
                display: 'grid',
                gridTemplateColumns: '2fr 1fr 1fr 1fr 100px 60px',
                gap: 0,
                padding: '16px',
                background: i % 2 === 0 ? 'var(--color-surface)' : 'var(--color-surface-zebra)',
                alignItems: 'center',
                transition: 'background 0.15s ease',
                borderTop: '1px solid var(--color-border)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'var(--color-surface-hover)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background =
                  i % 2 === 0 ? 'var(--color-surface)' : 'var(--color-surface-zebra)';
              }}
            >
              {/* Project name + planes + SOR */}
              <div>
                <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--color-text)', marginBottom: 4 }}>
                  {project.name}
                </div>
                <div style={{ display: 'flex', gap: 4, alignItems: 'center', flexWrap: 'wrap' }}>
                  {project.planes.map((p) => (
                    <span
                      key={p}
                      style={{
                        fontSize: 10,
                        fontFamily: 'var(--font-mono)',
                        padding: '1px 5px',
                        borderRadius: 3,
                        border: '1px solid var(--color-border)',
                        color: 'var(--color-subtle)',
                      }}
                    >
                      {p}
                    </span>
                  ))}
                  {project.sor_ref && <SORLink sor={project.sor_ref} />}
                </div>
              </div>

              {/* Customer */}
              <span style={{ fontSize: 13, color: 'var(--color-muted)' }}>
                {project.customer}
              </span>

              {/* Lead */}
              <span style={{ fontSize: 13, color: 'var(--color-muted)' }}>
                {project.lead}
              </span>

              {/* Status */}
              <div>
                <StatusBadge status={project.status} />
              </div>

              {/* Updated */}
              <span style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--color-subtle)' }}>
                {project.lastUpdated}
              </span>

              {/* Scope Creep */}
              <div>
                <ScopeCreepBadge count={project.scopeCreep} />
              </div>
            </div>
          ))
        )}
      </div>

      {/* Count */}
      <div style={{ marginTop: 12, fontSize: 12, color: 'var(--color-subtle)', fontFamily: 'var(--font-mono)' }}>
        {filtered.length} project{filtered.length !== 1 ? 's' : ''}
        {hasFilters ? ' (filtered)' : ''}
      </div>
    </div>
  );
}
