'use client';

import type { ReactNode, ButtonHTMLAttributes } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
}

const variantStyles: Record<ButtonVariant, {
  background: string;
  color: string;
  border: string;
  hoverBg: string;
}> = {
  primary: {
    background: 'var(--color-accent)',
    color: '#ffffff',
    border: 'none',
    hoverBg: '#0ea472', /* slightly darker emerald */
  },
  secondary: {
    background: 'var(--color-surface-high)',
    color: 'var(--color-text)',
    border: '1px solid var(--color-border)',
    hoverBg: 'var(--color-surface-hover)',
  },
  ghost: {
    background: 'transparent',
    color: 'var(--color-muted)',
    border: 'none',
    hoverBg: 'var(--color-surface-high)',
  },
};

const sizeStyles: Record<ButtonSize, {
  padding: string;
  fontSize: number;
  height: number;
}> = {
  sm: { padding: '0 12px', fontSize: 12, height: 28 },
  md: { padding: '0 16px', fontSize: 13, height: 34 },
  lg: { padding: '0 24px', fontSize: 14, height: 40 },
};

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  style,
  disabled,
  ...rest
}: ButtonProps) {
  const v = variantStyles[variant];
  const s = sizeStyles[size];

  return (
    <button
      {...rest}
      disabled={disabled}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        height: s.height,
        padding: s.padding,
        fontSize: s.fontSize,
        fontFamily: 'var(--font-sans)',
        fontWeight: 500,
        lineHeight: 1,
        borderRadius: 8,
        border: v.border,
        background: v.background,
        color: v.color,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        transition: 'background 0.15s ease, opacity 0.15s ease',
        whiteSpace: 'nowrap',
        ...style,
      }}
      onMouseEnter={(e) => {
        if (disabled) return;
        (e.currentTarget as HTMLElement).style.background = v.hoverBg;
      }}
      onMouseLeave={(e) => {
        if (disabled) return;
        (e.currentTarget as HTMLElement).style.background = v.background;
      }}
    >
      {children}
    </button>
  );
}

export { Button };
export type { ButtonVariant, ButtonSize, ButtonProps };
