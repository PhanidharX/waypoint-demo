interface PipelineEmbedProps {
  pipelineName?: string;
}

// TODO: Phase 2 — Replace with actual pipeline visualization
// using Concourse visual language (job boxes, resource circles).
// Concourse state colors: idle #3d3d3d, pending #8b572a,
// running #f5a623, succeeded #11c560, failed #ed4b35
// Resource circles: git #f5a623, docker-image #38bdf8, s3 #fbbf24, slack #10b981

export default function PipelineEmbed({ pipelineName }: PipelineEmbedProps) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 120,
        padding: 24,
        borderRadius: 12,
        border: '1px dashed var(--color-border)',
        background: 'var(--color-surface)',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <div
          style={{
            fontSize: 11,
            fontFamily: 'var(--font-mono)',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            color: 'var(--color-subtle)',
            marginBottom: 8,
          }}
        >
          Pipeline Visualization
        </div>
        <div style={{ fontSize: 13, color: 'var(--color-muted)' }}>
          {pipelineName ? `${pipelineName} — ` : ''}Phase 2
        </div>
      </div>
    </div>
  );
}

export type { PipelineEmbedProps };
