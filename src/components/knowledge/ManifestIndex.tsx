import Badge from '@/components/ui/badge';
import Table, { TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';

interface DocEntry {
  id: string;
  title: string;
  type: string;
  plane: string;
  status: string;
  url: string;
  last_reviewed: string;
}

interface ManifestIndexProps {
  docs: DocEntry[];
}

const statusVariant: Record<string, { variant: 'success' | 'warning' | 'info'; label: string }> = {
  current: { variant: 'success', label: 'Current' },
  'needs-review': { variant: 'warning', label: 'Needs Review' },
  draft: { variant: 'info', label: 'Draft' },
};

export default function ManifestIndex({ docs }: ManifestIndexProps) {
  if (!docs || docs.length === 0) {
    return (
      <p style={{ color: 'var(--color-muted)', fontSize: 14 }}>
        No documents registered in the manifest.
      </p>
    );
  }

  return (
    <Table>
      <TableHeader>
        <tr>
          <TableHead>Document</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Plane</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Reviewed</TableHead>
        </tr>
      </TableHeader>
      <TableBody>
        {docs.map((doc, i) => {
          const st = statusVariant[doc.status] ?? { variant: 'info' as const, label: doc.status };
          return (
            <TableRow key={doc.id} zebra={i % 2 === 1}>
              <TableCell>
                <a
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: 'var(--color-text)',
                    textDecoration: 'none',
                    transition: 'color 0.15s ease',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color = 'var(--color-accent-text)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color = 'var(--color-text)';
                  }}
                >
                  {doc.title} ↗
                </a>
              </TableCell>
              <TableCell>
                <span
                  style={{
                    fontSize: 12,
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--color-muted)',
                  }}
                >
                  {doc.type}
                </span>
              </TableCell>
              <TableCell>
                <span
                  style={{
                    fontSize: 12,
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--color-muted)',
                  }}
                >
                  {doc.plane}
                </span>
              </TableCell>
              <TableCell>
                <Badge variant={st.variant}>{st.label}</Badge>
              </TableCell>
              <TableCell>
                <span
                  style={{
                    fontSize: 12,
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--color-subtle)',
                  }}
                >
                  {doc.last_reviewed}
                </span>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

export type { DocEntry, ManifestIndexProps };
