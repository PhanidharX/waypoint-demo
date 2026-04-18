import { readYaml } from '@/lib/yaml';
import type { Capability } from '@/lib/types';
import CapabilityList from '@/components/catalog/CapabilityList';

interface CapabilitiesData {
  capabilities: Capability[];
}

export default function CapabilitiesPage() {
  const data = readYaml<CapabilitiesData>('capabilities/index.yaml');

  return (
    <div style={{ paddingTop: 24 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <CapabilityList capabilities={data.capabilities} />
      </div>
    </div>
  );
}
