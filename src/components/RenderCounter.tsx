import { useRef } from 'react';
import { COLORS as C } from '../styles/tokens';

interface Props {
  label?: string;
}

/** Counts how many times the component it lives in has rendered */
export function RenderCounter({ label = 'renders' }: Props) {
  const count = useRef(0);
  count.current += 1;
  return (
    <span style={{
      background: count.current > 3 ? '#f9731620' : '#4ade8018',
      color: count.current > 3 ? C.ts : C.green,
      border: `1px solid ${count.current > 3 ? '#f9731640' : '#4ade8030'}`,
      borderRadius: 99, padding: '1px 8px', fontSize: 10, fontWeight: 700,
      fontFamily: 'JetBrains Mono, monospace',
    }}>
      {label}: {count.current}
    </span>
  );
}
