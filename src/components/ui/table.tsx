import type { ReactNode, TdHTMLAttributes, ThHTMLAttributes } from 'react';

/* ------------------------------------------------------------------ */
/*  Table                                                              */
/* ------------------------------------------------------------------ */

interface TableProps {
  children: ReactNode;
  style?: React.CSSProperties;
}

export default function Table({ children, style }: TableProps) {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontFamily: 'var(--font-sans)',
          fontSize: 14,
          ...style,
        }}
      >
        {children}
      </table>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  TableHeader                                                        */
/* ------------------------------------------------------------------ */

interface TableHeaderProps {
  children: ReactNode;
  style?: React.CSSProperties;
}

export function TableHeader({ children, style }: TableHeaderProps) {
  return (
    <thead
      style={{
        borderBottom: '1px solid var(--color-border)',
        ...style,
      }}
    >
      {children}
    </thead>
  );
}

/* ------------------------------------------------------------------ */
/*  TableBody                                                          */
/* ------------------------------------------------------------------ */

interface TableBodyProps {
  children: ReactNode;
  style?: React.CSSProperties;
}

export function TableBody({ children, style }: TableBodyProps) {
  return <tbody style={style}>{children}</tbody>;
}

/* ------------------------------------------------------------------ */
/*  TableRow                                                           */
/* ------------------------------------------------------------------ */

interface TableRowProps {
  children: ReactNode;
  zebra?: boolean;
  style?: React.CSSProperties;
}

export function TableRow({ children, zebra = false, style }: TableRowProps) {
  return (
    <tr
      style={{
        background: zebra ? 'var(--color-surface-zebra)' : 'transparent',
        transition: 'background 0.15s ease',
        ...style,
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.background = 'var(--color-surface-high)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.background = zebra
          ? 'var(--color-surface-zebra)'
          : 'transparent';
      }}
    >
      {children}
    </tr>
  );
}

/* ------------------------------------------------------------------ */
/*  TableHead                                                          */
/* ------------------------------------------------------------------ */

interface TableHeadProps extends ThHTMLAttributes<HTMLTableCellElement> {
  children: ReactNode;
  style?: React.CSSProperties;
}

export function TableHead({ children, style, ...rest }: TableHeadProps) {
  return (
    <th
      {...rest}
      style={{
        padding: '10px 16px',
        textAlign: 'left',
        fontSize: 11,
        fontFamily: 'var(--font-mono)',
        fontWeight: 500,
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
        color: 'var(--color-subtle)',
        whiteSpace: 'nowrap',
        ...style,
      }}
    >
      {children}
    </th>
  );
}

/* ------------------------------------------------------------------ */
/*  TableCell                                                          */
/* ------------------------------------------------------------------ */

interface TableCellProps extends TdHTMLAttributes<HTMLTableCellElement> {
  children: ReactNode;
  style?: React.CSSProperties;
}

export function TableCell({ children, style, ...rest }: TableCellProps) {
  return (
    <td
      {...rest}
      style={{
        padding: '16px',
        color: 'var(--color-text)',
        verticalAlign: 'middle',
        ...style,
      }}
    >
      {children}
    </td>
  );
}

export { Table };
