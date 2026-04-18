'use client';

import type { ReactNode } from 'react';

/* ------------------------------------------------------------------ */
/*  Card                                                               */
/* ------------------------------------------------------------------ */

interface CardProps {
  children: ReactNode;
  hover?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

export default function Card({ children, hover = true, style, className }: CardProps) {
  return (
    <div
      className={className}
      style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 12,
        boxShadow: 'var(--shadow)',
        overflow: 'hidden',
        transition: hover
          ? 'transform 0.2s cubic-bezier(0.4,0,0.2,1), box-shadow 0.2s cubic-bezier(0.4,0,0.2,1)'
          : undefined,
        ...style,
      }}
      onMouseEnter={(e) => {
        if (!hover) return;
        e.currentTarget.style.transform = 'translateY(-3px)';
        e.currentTarget.style.boxShadow = 'var(--shadow-hover)';
      }}
      onMouseLeave={(e) => {
        if (!hover) return;
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'var(--shadow)';
      }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  CardHeader                                                         */
/* ------------------------------------------------------------------ */

interface CardHeaderProps {
  children: ReactNode;
  style?: React.CSSProperties;
}

export function CardHeader({ children, style }: CardHeaderProps) {
  return (
    <div
      style={{
        padding: '20px 24px 0 24px',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  CardContent                                                        */
/* ------------------------------------------------------------------ */

interface CardContentProps {
  children: ReactNode;
  style?: React.CSSProperties;
}

export function CardContent({ children, style }: CardContentProps) {
  return (
    <div
      style={{
        padding: '16px 24px',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  CardFooter                                                         */
/* ------------------------------------------------------------------ */

interface CardFooterProps {
  children: ReactNode;
  style?: React.CSSProperties;
}

export function CardFooter({ children, style }: CardFooterProps) {
  return (
    <div
      style={{
        padding: '0 24px 20px 24px',
        borderTop: '1px solid var(--color-border)',
        paddingTop: 16,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export { Card };
export type { CardProps };
