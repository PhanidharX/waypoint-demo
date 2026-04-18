import type { CustomerAvailability } from '@/lib/types';

const stateColors: Record<string, string> = {
  adopted: '#10b981',
  partial: '#fbbf24',
  available: '#38bdf8',
  not_offered: '#71717a',
};

const stateLabels: Record<string, string> = {
  adopted: 'Adopted',
  partial: 'Partial',
  available: 'Available',
  not_offered: 'Not offered',
};

interface AvailabilityRowProps {
  item: CustomerAvailability;
}

export default function AvailabilityRow({ item }: AvailabilityRowProps) {
  const color = stateColors[item.state] ?? '#71717a';
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '8px 0' }}>
      <span
        style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: color,
          flexShrink: 0,
          marginTop: 5,
        }}
      />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--color-text)' }}>
            {item.customer}
          </span>
          <span
            style={{
              fontSize: 11,
              fontFamily: 'var(--font-mono)',
              color,
              letterSpacing: '0.02em',
            }}
          >
            {stateLabels[item.state]}
          </span>
        </div>
        <div style={{ fontSize: 13, color: 'var(--color-muted)', marginTop: 2 }}>
          {item.note}
        </div>
        {item.variants_adopted && item.variants_adopted.length > 0 && (
          <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginTop: 4 }}>
            {item.variants_adopted.map((v) => (
              <span
                key={v}
                style={{
                  fontSize: 11,
                  fontFamily: 'var(--font-mono)',
                  padding: '1px 6px',
                  borderRadius: 4,
                  background: 'var(--color-accent-dim)',
                  color: 'var(--color-accent-text)',
                }}
              >
                {v}
              </span>
            ))}
            {item.variants_available?.map((v) => (
              <span
                key={v}
                style={{
                  fontSize: 11,
                  fontFamily: 'var(--font-mono)',
                  padding: '1px 6px',
                  borderRadius: 4,
                  background: 'var(--color-info-dim)',
                  color: 'var(--color-info)',
                }}
              >
                {v}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
