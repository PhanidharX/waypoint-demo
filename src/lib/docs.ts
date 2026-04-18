import fs from 'fs';
import path from 'path';

const DOCS_DIR = path.join(process.cwd(), 'docs');

export interface DocEntry {
  slug: string;
  title: string;
  status: 'done' | 'partial' | 'stub';
}

export interface DocSection {
  id: string;
  name: string;
  description: string;
  href: string;
  entries: DocEntry[];
}

function slugToTitle(slug: string): string {
  return slug
    .replace(/^\d+-/, '')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function detectStatus(content: string): DocEntry['status'] {
  const trimmed = content.trim();
  const lines = trimmed.split('\n').filter((l) => l.trim().length > 0);
  if (lines.length <= 2 || trimmed.includes('TODO')) return 'stub';
  if (lines.length < 10) return 'partial';
  return 'done';
}

export function listDocs(section: string): DocEntry[] {
  const dir = path.join(DOCS_DIR, section);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .sort()
    .map((f) => {
      const slug = f.replace(/\.md$/, '');
      const content = fs.readFileSync(path.join(dir, f), 'utf8');
      const titleMatch = content.match(/^#\s+(.+)/m);
      return {
        slug,
        title: titleMatch?.[1] ?? slugToTitle(slug),
        status: detectStatus(content),
      };
    });
}

export function readDoc(section: string, slug: string): string {
  const filePath = path.join(DOCS_DIR, section, `${slug}.md`);
  if (!fs.existsSync(filePath)) return '# Not Found\n\nThis document does not exist yet.';
  return fs.readFileSync(filePath, 'utf8');
}

export function getAllSections(): DocSection[] {
  return [
    {
      id: 'tutorials',
      name: 'Tutorials',
      description: 'Learning-oriented guides that walk you through a task step by step.',
      href: '/meta/tutorials',
      entries: listDocs('tutorials'),
    },
    {
      id: 'how-to',
      name: 'How-to',
      description: 'Task-oriented recipes for specific goals.',
      href: '/meta/how-to',
      entries: listDocs('how-to'),
    },
    {
      id: 'reference',
      name: 'Reference',
      description: 'Technical descriptions of schemas, APIs, and configuration.',
      href: '/meta/reference',
      entries: listDocs('reference'),
    },
    {
      id: 'explanation',
      name: 'Explanation',
      description: 'Background context and architectural thinking.',
      href: '/meta/explanation',
      entries: listDocs('explanation'),
    },
    {
      id: 'decisions',
      name: 'Decisions',
      description: 'Architecture Decision Records (ADRs).',
      href: '/meta/decisions',
      entries: listDocs('decisions'),
    },
  ];
}
