import type { Capability } from '@/lib/types';
import MaturityBadge from '@/components/shared/MaturityBadge';
import AvailabilityRow from './AvailabilityRow';
import PartnerDepRow from './PartnerDepRow';

interface CapabilityDetailProps {
  capability: Capability;
}

export default function CapabilityDetail({ capability }: CapabilityDetailProps) {
  return (
    <div style={{ padding: '0 0 48px' }}>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <span style={{ fontSize: 28 }}>{capability.icon}</span>
          <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--color-text)', margin: 0 }}>
            {capability.name}
          </h1>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <MaturityBadge maturity={capability.maturity} />
          {capability.planes.map((p) => (
            <span
              key={p}
              style={{
                fontSize: 11,
                fontFamily: 'var(--font-mono)',
                padding: '2px 8px',
                borderRadius: 4,
                border: '1px solid var(--color-border)',
                color: 'var(--color-muted)',
                letterSpacing: '0.02em',
              }}
            >
              {p}
            </span>
          ))}
        </div>
        <p style={{ fontSize: 15, color: 'var(--color-text)', lineHeight: 1.6, margin: 0 }}>
          {capability.statement}
        </p>
      </div>

      {/* Stats */}
      {capability.stats && capability.stats.length > 0 && (
        <div
          style={{
            display: 'flex',
            gap: 24,
            marginBottom: 32,
            padding: '16px 20px',
            borderRadius: 8,
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
          }}
        >
          {capability.stats.map((s) => (
            <div key={s.label}>
              <div
                style={{
                  fontSize: 24,
                  fontWeight: 700,
                  color: s.celebrate && (s.value === 0 || s.value === '0')
                    ? 'var(--color-accent-text)'
                    : 'var(--color-text)',
                  fontFamily: s.type === 'text' ? 'var(--font-mono)' : undefined,
                }}
              >
                {s.prefix}{s.value}{s.suffix}
              </div>
              <div
                style={{
                  fontSize: 11,
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--color-subtle)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  marginTop: 2,
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Detail */}
      <div style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--color-text)', marginBottom: 8, margin: '0 0 8px' }}>
          About
        </h2>
        <p style={{ fontSize: 14, color: 'var(--color-muted)', lineHeight: 1.6, margin: 0 }}>
          {capability.detail}
        </p>
      </div>

      {/* Self-service / Needs PE */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 32 }}>
        {capability.selfService && capability.selfService.length > 0 && (
          <div>
            <h3 style={{
              fontSize: 11,
              fontFamily: 'var(--font-mono)',
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              color: 'var(--color-accent-text)',
              marginBottom: 8,
              margin: '0 0 8px',
            }}>
              Self-service
            </h3>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
              {capability.selfService.map((item) => (
                <li
                  key={item}
                  style={{ fontSize: 13, color: 'var(--color-muted)', padding: '3px 0' }}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
        {capability.needsPE && capability.needsPE.length > 0 && (
          <div>
            <h3 style={{
              fontSize: 11,
              fontFamily: 'var(--font-mono)',
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              color: 'var(--color-warning)',
              marginBottom: 8,
              margin: '0 0 8px',
            }}>
              Needs PE
            </h3>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
              {capability.needsPE.map((item) => (
                <li
                  key={item}
                  style={{ fontSize: 13, color: 'var(--color-muted)', padding: '3px 0' }}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Customer Availability */}
      {capability.customerAvailability && capability.customerAvailability.length > 0 && (
        <div style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--color-text)', marginBottom: 12, margin: '0 0 12px' }}>
            Customer Availability
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {capability.customerAvailability.map((c) => (
              <AvailabilityRow key={c.customer} item={c} />
            ))}
          </div>
        </div>
      )}

      {/* Partner Dependencies */}
      {capability.partnerDeps && capability.partnerDeps.length > 0 && (
        <div style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--color-text)', marginBottom: 12, margin: '0 0 12px' }}>
            Partner Dependencies
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {capability.partnerDeps.map((dep) => (
              <PartnerDepRow key={dep.partner_id} dep={dep} />
            ))}
          </div>
        </div>
      )}

      {/* CTAs */}
      {capability.ctas && capability.ctas.length > 0 && (
        <div>
          <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--color-text)', marginBottom: 12, margin: '0 0 12px' }}>
            Actions
          </h2>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {capability.ctas.map((cta) => (
              <button
                key={cta.label}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '8px 16px',
                  borderRadius: 8,
                  border: cta.type === 'intake'
                    ? '1px solid var(--color-accent)'
                    : '1px solid var(--color-border)',
                  background: cta.type === 'intake'
                    ? 'var(--color-accent-dim)'
                    : 'var(--color-surface)',
                  color: cta.type === 'intake'
                    ? 'var(--color-accent-text)'
                    : 'var(--color-muted)',
                  fontSize: 13,
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                {cta.label}
                <span style={{ fontSize: 12 }}>{cta.type === 'external' ? '↗' : '→'}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
