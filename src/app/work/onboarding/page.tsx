import Link from 'next/link';

const tracks = [
  {
    id: 'pe',
    label: 'Track A — PE Team Member',
    accent: 'var(--color-accent)',
    description: 'You just joined the Platform Engineering team.',
    steps: [
      { title: 'Access & tooling', detail: 'Jira, Bitbucket, Concourse, AWS SSO, kubectl' },
      { title: 'Read Waypoint', detail: 'Start here — capabilities, partners, projects' },
      { title: 'Understand the planes', detail: 'Compute, Infra CI/CD, App CI/CD — who owns what' },
      { title: 'Shadow support rotation', detail: 'One week shadowing before going primary' },
      { title: 'Pick a starter project', detail: 'Assigned by tech lead, pairs with a buddy' },
      { title: 'First retro', detail: 'Attend sprint retro within first 2 weeks' },
    ],
  },
  {
    id: 'dev',
    label: 'Track B — Platform Consumer',
    accent: 'var(--color-info)',
    description: 'You\'re a developer or team that uses our platform.',
    steps: [
      { title: 'Browse capabilities', detail: 'See what the platform offers → /capabilities' },
      { title: 'Check your availability', detail: 'Which capabilities are adopted for your team' },
      { title: 'Learn how to engage', detail: 'Intake process, SLAs, and triage → /engage' },
      { title: 'Meet your PE contacts', detail: 'Who to reach out to for your domain' },
      { title: 'Explore self-service', detail: 'What you can do without filing a request' },
    ],
  },
];

export default function OnboardingPage() {
  return (
    <div style={{ paddingTop: 24, maxWidth: 900, margin: '0 auto', padding: '24px 24px 0' }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.03em', marginBottom: 8 }}>
        Onboarding
      </h1>
      <p style={{ fontSize: 15, color: 'var(--color-muted)', marginBottom: 32 }}>
        Two tracks depending on who you are.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
        {tracks.map((track) => (
          <div
            key={track.id}
            style={{
              padding: 24,
              borderRadius: 12,
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
            }}
          >
            <h2 style={{ fontSize: 18, fontWeight: 600, color: track.accent, margin: '0 0 4px' }}>
              {track.label}
            </h2>
            <p style={{ fontSize: 14, color: 'var(--color-muted)', margin: '0 0 16px' }}>
              {track.description}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {track.steps.map((step, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    gap: 12,
                    padding: '10px 0',
                    borderTop: i > 0 ? '1px solid var(--color-border)' : undefined,
                  }}
                >
                  <span
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: '50%',
                      background: track.accent,
                      color: 'var(--color-bg)',
                      fontSize: 12,
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    {i + 1}
                  </span>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--color-text)' }}>{step.title}</div>
                    <div style={{ fontSize: 13, color: 'var(--color-muted)' }}>{step.detail}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
