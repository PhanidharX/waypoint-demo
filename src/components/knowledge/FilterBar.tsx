'use client';

interface FilterBarProps {
  categories: string[];
  statuses: string[];
  selectedCategory: string | null;
  selectedStatus: string | null;
  onCategoryChange: (category: string | null) => void;
  onStatusChange: (status: string | null) => void;
}

function Pill({
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
        display: 'inline-flex',
        alignItems: 'center',
        padding: '4px 12px',
        borderRadius: 9999,
        fontSize: 12,
        fontFamily: 'var(--font-sans)',
        fontWeight: 500,
        border: active ? '1px solid var(--color-border-hover)' : '1px solid var(--color-border)',
        background: active ? 'var(--color-surface-high)' : 'transparent',
        color: active ? 'var(--color-text)' : 'var(--color-muted)',
        cursor: 'pointer',
        transition: 'all 0.15s ease',
        whiteSpace: 'nowrap',
      }}
      onMouseEnter={(e) => {
        if (!active) {
          (e.currentTarget as HTMLElement).style.background = 'var(--color-surface-high)';
          (e.currentTarget as HTMLElement).style.color = 'var(--color-text)';
        }
      }}
      onMouseLeave={(e) => {
        if (!active) {
          (e.currentTarget as HTMLElement).style.background = 'transparent';
          (e.currentTarget as HTMLElement).style.color = 'var(--color-muted)';
        }
      }}
    >
      {label}
    </button>
  );
}

export default function FilterBar({
  categories,
  statuses,
  selectedCategory,
  selectedStatus,
  onCategoryChange,
  onStatusChange,
}: FilterBarProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {/* Category pills */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
        <span
          style={{
            fontSize: 11,
            fontFamily: 'var(--font-mono)',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            color: 'var(--color-subtle)',
            marginRight: 4,
          }}
        >
          Type
        </span>
        <Pill
          label="All"
          active={selectedCategory === null}
          onClick={() => onCategoryChange(null)}
        />
        {categories.map((cat) => (
          <Pill
            key={cat}
            label={cat}
            active={selectedCategory === cat}
            onClick={() => onCategoryChange(selectedCategory === cat ? null : cat)}
          />
        ))}
      </div>

      {/* Status pills */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
        <span
          style={{
            fontSize: 11,
            fontFamily: 'var(--font-mono)',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            color: 'var(--color-subtle)',
            marginRight: 4,
          }}
        >
          Status
        </span>
        <Pill
          label="All"
          active={selectedStatus === null}
          onClick={() => onStatusChange(null)}
        />
        {statuses.map((st) => (
          <Pill
            key={st}
            label={st}
            active={selectedStatus === st}
            onClick={() => onStatusChange(selectedStatus === st ? null : st)}
          />
        ))}
      </div>
    </div>
  );
}

export type { FilterBarProps };
