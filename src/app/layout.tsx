import type { Metadata } from 'next';
import { readYaml } from '@/lib/yaml';
import BaseLayout from '@/components/layout/BaseLayout';
import '../styles/global.css';

export const metadata: Metadata = {
  title: 'Waypoint',
  description: 'Team operating system',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const config = readYaml<{ team_name: string }>('config.yaml');

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <BaseLayout teamName={config.team_name}>
          {children}
        </BaseLayout>
      </body>
    </html>
  );
}
