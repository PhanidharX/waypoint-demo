'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Nav from './Nav';

interface BaseLayoutProps {
  teamName: string;
  children: React.ReactNode;
}

const workPageNames: Record<string, string> = {
  '/work': 'Dashboard',
  '/work/projects': 'Projects',
  '/work/team': 'Team',
  '/work/retro': 'Retro',
  '/work/knowledge': 'Knowledge',
  '/work/onboarding': 'Onboarding',
  '/work/rituals': 'Rituals',
  '/work/idp': 'IDP Status',
};

export default function BaseLayout({ teamName, children }: BaseLayoutProps) {
  const pathname = usePathname();
  const isWork = pathname.startsWith('/work');

  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('waypoint-theme');
    if (stored === 'light') {
      setIsDark(false);
      document.documentElement.classList.add('light');
    }
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    if (next) {
      document.documentElement.classList.remove('light');
      localStorage.setItem('waypoint-theme', 'dark');
    } else {
      document.documentElement.classList.add('light');
      localStorage.setItem('waypoint-theme', 'light');
    }
  };

  const pageName = workPageNames[pathname];

  return (
    <>
      <Nav teamName={teamName} onToggleTheme={toggleTheme} isDark={isDark} />

      {/* Breadcrumbs for /work zone */}
      {isWork && pageName && (
        <div
          style={{
            position: 'fixed',
            top: 56,
            left: 0,
            right: 0,
            zIndex: 40,
            padding: '8px 24px',
            background: 'var(--color-bg)',
            borderBottom: '1px solid var(--color-border)',
          }}
        >
          <nav style={{ fontSize: 12, color: 'var(--color-subtle)', display: 'flex', alignItems: 'center', gap: 6 }}>
            <Link href="/" style={{ color: 'var(--color-subtle)', textDecoration: 'none' }}>
              Waypoint
            </Link>
            <span>›</span>
            <Link href="/work" style={{ color: 'var(--color-subtle)', textDecoration: 'none' }}>
              Work
            </Link>
            {pathname !== '/work' && (
              <>
                <span>›</span>
                <span style={{ color: 'var(--color-muted)' }}>{pageName}</span>
              </>
            )}
          </nav>
        </div>
      )}

      {/* Main content */}
      <div style={{ paddingTop: isWork && pageName ? 88 : 56 }}>
        {children}
      </div>

      {/* Footer */}
      <footer
        style={{
          padding: '32px 24px',
          marginTop: 64,
          borderTop: '1px solid var(--color-border)',
          display: 'flex',
          justifyContent: 'center',
          gap: 24,
          fontSize: 13,
        }}
      >
        <Link
          href="/meta"
          className="link-internal"
        >
          About this site
        </Link>
        <a
          href="https://github.com/nondualworks/waypoint-starter"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: 'var(--color-subtle)',
            textDecoration: 'none',
            transition: 'color 0.15s ease',
          }}
        >
          Waypoint Starter ↗
        </a>
      </footer>
    </>
  );
}
