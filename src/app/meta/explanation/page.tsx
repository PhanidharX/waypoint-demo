import { listDocs } from '@/lib/docs';
import DocSectionPage from '@/components/shared/DocSectionPage';

export default function ExplanationPage() {
  const entries = listDocs('explanation');
  return (
    <DocSectionPage
      title="Explanation"
      description="Background context and architectural thinking."
      basePath="/meta/explanation"
      entries={entries}
    />
  );
}
