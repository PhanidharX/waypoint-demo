import { readDoc, listDocs } from '@/lib/docs';
import MarkdownRenderer from '@/components/shared/MarkdownRenderer';
import Link from 'next/link';

export function generateStaticParams() {
  return listDocs('decisions').map((e) => ({ slug: e.slug }));
}

export default async function DecisionDocPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const content = readDoc('decisions', slug);

  return (
    <div style={{ paddingTop: 24, maxWidth: 760, margin: '0 auto', padding: '24px 24px 0' }}>
      <Link href="/meta/decisions" style={{ fontSize: 12, color: 'var(--color-subtle)', textDecoration: 'none', marginBottom: 16, display: 'block' }}>
        ← Back to Decisions
      </Link>
      <MarkdownRenderer content={content} />
    </div>
  );
}
