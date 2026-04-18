'use client';

import { useEffect, useRef, useState } from 'react';

interface AnimatedCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  celebrate?: boolean;
  duration?: number;
  style?: React.CSSProperties;
}

export default function AnimatedCounter({
  value,
  prefix = '',
  suffix = '',
  celebrate = false,
  duration = 1800,
  style,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(false);
  const [landed, setLanded] = useState(false);

  /* Viewport awareness via IntersectionObserver */
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.5 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  /* Animate count on visibility */
  useEffect(() => {
    if (!visible) return;

    const start = celebrate ? value : 0;
    const end = celebrate ? 0 : value;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      /* cubic ease-out */
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(start + (end - start) * eased);
      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        setLanded(true);
      }
    };
    requestAnimationFrame(tick);
  }, [visible, value, celebrate, duration]);

  const isCelebrateZero = celebrate && landed && count === 0;

  return (
    <span
      ref={ref}
      className={isCelebrateZero ? 'pulse' : undefined}
      style={{
        fontWeight: 700,
        fontFamily: 'var(--font-sans)',
        color: isCelebrateZero ? 'var(--color-accent-text)' : 'var(--color-text)',
        transition: 'color 0.3s ease',
        ...style,
      }}
    >
      {prefix}{count}{suffix}
    </span>
  );
}

export type { AnimatedCounterProps };
