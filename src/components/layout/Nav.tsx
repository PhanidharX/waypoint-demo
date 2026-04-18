'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const marketingLinks = [
  { label: 'Capabilities', href: '/capabilities' },
  { label: 'Partners', href: '/partners' },
  { label: 'How to Engage', href: '/engage' },
  { label: 'Overview', href: '/overview' },
];

const workLinks = [
  { label: 'Dashboard', href: '/work' },
  { label: 'Projects', href: '/work/projects' },
  { label: 'Team', href: '/work/team' },
  { label: 'Retro', href: '/work/retro' },
  { label: 'Knowledge', href: '/work/knowledge' },
];

const metaLinks = [
  { label: 'Tutorials', href: '/meta/tutorials' },
  { label: 'How-to', href: '/meta/how-to' },
  { label: 'Reference', href: '/meta/reference' },
  { label: 'Explanation', href: '/meta/explanation' },
  { label: 'Decisions', href: '/meta/decisions' },
];

const teams = [
  { id: 'pe', label: 'Platform Engineering', short: 'PE' },
  { id: 'data-platform', label: 'Data Platform', short: 'DP' },
];

const otherTeamUrl = process.env.NEXT_PUBLIC_OTHER_TEAM_URL || null;

interface NavProps {
  teamName: string;
  onToggleTheme: () => void;
  isDark: boolean;
}

export default function Nav({ teamName, onToggleTheme, isDark }: NavProps) {
  const pathname = usePathname();
  const [switcherOpen, setSwitcherOpen] = useState(false);

  const isWork = pathname.startsWith('/work');
  const isMeta = pathname.startsWith('/meta');
  const links = isMeta ? metaLinks : isWork ? workLinks : marketingLinks;

  const currentTeamId = process.env.NEXT_PUBLIC_TEAM === 'data-platform' ? 'data-platform' : 'pe';
  const currentTeam = teams.find((t) => t.id === currentTeamId) ?? teams[0];

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        height: 56,
        display: 'flex',
        alignItems: 'center',
        padding: '0 24px',
        background: 'var(--color-bg)',
        borderBottom: '1px solid var(--color-border)',
        backdropFilter: 'blur(12px)',
      }}
    >
      {/* Logo / Home */}
      <Link
        href="/"
        style={{
          fontSize: 15,
          fontWeight: 700,
          color: 'var(--color-text)',
          textDecoration: 'none',
          letterSpacing: '-0.02em',
          marginRight: 12,
          flexShrink: 0,
        }}
      >
        {teamName}
      </Link>

      {/* Team switcher */}
      <div style={{ position: 'relative', marginRight: 20, flexShrink: 0 }}>
        <button
          onClick={() => setSwitcherOpen(!switcherOpen)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            fontSize: 11,
            fontFamily: 'var(--font-mono)',
            color: 'var(--color-subtle)',
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: 6,
            padding: '3px 8px',
            cursor: 'pointer',
            transition: 'color 0.15s ease, border-color 0.15s ease',
          }}
          aria-label="Switch team"
        >
          {currentTeam.short}
          <span style={{ fontSize: 9 }}>▾</span>
        </button>

        {switcherOpen && (
          <>
            <div
              style={{ position: 'fixed', inset: 0, zIndex: 60 }}
              onClick={() => setSwitcherOpen(false)}
            />
            <div
              style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                marginTop: 4,
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 8,
                padding: 4,
                minWidth: 200,
                zIndex: 70,
                boxShadow: 'var(--shadow)',
              }}
            >
              <div style={{
                padding: '6px 10px',
                fontSize: 10,
                fontFamily: 'var(--font-mono)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'var(--color-subtle)',
              }}>
                Meridian Corp Teams
              </div>
              {teams.map((team) => (
                <div
                  key={team.id}
                  style={{
                    padding: '8px 10px',
                    fontSize: 13,
                    color: team.id === currentTeamId ? 'var(--color-accent-text)' : 'var(--color-text)',
                    borderRadius: 6,
                    cursor: team.id === currentTeamId ? 'default' : otherTeamUrl ? 'pointer' : 'default',
                    opacity: team.id !== currentTeamId && !otherTeamUrl ? 0.5 : 1,
                    background: team.id === currentTeamId ? 'var(--color-accent-dim)' : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                  onClick={() => {
                    if (team.id !== currentTeamId && otherTeamUrl) {
                      window.location.href = otherTeamUrl;
                    }
                    setSwitcherOpen(false);
                  }}
                >
                  <span>{team.label}</span>
                  {team.id === currentTeamId && (
                    <span style={{ fontSize: 11, color: 'var(--color-accent-text)' }}>current</span>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Nav links */}
      <nav style={{ display: 'flex', alignItems: 'center', gap: 4, flex: 1 }}>
        {links.map((link) => {
          const isActive = pathname === link.href ||
            (link.href !== '/work' && pathname.startsWith(link.href));

          return (
            <Link
              key={link.href}
              href={link.href}
              style={{
                fontSize: 13,
                fontWeight: isActive ? 500 : 400,
                color: isActive ? 'var(--color-text)' : 'var(--color-muted)',
                textDecoration: 'none',
                padding: '6px 12px',
                borderRadius: 6,
                background: isActive ? 'var(--color-surface-high)' : 'transparent',
                transition: 'color 0.15s ease, background 0.15s ease',
              }}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      {/* Theme toggle */}
      <button
        onClick={onToggleTheme}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 32,
          height: 32,
          borderRadius: 6,
          border: '1px solid var(--color-border)',
          background: 'transparent',
          color: 'var(--color-muted)',
          cursor: 'pointer',
          fontSize: 16,
          transition: 'background 0.15s ease, color 0.15s ease',
          flexShrink: 0,
        }}
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {isDark ? '☀' : '☾'}
      </button>
    </header>
  );
}
