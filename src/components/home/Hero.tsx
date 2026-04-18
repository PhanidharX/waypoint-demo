'use client';

import { useState, useEffect } from 'react';

interface HeroProps {
  teamName: string;
}

export default function Hero({ teamName }: HeroProps) {
  const phrase = 'front door.';
  const [displayed, setDisplayed] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(phrase.slice(0, i));
      if (i >= phrase.length) {
        clearInterval(interval);
        setDone(true);
      }
    }, 65);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!done) return;
    const timeout = setTimeout(() => setShowCursor(false), 1500);
    return () => clearTimeout(timeout);
  }, [done]);

  return (
    <section style={{ textAlign: 'center', padding: '0 24px' }}>
      <h1
        style={{
          fontSize: 48,
          fontWeight: 700,
          letterSpacing: '-0.04em',
          color: 'var(--color-text)',
          margin: '0 0 16px',
          lineHeight: 1.1,
        }}
      >
        {teamName}
      </h1>
      <p
        style={{
          fontSize: 20,
          color: 'var(--color-muted)',
          margin: '0 auto',
          maxWidth: 520,
          lineHeight: 1.5,
        }}
      >
        Your team&rsquo;s{' '}
        <span style={{ color: 'var(--color-accent-text)' }}>
          {displayed}
          {showCursor && (
            <span
              style={{
                display: 'inline-block',
                width: 2,
                height: '1em',
                background: 'var(--color-accent-text)',
                marginLeft: 1,
                verticalAlign: 'text-bottom',
                animation: done ? 'blink 0.8s step-end infinite' : undefined,
              }}
            />
          )}
        </span>
      </p>
      <style>{`
        @keyframes blink {
          50% { opacity: 0; }
        }
      `}</style>
    </section>
  );
}
