import type { PartnerDep } from '@/lib/types';

interface PartnerDepRowProps {
  dep: PartnerDep;
}

export default function PartnerDepRow({ dep }: PartnerDepRowProps) {
  return (
    <div
      style={{
        padding: '12px 16px',
        borderRadius: 8,
        border: dep.golden_path_blocker
          ? '1px solid var(--color-warning)'
          : '1px solid var(--color-border)',
        background: dep.golden_path_blocker
          ? 'var(--color-warning-dim)'
          : 'var(--color-surface)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
        <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--color-text)' }}>
          {dep.name}
        </span>
        {dep.golden_path_blocker && (
          <span
            style={{
              fontSize: 10,
              fontFamily: 'var(--font-mono)',
              fontWeight: 500,
              padding: '1px 6px',
              borderRadius: 4,
              background: 'var(--color-warning-dim)',
              color: 'var(--color-warning)',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
            }}
          >
            Blocker
          </span>
        )}
      </div>
      <div style={{ fontSize: 13, color: 'var(--color-muted)', marginBottom: 4 }}>
        {dep.relationship}
      </div>
      <div style={{ fontSize: 13, color: 'var(--color-subtle)' }}>
        {dep.impact}
      </div>
      {dep.sla_effect && (
        <div style={{ fontSize: 12, color: 'var(--color-warning)', marginTop: 4 }}>
          {dep.sla_effect}
        </div>
      )}
      {dep.blocker_detail && (
        <div style={{ fontSize: 12, color: 'var(--color-warning)', marginTop: 2, fontStyle: 'italic' }}>
          {dep.blocker_detail}
        </div>
      )}
    </div>
  );
}
