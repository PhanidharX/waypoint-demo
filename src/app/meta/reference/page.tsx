import { listDocs } from '@/lib/docs';
import DocSectionPage from '@/components/shared/DocSectionPage';

export default function ReferencePage() {
  const entries = listDocs('reference');
  return (
    <DocSectionPage
      title="Reference"
      description="Technical descriptions of schemas, APIs, and configuration."
      basePath="/meta/reference"
      entries={entries}
    />
  );
}
