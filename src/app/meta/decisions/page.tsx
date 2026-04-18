import { listDocs } from '@/lib/docs';
import DocSectionPage from '@/components/shared/DocSectionPage';

export default function DecisionsPage() {
  const entries = listDocs('decisions');
  return (
    <DocSectionPage
      title="Decisions"
      description="Architecture Decision Records (ADRs)."
      basePath="/meta/decisions"
      entries={entries}
    />
  );
}
