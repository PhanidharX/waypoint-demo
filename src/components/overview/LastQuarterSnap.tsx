import Card, { CardHeader, CardContent } from '@/components/ui/card';

interface LastQuarterSnapProps {
  highlights: string[];
  improvements: string[];
}

export default function LastQuarterSnap({ highlights, improvements }: LastQuarterSnapProps) {
  return (
    <Card hover={false}>
      <CardHeader>
        <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>Last Quarter Snapshot</h2>
      </CardHeader>
      <CardContent>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 32,
          }}
        >
          {/* Highlights column */}
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                marginBottom: 12,
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: 'var(--color-accent)',
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontSize: 13,
                  fontFamily: 'var(--font-mono)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  fontWeight: 600,
                  color: 'var(--color-accent-text)',
                }}
              >
                Highlights
              </span>
            </div>
            <ul
              style={{
                margin: 0,
                padding: '0 0 0 20px',
                listStyle: 'none',
              }}
            >
              {highlights.map((item, i) => (
                <li
                  key={i}
                  style={{
                    position: 'relative',
                    fontSize: 14,
                    color: 'var(--color-text)',
                    lineHeight: 1.6,
                    paddingLeft: 4,
                    marginBottom: 6,
                  }}
                >
                  <span
                    style={{
                      position: 'absolute',
                      left: -16,
                      color: 'var(--color-accent-text)',
                    }}
                  >
                    -
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Improvements column */}
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                marginBottom: 12,
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: 'var(--color-warning)',
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontSize: 13,
                  fontFamily: 'var(--font-mono)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  fontWeight: 600,
                  color: 'var(--color-warning)',
                }}
              >
                Improvements
              </span>
            </div>
            <ul
              style={{
                margin: 0,
                padding: '0 0 0 20px',
                listStyle: 'none',
              }}
            >
              {improvements.map((item, i) => (
                <li
                  key={i}
                  style={{
                    position: 'relative',
                    fontSize: 14,
                    color: 'var(--color-text)',
                    lineHeight: 1.6,
                    paddingLeft: 4,
                    marginBottom: 6,
                  }}
                >
                  <span
                    style={{
                      position: 'absolute',
                      left: -16,
                      color: 'var(--color-warning)',
                    }}
                  >
                    -
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export type { LastQuarterSnapProps };
