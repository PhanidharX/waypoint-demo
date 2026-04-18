'use client';

import { useState } from 'react';
import type { Capability } from '@/lib/types';
import CapabilityRow from './CapabilityRow';
import CapabilityDetail from './CapabilityDetail';

interface CapabilityListProps {
  capabilities: Capability[];
}

export default function CapabilityList({ capabilities }: CapabilityListProps) {
  const [selectedId, setSelectedId] = useState<string>(capabilities[0]?.id ?? '');
  const selected = capabilities.find((c) => c.id === selectedId) ?? capabilities[0];

  return (
    <div style={{ display: 'flex', gap: 0, minHeight: 'calc(100vh - 160px)' }}>
      {/* Left panel */}
      <nav
        style={{
          width: 320,
          flexShrink: 0,
          borderRight: '1px solid var(--color-border)',
          padding: '16px 8px',
          position: 'sticky',
          top: 80,
          alignSelf: 'flex-start',
          maxHeight: 'calc(100vh - 100px)',
          overflowY: 'auto',
        }}
      >
        <div
          style={{
            fontSize: 11,
            fontFamily: 'var(--font-mono)',
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: 'var(--color-subtle)',
            padding: '8px 16px 12px',
          }}
        >
          Capabilities
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {capabilities.map((cap) => (
            <CapabilityRow
              key={cap.id}
              capability={cap}
              isSelected={cap.id === selectedId}
              onClick={() => setSelectedId(cap.id)}
            />
          ))}
        </div>
      </nav>

      {/* Right panel */}
      <main style={{ flex: 1, padding: '16px 40px' }}>
        {selected && <CapabilityDetail capability={selected} />}
      </main>
    </div>
  );
}
