'use client';

import { useEffect, useRef, useState } from 'react';

interface StatItem {
  id: string;
  label: string;
  value: number | null;
  prefix?: string;
  suffix?: string;
  celebrate?: boolean;
}

interface StatsBarProps {
  items: StatItem[];
}

function AnimatedStat({ item, delay }: { item: StatItem; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.5 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || item.value === null) return;
    const target = item.value;
    const start = item.celebrate ? target : 0;
    const end = item.celebrate ? 0 : target;
    const duration = 1800;
    const startTime = performance.now() + delay;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      if (elapsed < 0) { requestAnimationFrame(tick); return; }
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // cubic ease-out
      setCount(Math.round(start + (end - start) * eased));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [visible, item.value, item.celebrate, delay]);

  if (item.value === null) return null;

  const isCelebrateZero = item.celebrate && count === 0 && visible;

  return (
    <div ref={ref} style={{ textAlign: 'center' }}>
      <div
        style={{
          fontSize: 28,
          fontWeight: 700,
          color: isCelebrateZero ? 'var(--color-accent-text)' : 'var(--color-text)',
        }}
        className={isCelebrateZero ? 'pulse' : undefined}
      >
        {item.prefix}{count}{item.suffix}
      </div>
      <div
        style={{
          fontSize: 11,
          fontFamily: 'var(--font-mono)',
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          color: 'var(--color-subtle)',
          marginTop: 2,
        }}
      >
        {item.label}
      </div>
    </div>
  );
}

export default function StatsBar({ items }: StatsBarProps) {
  const validItems = items.filter((i) => i.value !== null);
  if (validItems.length === 0) return null;

  return (
    <section
      style={{
        display: 'flex',
        justifyContent: 'center',
        gap: 40,
        flexWrap: 'wrap',
        padding: '24px 20px',
        borderRadius: 12,
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        maxWidth: 900,
        margin: '0 auto',
      }}
    >
      {validItems.map((item, i) => (
        <AnimatedStat key={item.id} item={item} delay={i * 110} />
      ))}
    </section>
  );
}
