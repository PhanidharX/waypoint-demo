import { listDocs } from '@/lib/docs';
import DocSectionPage from '@/components/shared/DocSectionPage';

export default function TutorialsPage() {
  const entries = listDocs('tutorials');
  return (
    <DocSectionPage
      title="Tutorials"
      description="Learning-oriented guides that walk you through a task step by step."
      basePath="/meta/tutorials"
      entries={entries}
    />
  );
}
