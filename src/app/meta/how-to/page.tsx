import { listDocs } from '@/lib/docs';
import DocSectionPage from '@/components/shared/DocSectionPage';

export default function HowToPage() {
  const entries = listDocs('how-to');
  return (
    <DocSectionPage
      title="How-to"
      description="Task-oriented recipes for specific goals."
      basePath="/meta/how-to"
      entries={entries}
    />
  );
}
