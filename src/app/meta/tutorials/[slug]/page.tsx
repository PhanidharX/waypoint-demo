import { readDoc, listDocs } from '@/lib/docs';
import MarkdownRenderer from '@/components/shared/MarkdownRenderer';
import Link from 'next/link';

export function generateStaticParams() {
  return listDocs('tutorials').map((e) => ({ slug: e.slug }));
}

export default async function TutorialPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const content = readDoc('tutorials', slug);

  return (
    <div style={{ paddingTop: 24, maxWidth: 760, margin: '0 auto', padding: '24px 24px 0' }}>
      <Link href="/meta/tutorials" style={{ fontSize: 12, color: 'var(--color-subtle)', textDecoration: 'none', marginBottom: 16, display: 'block' }}>
        ← Back to Tutorials
      </Link>
      <MarkdownRenderer content={content} />
    </div>
  );
}
