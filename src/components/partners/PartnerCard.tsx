'use client';

import type { Partner } from '@/lib/types';
import SORLink from '@/components/shared/SORLink';

interface PartnerCardProps {
  partner: Partner;
}

export default function PartnerCard({ partner }: PartnerCardProps) {
  return (
    <div
      style={{
        padding: 24,
        borderRadius: 12,
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow)',
        transition: 'transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.2s ease',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.transform = 'translateY(-3px)';
        el.style.boxShadow = 'var(--shadow-hover)';
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.transform = 'translateY(0)';
        el.style.boxShadow = 'var(--shadow)';
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
        <h3 style={{ fontSize: 16, fontWeight: 600, color: 'var(--color-text)', margin: 0, flex: 1 }}>
          {partner.name}
        </h3>
        {partner.isCustomer && (
          <span
            style={{
              fontSize: 10,
              fontFamily: 'var(--font-mono)',
              fontWeight: 500,
              padding: '2px 6px',
              borderRadius: 4,
              background: 'var(--color-info-dim)',
              color: 'var(--color-info)',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
            }}
          >
            Also a customer
          </span>
        )}
      </div>

      <div
        style={{
          fontSize: 11,
          fontFamily: 'var(--font-mono)',
          color: 'var(--color-subtle)',
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          marginBottom: 12,
        }}
      >
        {partner.area}
      </div>

      <p style={{ fontSize: 14, color: 'var(--color-muted)', lineHeight: 1.6, margin: '0 0 16px' }}>
        {partner.desc}
      </p>

      {/* What we consume */}
      <div style={{ marginBottom: 16 }}>
        <div
          style={{
            fontSize: 11,
            fontFamily: 'var(--font-mono)',
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            color: 'var(--color-accent-text)',
            marginBottom: 6,
          }}
        >
          What we consume
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          {partner.whatWeConsume.map((item) => (
            <span
              key={item}
              style={{
                fontSize: 12,
                padding: '2px 8px',
                borderRadius: 4,
                background: 'var(--color-surface-high)',
                color: 'var(--color-muted)',
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Engagement + Cycle */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
        <div>
          <div style={{ fontSize: 11, color: 'var(--color-subtle)', marginBottom: 2 }}>Engagement</div>
          <div style={{ fontSize: 13, color: 'var(--color-muted)' }}>{partner.engagementProcess}</div>
        </div>
        <div>
          <div style={{ fontSize: 11, color: 'var(--color-subtle)', marginBottom: 2 }}>Their cycle</div>
          <div style={{ fontSize: 13, color: 'var(--color-muted)' }}>{partner.theirCycle}</div>
        </div>
      </div>

      {/* Footer links */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        {partner.sor_ref && <SORLink sor={partner.sor_ref} />}
        {partner.spaceLink && (
          <span style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--color-subtle)' }}>
            {partner.spaceLink}
          </span>
        )}
      </div>
    </div>
  );
}
