import { readYaml } from '@/lib/yaml';
import type { Project } from '@/lib/types';
import ProjectTable from '@/components/projects/ProjectTable';

export default function ProjectsPage() {
  const { projects } = readYaml<{ projects: Project[] }>('projects.yaml');

  return (
    <div style={{ paddingTop: 24, maxWidth: 1100, margin: '0 auto', padding: '24px 24px 0' }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.03em', marginBottom: 8 }}>
        Projects
      </h1>
      <p style={{ fontSize: 15, color: 'var(--color-muted)', marginBottom: 32 }}>
        Active work across IDP delivery cycles and ongoing operational tracks.
      </p>
      <ProjectTable projects={projects} />
    </div>
  );
}
