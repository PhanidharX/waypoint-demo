import Card, { CardHeader, CardContent } from '@/components/ui/card';

interface HealthItem {
  label: string;
  value: string | number;
  status: 'ok' | 'warning' | 'critical' | 'info';
}

interface PlatformHealthProps {
  stats: HealthItem[];
}

const statusDotColor: Record<string, string> = {
  ok: 'var(--color-accent)',
  warning: 'var(--color-warning)',
  critical: 'var(--color-critical)',
  info: 'var(--color-info)',
};

export default function PlatformHealth({ stats }: PlatformHealthProps) {
  if (!stats || stats.length === 0) return null;

  return (
    <Card hover={false}>
      <CardHeader>
        <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>Platform Health</h2>
      </CardHeader>
      <CardContent>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
            gap: 16,
          }}
        >
          {stats.map((item) => (
            <div
              key={item.label}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '12px 16px',
                borderRadius: 8,
                background: 'var(--color-surface-high)',
                border: '1px solid var(--color-border)',
              }}
            >
              {/* Status dot */}
              <span
                className={item.status === 'critical' ? 'pulse' : undefined}
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: statusDotColor[item.status] ?? statusDotColor.info,
                  flexShrink: 0,
                }}
              />
              <div style={{ minWidth: 0 }}>
                <div
                  style={{
                    fontSize: 15,
                    fontWeight: 600,
                    color: 'var(--color-text)',
                    lineHeight: 1.2,
                  }}
                >
                  {item.value}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    fontFamily: 'var(--font-mono)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    color: 'var(--color-subtle)',
                    marginTop: 2,
                  }}
                >
                  {item.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export type { HealthItem, PlatformHealthProps };
