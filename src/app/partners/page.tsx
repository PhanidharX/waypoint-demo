import { readYaml } from '@/lib/yaml';
import type { Partner } from '@/lib/types';
import PartnerCard from '@/components/partners/PartnerCard';

export default function PartnersPage() {
  const { partners } = readYaml<{ partners: Partner[] }>('partners.yaml');

  return (
    <div style={{ paddingTop: 24, maxWidth: 1000, margin: '0 auto', padding: '24px 24px 0' }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.03em', marginBottom: 8 }}>
        Partners
      </h1>
      <p style={{ fontSize: 15, color: 'var(--color-muted)', marginBottom: 32, maxWidth: 600 }}>
        Teams we depend on and collaborate with. Engagement is PE-mediated unless noted otherwise.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
        {partners.map((p) => (
          <PartnerCard key={p.id} partner={p} />
        ))}
      </div>
    </div>
  );
}
