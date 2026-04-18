import Card, { CardHeader, CardContent } from '@/components/ui/card';

interface QuarterSummaryProps {
  quarter: string;
  projectCount: number;
  completedCount: number;
  scopeCreepTotal: number;
}

export default function QuarterSummary({
  quarter,
  projectCount,
  completedCount,
  scopeCreepTotal,
}: QuarterSummaryProps) {
  const completionRate = projectCount > 0 ? Math.round((completedCount / projectCount) * 100) : 0;

  return (
    <Card hover={false}>
      <CardHeader>
        <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>{quarter} Summary</h2>
      </CardHeader>
      <CardContent>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
            gap: 24,
          }}
        >
          {/* Total projects */}
          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                fontSize: 28,
                fontWeight: 700,
                color: 'var(--color-text)',
                lineHeight: 1.2,
              }}
            >
              {projectCount}
            </div>
            <div
              style={{
                fontSize: 11,
                fontFamily: 'var(--font-mono)',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                color: 'var(--color-subtle)',
                marginTop: 4,
              }}
            >
              Projects
            </div>
          </div>

          {/* Completed */}
          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                fontSize: 28,
                fontWeight: 700,
                color: 'var(--color-accent-text)',
                lineHeight: 1.2,
              }}
            >
              {completedCount}
            </div>
            <div
              style={{
                fontSize: 11,
                fontFamily: 'var(--font-mono)',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                color: 'var(--color-subtle)',
                marginTop: 4,
              }}
            >
              Completed
            </div>
          </div>

          {/* Completion rate */}
          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                fontSize: 28,
                fontWeight: 700,
                color: 'var(--color-text)',
                lineHeight: 1.2,
              }}
            >
              {completionRate}%
            </div>
            <div
              style={{
                fontSize: 11,
                fontFamily: 'var(--font-mono)',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                color: 'var(--color-subtle)',
                marginTop: 4,
              }}
            >
              Completion
            </div>
          </div>

          {/* Scope creep */}
          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                fontSize: 28,
                fontWeight: 700,
                color: scopeCreepTotal > 0 ? 'var(--color-warning)' : 'var(--color-accent-text)',
                lineHeight: 1.2,
              }}
            >
              {scopeCreepTotal}
            </div>
            <div
              style={{
                fontSize: 11,
                fontFamily: 'var(--font-mono)',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                color: 'var(--color-subtle)',
                marginTop: 4,
              }}
            >
              Scope Creep
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export type { QuarterSummaryProps };
