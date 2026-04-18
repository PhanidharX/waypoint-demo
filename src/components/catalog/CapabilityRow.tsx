import type { Capability } from '@/lib/types';

interface CapabilityRowProps {
  capability: Capability;
  isSelected: boolean;
  onClick: () => void;
}

export default function CapabilityRow({ capability, isSelected, onClick }: CapabilityRowProps) {
  const adoptedCount = capability.customerAvailability?.filter(
    (c) => c.state === 'adopted'
  ).length ?? 0;
  const totalCount = capability.customerAvailability?.length ?? 0;

  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        width: '100%',
        padding: '12px 16px',
        border: 'none',
        borderRadius: 8,
        background: isSelected ? 'var(--color-surface-high)' : 'transparent',
        cursor: 'pointer',
        textAlign: 'left',
        transition: 'background 0.15s ease',
      }}
      onMouseEnter={(e) => {
        if (!isSelected) e.currentTarget.style.background = 'var(--color-surface-hover)';
      }}
      onMouseLeave={(e) => {
        if (!isSelected) e.currentTarget.style.background = 'transparent';
      }}
    >
      <span style={{ fontSize: 18, lineHeight: 1, flexShrink: 0 }}>{capability.icon}</span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--color-text)' }}>
          {capability.shortName}
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            marginTop: 2,
          }}
        >
          {capability.customerAvailability?.map((c) => (
            <span
              key={c.customer}
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background:
                  c.state === 'adopted'
                    ? '#10b981'
                    : c.state === 'partial'
                      ? '#fbbf24'
                      : c.state === 'available'
                        ? '#38bdf8'
                        : '#71717a',
              }}
              title={`${c.customer}: ${c.state}`}
            />
          ))}
          <span style={{ fontSize: 11, color: 'var(--color-subtle)', marginLeft: 4, fontFamily: 'var(--font-mono)' }}>
            {adoptedCount}/{totalCount}
          </span>
        </div>
      </div>
      {isSelected && (
        <span style={{ color: 'var(--color-accent-text)', fontSize: 14 }}>→</span>
      )}
    </button>
  );
}
